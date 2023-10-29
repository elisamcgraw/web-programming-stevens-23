// TODO: Export and implement the following functions in ES6 format

import { events as eventsCollImport } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";

async function getEventCollection() {
  return await eventsCollImport();
}

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
  // Validations
  if (
    !eventName ||
    typeof eventName !== "string" ||
    eventName.trim().length < 5
  ) {
    throw new Error("Invalid eventName");
  }

  if (
    !eventDescription ||
    typeof eventDescription !== "string" ||
    eventDescription.trim().length < 25
  )
    throw "Invalid eventDescription";
  if (
    !contactEmail ||
    typeof contactEmail !== "string" ||
    !/\S+@\S+\.\S+/.test(contactEmail)
  )
    throw "Invalid contactEmail"; // Simple regex check

  if (!/^(\d{2}\/\d{2}\/\d{4})$/.test(eventDate)) throw "Invalid eventDate";

  const currentDate = new Date();
  const [month, day, year] = eventDate.split("/");
  const eventDateObject = new Date(year, month - 1, day);

  if (eventDateObject <= currentDate) {
    throw new Error("Event date should be in the future.");
  }

  // Check if it's a valid date after parsing
  if (
    eventDateObject.getDate() != day ||
    eventDateObject.getMonth() + 1 != month ||
    eventDateObject.getFullYear() != year
  ) {
    throw new Error("Invalid eventDate");
  }

  if (
    !startTime ||
    typeof startTime !== "string" ||
    !/^([01]?[0-9]|2[0-3]):[0-5][0-9][APMapm]{2}$/.test(startTime)
  )
    throw "Invalid startTime"; // 12-hour format
  if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9][APMapm]{2}$/.test(endTime))
    throw "Invalid endTime";

  // Function to convert time string to minutes
  const convertTimeToMinutes = (time) => {
    const [hours, minutesPart] = time.split(":");
    const minutes = parseInt(minutesPart.slice(0, 2));
    const period = minutesPart.slice(2).toUpperCase();

    let totalMinutes =
      period === "PM" && hours !== "12"
        ? (parseInt(hours) + 12) * 60
        : parseInt(hours) * 60;
    totalMinutes += minutes;
    return totalMinutes;
  };

  const startTimeInMinutes = convertTimeToMinutes(startTime);
  const endTimeInMinutes = convertTimeToMinutes(endTime);

  if (endTimeInMinutes <= startTimeInMinutes) {
    throw new Error("endTime cannot be before or same as startTime");
  }

  if (endTimeInMinutes - startTimeInMinutes < 30) {
    throw new Error(
      "endTime should be at least 30 minutes later than startTime"
    );
  }

  if (typeof publicEvent !== "boolean") throw "Invalid publicEvent";
  if (!maxCapacity || typeof maxCapacity !== "number" || maxCapacity <= 0)
    throw "Invalid maxCapacity";
  if (
    typeof priceOfAdmission !== "number" ||
    priceOfAdmission < 0 ||
    parseFloat(priceOfAdmission.toFixed(2)) !== priceOfAdmission
  ) {
    throw new Error("Invalid priceOfAdmission");
  }

  if (!eventLocation || typeof eventLocation !== "object")
    throw "Invalid eventLocation";
  if (
    !eventLocation.streetAddress ||
    typeof eventLocation.streetAddress !== "string" ||
    eventLocation.streetAddress.trim().length < 3
  )
    throw "Invalid streetAddress";
  if (
    !eventLocation.city ||
    typeof eventLocation.city !== "string" ||
    eventLocation.city.trim().length < 3
  )
    throw "Invalid city";
  if (
    !eventLocation.state ||
    typeof eventLocation.state !== "string" ||
    !/^[A-Z]{2}$/.test(eventLocation.state)
  )
    throw "Invalid state";
  if (
    !eventLocation.zip ||
    typeof eventLocation.zip !== "string" ||
    !/^\d{5}$/.test(eventLocation.zip)
  )
    throw "Invalid zip";

  const eventCollection = await getEventCollection();

  const newEvent = {
    eventName: eventName.trim(),
    eventDescription: eventDescription.trim(),
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
  };

  const insertInfo = await eventCollection.insertOne(newEvent);
  if (insertInfo.insertedCount === 0) {
    throw new Error("Could not add event");
  }

  return {
    _id: insertInfo.insertedId.toString(),
    ...newEvent,
  };
};

const getAll = async () => {
  let eventArray;
  try {
    const eventCollection = await getEventCollection();
    eventArray = await eventCollection.find({}).toArray();
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

const get = async (id) => {
  if (!id || typeof id !== "string" || id.trim() === "")
    throw new Error("Id parameter must be supplied.");

  id = id.trim();

  if (!ObjectId.isValid(id)) throw new Error("ID is not a valid Object ID.");

  let event;
  try {
    const eventCollection = await getEventCollection();
    event = await eventCollection.findOne({ _id: ObjectId(id) });
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

const remove = async (id) => {
  if (!id || typeof id !== "string" || id.trim().length === 0) {
    throw new Error("You must provide a valid id to search for.");
  }

  id = id.trim();

  if (!ObjectId.isValid(id)) {
    throw new Error("The provided id is not a valid ObjectId.");
  }

  const eventCollection = await getEventCollection();
  const eventToDelete = await eventCollection.findOne({ _id: ObjectId(id) });

  if (!eventToDelete) {
    throw new Error("No event found with the provided id.");
  }

  const deletionInfo = await eventCollection.deleteOne({ _id: ObjectId(id) });

  if (deletionInfo.deletedCount === 0) {
    throw new Error("Could not delete the event with the provided id.");
  }

  return {
    eventName: eventToDelete.eventName,
    deleted: true,
  };
};

const rename = async (id, newEventName) => {
  if (!id || typeof id !== "string" || id.trim().length === 0) {
    throw new Error("You must provide a valid id to search for.");
  }

  if (
    !newEventName ||
    typeof newEventName !== "string" ||
    newEventName.trim().length === 0
  ) {
    throw new Error("You must provide a valid new event name.");
  }

  id = id.trim();
  newEventName = newEventName.trim();

  if (!ObjectId.isValid(id)) {
    throw new Error("The provided id is not a valid ObjectId.");
  }

  const eventCollection = await getEventCollection();
  const eventToUpdate = await eventCollection.findOne({ _id: ObjectId(id) });

  if (!eventToUpdate) {
    throw new Error("No event found with the provided id.");
  }

  if (eventToUpdate.eventName.trim() === newEventName) {
    throw new Error("The new event name is the same as the current name.");
  }

  const updateInfo = await eventCollection.updateOne(
    { _id: ObjectId(id) },
    { $set: { eventName: newEventName } }
  );

  if (updateInfo.modifiedCount === 0) {
    throw new Error("Could not update the event name.");
  }

  const updatedEvent = await eventCollection.findOne({ _id: ObjectId(id) });
  return updatedEvent;
};

export { create, getAll, get, remove, rename };
