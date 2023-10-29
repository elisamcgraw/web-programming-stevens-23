// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import helpers from '../helpers.js';
import { Router } from 'express';
const router = Router();
import { eventData } from '../data/index.js';
import { ObjectId } from "../helpers.js";


// Operations for all events
router
.route('/')
.get(async (req, res) => {
  try {
    const eventList = await eventData.getAll();  // Fetch all events from MongoDB
    return res.json(eventList);
  } catch (e) {
    return res.status(500).send(e);
  }
})
.post(async (req, res) => {
  const { name, date, time } = req.body;
  
  if (!helpers.isValidString(name) || !helpers.isValidDate(date) || !helpers.isValidTime(time)) {
    return res.status(400).json({ message: 'Invalid event data.' });
  }
  
  try {
    const newEvent = {
      name,
      date,
      time,
      attendees: []
    };

    const insertedEvent = await eventData.addEvent(newEvent); // Add event to MongoDB
    res.status(201).json(insertedEvent);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// Operations for a specific event
router.route('/:eventId')
  .get(async (req, res) => {
    console.log("Entering /:eventId route");
    
    const eventId = req.params.eventId;
    console.log("Received eventId:", eventId);

    if (!helpers.isValidObjectId(eventId)) {
      console.log("Invalid eventId");
      return res.status(400).send('Invalid eventId');
    }

    try {
      console.log("Trying to fetch event by id");
      const event = await eventData.get(eventId);
      if (!event) {
        console.log("Event not found");
        return res.status(404).send('Event not found');
      }
      return res.status(200).json(event);  // <-- This is the change
    } catch (e) {
      console.error("Error fetching event:", e);
      return res.status(500).json({error: e.message});
    }
  })



  .delete(async (req, res) => {
    console.log("Received Event ID:", req.params.eventId);

    try {
      // Validate the eventId format 
      console.log("Type of Event ID:", typeof req.params.eventId);
      console.log("Length of Event ID after trimming:", req.params.eventId.trim().length);

      const eventIdString = helpers.checkId(req.params.eventId, 'Event ID URL Param');
      
      // Convert the validated string to ObjectId
      const eventId = new ObjectId(eventIdString);

      // Remove the event and get the event name
      const deletedEvent = await eventData.remove(eventId); // Ensure this method expects ObjectId

      if (!deletedEvent) {
        throw new Error('Not found');
      }

      res.status(200).json({ eventName: deletedEvent.eventName, deleted: true }); 
      
    } catch (e) {
      if (e.message === 'Not found') {
        res.status(404).json({error: 'Event not found'});
      } else if (e.message.includes('Invalid ID format') || e.message.includes('Event ID invalid object ID')) {
        res.status(400).json({error: 'Invalid Event ID format'});
      } else {
        res.status(400).json({error: e.message});
      }
    }
  })



.put(async (req, res) => {
  console.log("Starting update route...");

  try {
    // 1. Check if eventId is a valid object ID
    helpers.checkId(req.params.eventId, "eventId");
    const requiredFields = [
      "eventName", "description", "eventLocation", "contactEmail", "maxCapacity", 
      "priceOfAdmission", "eventDate", "startTime", "endTime", "publicEvent"
  ];
  
  for (let field of requiredFields) {
      if (!req.body.hasOwnProperty(field)) {
          throw `Missing field: ${field}`;
      }
  }  

    // 2. Check if provided fields are strings and have valid values
    helpers.isValidString(req.body.eventName, "Event Name");
    helpers.isValidString(req.body.description, "Description");
    console.log("Before validating eventLocation...");
    if (typeof req.body.eventLocation !== "object" || Array.isArray(req.body.eventLocation)) {
        throw "eventLocation should be an object";
    }
    console.log("After validating eventLocation...");
    
  const locationFields = ["streetAddress", "city", "state", "zip"];
  for (let field of locationFields) {
      if (!req.body.eventLocation.hasOwnProperty(field) || typeof req.body.eventLocation[field] !== "string" || !req.body.eventLocation[field].trim()) {
          throw `Invalid or missing eventLocation field: ${field}`;
      }
  }
  
  if (req.body.eventLocation.streetAddress.length < 3) {
      throw "eventLocation.streetAddress should be at least 3 characters long";
  }
  
  if (req.body.eventLocation.city.length < 3) {
      throw "eventLocation.city should be at least 3 characters long";
  }
  
  if (!/^[A-Z]{2}$/.test(req.body.eventLocation.state)) {
      throw "eventLocation.state should be a two-character state abbreviation";
  }
  
  if (!/^\d{5}$/.test(req.body.eventLocation.zip)) {
      throw "eventLocation.zip should be a 5-digit string";
  }
  

    // 3. Check email format
    if (!helpers.isValidEmail(req.body.contactEmail)) {
      throw "Invalid email format!";
    }

    // 4. Validate date and time format
    if (!helpers.isValidDate(req.body.eventDate)) {
      throw "Invalid date format!";
    }
    if (!helpers.isValidTime(req.body.startTime) || !helpers.isValidTime(req.body.endTime)) {
      throw "Invalid time format!";
    }
    if (helpers.minutesDifference(req.body.startTime, req.body.endTime) <= 0) {
      throw "End time must be after the start time!";
    }

    // 5. Check maxCapacity and priceOfAdmission
    if (!helpers.isIntegerAndPositive(req.body.maxCapacity)) {
      throw "Max capacity must be a positive integer!";
    }
    if (!helpers.isValidPrice(req.body.priceOfAdmission)) {
      throw "Invalid price format!";
    }

    // 6. Validate boolean values
    if (!helpers.isBoolean(req.body.publicEvent)) {
      throw "Public event must be a boolean value!";
    }
    const originalEvent = await eventData.get(req.params.eventId);
    if (!originalEvent) {
        throw "Event not found";
    }
    console.log("Validations passed...");
    
    // Retaining attendees and totalNumberOfAttendees
    req.body.attendees = originalEvent.attendees;
    req.body.totalNumberOfAttendees = originalEvent.totalNumberOfAttendees;
    
    const updatedEvent = await eventData.update(
      req.params.eventId,
      req.body,
      { new: true }
  );

  if (!updatedEvent) {
      throw "Update failed, no data returned.";
  }

  console.log("Update completed...");
  console.log("Updated Event Data:", updatedEvent);

  res.status(200).json(updatedEvent);

} catch (e) {
  console.error("Error encountered:", e);
  return res.status(400).send(e.toString());
}
});


export default router;
