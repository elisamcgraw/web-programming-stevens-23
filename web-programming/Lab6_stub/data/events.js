// This data file should export all functions using the ES6 standard as shown in the lecture code

// events.js
import { events as eventsCollImport } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
//import attendeesData from "./data/attendees.js";
import {
  isValidString,
  isValidEmail,
  isValidDate,
  isValidTime,
  minutesDifference,
  isValidState,
  isValidZip,
  isIntegerAndPositive,
  isValidPrice,
  isBoolean
} from '../helpers.js';

async function getEventCollection() {
  return await eventsCollImport();
}

/************************************* CREATE ****************************************/

const create = async (
  eventName,
  eventDescription,
  eventLocation,
  contactEmail,
  maxCapacity,
  priceOfAdmission,
  eventDate,
  startTime,
  endTime,
  publicEvent
) => {
  //Implement Code here
  //Do NOT forget to initalize attendees to be an empty array and totalNumberOfAttendees to 0 on event creation
  if (!isValidString(eventName, 5)) throw new Error("Invalid eventName");
  if (!isValidString(eventDescription, 25)) throw new Error("Invalid eventDescription");
  if (!eventLocation || !isValidString(eventLocation.streetAddress) || !isValidString(eventLocation.city) || !isValidState(eventLocation.state) || !isValidZip(eventLocation.zip)) throw new Error("Invalid eventLocation");
  if (!isValidEmail(contactEmail)) throw new Error("Invalid contactEmail");
  if (!isIntegerAndPositive(maxCapacity)) throw new Error("Invalid maxCapacity");
  if (!isValidPrice(priceOfAdmission)) throw new Error("Invalid priceOfAdmission");
  if (!isValidDate(eventDate)) throw new Error("Invalid eventDate");
  if (!isValidTime(startTime)) throw new Error("Invalid startTime");
  if (!isValidTime(endTime)) throw new Error("Invalid endTime");
  if (!isBoolean(publicEvent)) throw new Error("Invalid publicEvent value");
  if (minutesDifference(startTime, endTime) <= 0 || minutesDifference(startTime, endTime) < 30) throw new Error("Invalid startTime and endTime combination");

    const eventCollection = await getEventCollection();

    const newEvent = {
      eventName: eventName.trim(),
      description: eventDescription.trim(),
      eventLocation: {
        streetAddress: eventLocation.streetAddress.trim(),
        city: eventLocation.city.trim(),
        state: eventLocation.state,
        zip: eventLocation.zip,
      },
      contactEmail: contactEmail.trim(),
      maxCapacity,
      priceOfAdmission,
      eventDate,
      startTime,
      endTime,
      publicEvent,
      attendees: [],
      totalNumberOfAttendees: 0
    };

  if (newEvent._id && typeof newEvent._id !== "string") {
    throw new Error("Invalid value provided for '_id'.");
  }
  
  const insertInfo = await eventCollection.insertOne(newEvent);
  if (insertInfo.insertedCount === 0) {
    throw new Error("Could not add event");
  }

  return {
    _id: insertInfo.insertedId.toString(),
    ...newEvent,
  };
};

/************************************* GET ALL ****************************************/

const getAll = async () => {
  //Implement Code here
  let eventArray;
  try {
    const eventCollection = await getEventCollection();
    eventArray = await eventCollection.find({}, { projection: { _id: 1, eventName: 1 } }).toArray();
  } catch (error) {
    throw new Error("Error accessing the database.");
  }

  for (let event of eventArray) {
    if (event._id && event._id instanceof ObjectId) {
      event._id = event._id.toString();
    } else {
      throw new Error("Encountered an event with invalid ID format.");
    }
  }

  return eventArray;
};

/************************************* GET ****************************************/

const get = async (id) => {
  //Implement Code here
  console.log(`ID being passed to get function: ${id}`); 
  if (!id) {
    throw new Error("Id parameter must be provided.");
}
if (typeof id !== "string") {
    throw new Error("Id parameter must be a string.");
}
if (id.trim() === "") {
    throw new Error("Id parameter must not be empty.");
}
if (!ObjectId.isValid(id)) {
    throw new Error("Id parameter is not a valid Object ID.");
}

  let event;
  try {
    const eventCollection = await getEventCollection();
    event = await eventCollection.findOne({ _id: new ObjectId(id) });
  } catch (error) {
    throw new Error("Error accessing the database.");
  }

  if (!event) throw new Error("No event with that id.");

  // Double check for the type and existence of _id
  if (!event._id || !(event._id instanceof ObjectId)) {
    throw new Error("Retrieved event has invalid ID format.");
  }

  event._id = event._id.toString();
  return event;
};


/************************************* DELETE ****************************************/
const remove = async (id) => {
  // 1. Check if id is provided
  if (!id) {
    throw new Error("ID must be provided.");
  }

  // 2. Check if id is a string and not an empty string
  if (typeof id !== "string" || id.trim().length === 0) {
    throw new Error("Provided ID must be a non-empty string.");
  }

  // Trim the id to remove any spaces
  id = id.trim();

  // 3. Check if id is a valid ObjectId
  if (!ObjectId.isValid(id)) {
    throw new Error("Provided ID is not a valid ObjectId.");
  }

  const eventCollection = await getEventCollection();

  // Retrieve the event first to get the event name
  const eventToDelete = await eventCollection.findOne({ _id: ObjectId(id) });

  // If the event does not exist, throw an error
  if (!eventToDelete) {
    throw new Error("No event found with the provided ID.");
  }

  // Attempt to delete the event
  const deletionInfo = await eventCollection.deleteOne({ _id: ObjectId(id) });

  if (deletionInfo.deletedCount === 0) {
    throw new Error("Could not delete the event.");
  }

  // 5. Return the successful deletion format
  return {
    eventName: eventToDelete.eventName,
    deleted: true,
  };
};


/************************************* UPDATE ****************************************/

const update = async (eventId, eventName, eventDescription, eventLocation, contactEmail, maxCapacity, priceOfAdmission, eventDate, startTime, endTime, publicEvent) => {

  if (!eventId) throw new Error("Event ID must be provided.");
  if (!ObjectId.isValid(eventId)) throw new Error("Provided Event ID is not a valid ObjectId.");
  if (!isValidString(eventName, 5)) throw new Error("Invalid eventName");
  if (!isValidString(eventDescription, 25)) throw new Error("Invalid eventDescription");
  if (!eventLocation || !isValidString(eventLocation.streetAddress) || !isValidString(eventLocation.city) || !isValidState(eventLocation.state) || !isValidZip(eventLocation.zip)) throw new Error("Invalid eventLocation");
  if (!isValidEmail(contactEmail)) throw new Error("Invalid contactEmail");
  if (!isIntegerAndPositive(maxCapacity)) throw new Error("Invalid maxCapacity");
  if (!isValidPrice(priceOfAdmission)) throw new Error("Invalid priceOfAdmission");
  if (!isValidDate(eventDate)) throw new Error("Invalid eventDate");
  if (!isValidTime(startTime)) throw new Error("Invalid startTime");
  if (!isValidTime(endTime)) throw new Error("Invalid endTime");
  if (!isBoolean(publicEvent)) throw new Error("Invalid publicEvent value");
  if (minutesDifference(startTime, endTime) <= 0 || minutesDifference(startTime, endTime) < 30) throw new Error("Invalid startTime and endTime combination");


    const eventCollection = await getEventCollection();
    const updatedEvent = {
        eventName: eventName.trim(),
        description: eventDescription.trim(),
        eventLocation: {
            streetAddress: eventLocation.streetAddress.trim(),
            city: eventLocation.city.trim(),
            state: eventLocation.state,
            zip: eventLocation.zip.trim(),
        },
        contactEmail: contactEmail.trim(),
        maxCapacity,
        priceOfAdmission,
        eventDate,
        startTime,
        endTime,
        publicEvent
    };

    const updateInfo = await eventCollection.updateOne({ _id: new ObjectId(eventId) }, { $set: updatedEvent });

    if (updateInfo.modifiedCount === 0) throw new Error("Event update failed.");

    return await eventCollection.findOne({ _id: new ObjectId(eventId) });
};

export default { create, getAll, get, remove, update };

