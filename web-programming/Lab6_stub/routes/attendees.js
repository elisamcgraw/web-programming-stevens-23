import {
  isValidString,
  isValidEmail,
  isValidObjectId
} from '../helpers.js';
import { Router } from 'express';
import { attendeeData } from '../data/index.js';

const router = Router();

router.route('/:eventId')
  .get(async (req, res) => {
    try {
      req.params.eventId = isValidObjectId(req.params.eventId);
      const event = await attendeeData.getEventById(req.params.eventId);
      if (!event) {
        return res.status(404).send('Event not found');
      }
      return res.json(event.attendees || []);
    } catch (e) {
      return res.status(400).json({ error: e.toString() });
    }
  })
  .post(async (req, res) => {
    try {
      req.params.eventId = isValidObjectId(req.params.eventId);
      const { firstName, lastName, emailAddress } = req.body;

      if (!firstName || !lastName || !emailAddress) {
        return res.status(400).send('All fields must be present');
      }

      if (!isValidString(firstName) || !isValidString(lastName) || !isValidEmail(emailAddress)) {
        return res.status(400).send('Invalid input data');
      }

      const event = await attendeeData.addAttendeeToEvent(req.params.eventId, { firstName, lastName, emailAddress });
      if (!event) {
        return res.status(404).send('Event not found');
      }

      return res.json(event);
    } catch (e) {
      return res.status(400).json({ error: e.toString() });
    }
  });

router.route('/attendee/:attendeeId')
  .get(async (req, res) => {
    try {
      req.params.attendeeId = isValidObjectId(req.params.attendeeId);
      const attendee = await attendeeData.getAttendeeById(req.params.attendeeId);
      if (!attendee) {
        return res.status(404).send('Attendee not found');
      }
      return res.json(attendee);
    } catch (e) {
      return res.status(400).json({ error: e.toString() });
    }
  })
  .delete(async (req, res) => {
    try {
      req.params.attendeeId = isValidObjectId(req.params.attendeeId);
      const event = await attendeeData.deleteAttendeeById(req.params.attendeeId);
      if (!event) {
        return res.status(404).send('Attendee not found');
      }

      event.totalNumberOfAttendees = event.attendees.length;
      await attendeeData.updateEvent(event);

      return res.json(event);
    } catch (e) {
      return res.status(400).json({ error: e.toString() });
    }
  });

export default router;