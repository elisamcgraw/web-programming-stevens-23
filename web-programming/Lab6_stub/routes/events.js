// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {
  isValidString,
  isValidDate,
  isValidTime,
} from '../helpers.js';
import { Router } from 'express';
const router = Router();
import { eventData } from '../data/index.js';

// Operations for all events
router
.route('/')
.get(async (req, res) => {
  try {
    const eventList = await eventData.getAllEvents();  // Fetch all events from MongoDB
    return res.json(eventList);
  } catch (e) {
    return res.status(500).send(e);
  }
})
.post(async (req, res) => {
  const { name, date, time } = req.body;
  
  if (!isValidString(name) || !isValidDate(date) || !isValidTime(time)) {
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
router
.route('/:eventId')
.get(async (req, res) => {
  try {
    req.params.eventId = checkId(req.params.eventId);  // Use checkId from helpers.js
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  try {
    const event = await eventData.getEventById(req.params.eventId);  // Fetch specific event by ID from MongoDB
    return res.json(event);
  } catch (e) {
    return res.status(404).json(e);
  }
})

.delete(async (req, res) => {
  try {
    const result = await eventData.deleteEventById(req.params.eventId);  // Delete specific event by ID from MongoDB
    if (result) {
      res.status(200).json({ message: 'Event deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Event not found.' });
    }
  } catch (e) {
    return res.status(500).send(e);
  }
})
.put(async (req, res) => {
  const updates = {
    name: isValidString,
    date: isValidDate,
    time: isValidTime
  };

  const updatedFields = {};
  for (const [key, validateFunc] of Object.entries(updates)) {
    if (req.body[key] && validateFunc(req.body[key])) {
      updatedFields[key] = req.body[key];
    }
  }

  try {
    const updatedEvent = await eventData.updateEvent(req.params.eventId, updatedFields); // Update specific event in MongoDB
    if (updatedEvent) {
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: 'Event not found.' });
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

export default router;
