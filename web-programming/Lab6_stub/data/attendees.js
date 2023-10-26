// This data file should export all functions using the ES6 standard as shown in the lecture code
import {events} from '../config/mongoCollections.js';
import mongodb from 'mongodb';
const { ObjectID } = mongodb;

import {
  isValidString,
  isValidEmail,
} from '../helpers.js';

/***************************** CREATE ATTENDEE ******************************/

const createAttendee = async (eventId, firstName, lastName, emailAddress) => {
  //Implement Code here
  if (!eventId || !isValidString(eventId) || !ObjectID.isValid(eventId)) throw 'Invalid event id';
  if (!firstName || !isValidString(firstName)) throw 'Invalid first name';
  if (!lastName || !isValidString(lastName)) throw 'Invalid last name';
  if (!emailAddress || !isValidEmail(emailAddress)) throw 'Invalid email address';

  const eventsCollection = await events();
  const event = await eventsCollection.findOne({ _id: ObjectID(eventId) });

  if (!event) throw 'Event not found';
  if (event.attendees.find(att => att.emailAddress === emailAddress)) throw 'Email already registered';
  if (event.attendees.length >= event.maxCapacity) throw 'Event is full';

  const newAttendee = {
    _id: ObjectID(),
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    emailAddress: emailAddress.trim()
  };

  const updateCommand = await eventsCollection.updateOne({_id: ObjectID(eventId)}, {
    $push: {attendees: newAttendee},
    $inc: {totalNumberOfAttendees: 1}
  });

  if(!updateCommand.result.ok) throw "Failed to add attendee";

  return await eventsCollection.findOne({_id: ObjectID(eventId)});
};


/***************************** GET ALL ATTENDEES ******************************/

const getAllAttendees = async (eventId) => {
  //Implement Code here
  if (!eventId || !isValidString(eventId) || !ObjectID.isValid(eventId)) throw 'Invalid event id';

  const eventsCollection = await events();
  const event = await eventsCollection.findOne({ _id: ObjectID(eventId) });

  if (!event) throw 'Event not found';

  return event.attendees;
};


/***************************** GET ATTENDEE ******************************/

const getAttendee = async (attendeeId) => {
  //Implement Code here
  if (!attendeeId || !isValidString(attendeeId) || !ObjectID.isValid(attendeeId)) throw 'Invalid attendee id';

  const eventsCollection = await events();
  const event = await eventsCollection.findOne({ "attendees._id": ObjectID(attendeeId) });

  if (!event) throw 'Attendee not found';

  return event.attendees.find(a => a._id.toString() === attendeeId);
};


/***************************** REMOVE ATTENDEE ******************************/

const removeAttendee = async (attendeeId) => {
  //Implement Code here
  if(!attendeeId || !isValidString(attendeeId)) throw "Invalid attendeeId";

  const eventsCollection = await events();
  const event = await eventsCollection.findOne({"attendees._id": ObjectID(attendeeId)});
  if(!event) throw "Attendee not found";

  const updateCommand = await eventsCollection.updateOne({_id: event._id}, {
    $pull: {attendees: {_id: ObjectID(attendeeId)}},
    $inc: {totalNumberOfAttendees: -1}
  });

  if(!updateCommand.result.ok) throw "Failed to remove attendee";

  return await eventsCollection.findOne({_id: event._id});

};

export default {
  createAttendee,
  getAllAttendees,
  getAttendee,
  removeAttendee
};

