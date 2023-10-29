import {Router} from 'express';
import { attendeeData } from '../data/index.js';
import helpers from '../helpers.js';  // Updated to use helpers



const router = Router();

router
  .route('/:eventId')
  .get(async (req, res) => {
    try {
      const eventId = helpers.checkId(req.params.eventId, 'Event ID URL Param');
      const attendeesList = await attendeeData.getAllAttendees(eventId);
      res.json(attendeesList);
    } catch (e) {
      if (e.message === 'Not found') {
        res.status(404).json({error: 'Event not found'});
      } else {
        res.status(400).json({error: e.message});
      }
    }
  })
  .post(async (req, res) => {
    const attendeeInfo = req.body;
  
    // Log the received request body
    console.log('Received request body:', attendeeInfo);
  
    // Log for each validation
    if (!attendeeInfo) console.log('attendeeInfo is missing');
    if (!attendeeInfo.firstName) console.log('firstName is missing');
    if (!attendeeInfo.lastName) console.log('lastName is missing');
    if (!attendeeInfo.emailAddress) console.log('emailAddress is missing');
    
    // Validation
    if (!attendeeInfo || !attendeeInfo.firstName || !attendeeInfo.lastName || !attendeeInfo.emailAddress) {
      return res.status(400).json({error: 'All required fields (firstName, lastName, emailAddress) must be provided'});
    }
  
    try {
      const eventId = helpers.checkId(req.params.eventId, 'Event ID URL Param');
      helpers.isValidString(attendeeInfo.firstName, 'First Name');
      helpers.isValidString(attendeeInfo.lastName, 'Last Name');
      if (!helpers.isValidEmail(attendeeInfo.emailAddress)) {
    throw new Error('Invalid Email Address');
    }

  
      const newAttendee = await attendeeData.createAttendee(eventId, attendeeInfo.firstName, attendeeInfo.lastName, attendeeInfo.emailAddress);
      res.json(newAttendee);
    } catch (e) {
      res.status(400).json({error: e.message});
    }
  });
  
router
  .route('/attendee/:attendeeId')
  .get(async (req, res) => {
    try {
      const attendeeId = helpers.checkId(req.params.attendeeId, 'Attendee ID URL Param');
      const attendee = await attendeeData.getAttendee(attendeeId);
      res.json(attendee);
    } catch (e) {
      if (e.message === 'Not found') {
        res.status(404).json({error: 'Attendee not found'});
      } else {
        res.status(400).json({error: e.message});
      }
    }
  })
  .delete(async (req, res) => {
    try {
      // Validate the attendeeId format
      const attendeeId = helpers.checkId(req.params.attendeeId, 'Attendee ID URL Param');
      
      // Remove the attendee and fetch the updated event data
      const updatedEvent = await attendeeData.removeAttendee(attendeeId);

      if (!updatedEvent) {
        throw new Error('Not found'); // In case removeAttendee returns null or undefined
      }

      res.status(200).json(updatedEvent); 
      
    } catch (e) {
      if (e.message === 'Not found') {
        res.status(404).json({error: 'Attendee not found'});
      } else if (e.message === 'Invalid ID format') {
        res.status(400).json({error: 'Invalid Attendee ID format'});
      } else {
        res.status(400).json({error: e.message});
      }
    }
  });

export default router;
