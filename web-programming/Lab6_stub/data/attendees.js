import { events as eventsCollImport } from "../config/mongoCollections.js";
import helpers from '../helpers.js';
import { ObjectId } from "mongodb";

let attendeeHelpers = {

    async createAttendee(eventId, firstName, lastName, emailAddress) {
        console.log('Attempting to create attendee...');

        console.log('Checking eventID validity...');
        helpers.checkId(eventId, 'eventId');
        console.log('Checking provided data validity...');
        console.log('Before isValidString firstName');
        console.log('Value of firstName:', firstName);
        console.log('Type of firstName:', typeof firstName);

        helpers.isValidString(firstName, 'firstName');
        console.log('After isValidString firstName');
        console.log('Before isValidString lastName');
        helpers.isValidString(lastName, 'lastName');
        console.log('After isValidString lastName');

        console.log('Before helpers.isValidEmail');
        if (!helpers.isValidEmail(emailAddress)) {
            console.log('Error: Invalid email address provided.');
            throw 'Provided email address is not valid.';
        }
        console.log('After helpers.isValidEmail');

        console.log('Fetching event from database...');

        const eventCollection = await eventsCollImport();
        const eventInfo = await eventCollection.findOne({ _id: new ObjectId(eventId) });
        console.log('Event fetched:', eventInfo);

        if (!eventInfo) {
            console.log(`Error: Event with ID ${eventId} not found.`);
            throw 'Event with provided ID does not exist.';
        }

        if (eventInfo.attendees && eventInfo.attendees.find(att => att.emailAddress === emailAddress)) {
            console.log('Error: Attendee with this email is already registered.');
            throw 'Attendee with this email is already registered.';
        }

        if (eventInfo.attendees && eventInfo.attendees.length >= eventInfo.maxCapacity) {
            console.log('Error: The event is already full.');
            throw 'The event is already full.';
        }

        const newAttendee = {
            _id: new ObjectId(),
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            emailAddress: emailAddress.trim()
        };

        const updateInfo = await eventCollection.updateOne(
            { _id: new ObjectId(eventId) },
            {
                $push: { attendees: newAttendee },
                $inc: { totalNumberOfAttendees: 1 }
            }
        );

        if (updateInfo.modifiedCount === 0) {
            console.log('Error: Could not add attendee.');
            throw 'Could not add attendee.';
        }

        console.log('Attendee created successfully.');
        return await eventCollection.findOne({ _id: new ObjectId(eventId) });
    },

    async getAllAttendees(eventId) {
        console.log('Fetching all attendees for event...');

        helpers.checkId(eventId, 'eventId');

        const eventCollection = await eventsCollImport();;
        const eventInfo = await eventCollection.findOne({ _id: new ObjectId(eventId) });

        if (!eventInfo) {
            console.log(`Error: Event with ID ${eventId} not found.`);
            throw 'Event with provided ID does not exist.';
        }

        console.log('All attendees fetched successfully.');
        return eventInfo.attendees || [];
    },

    async getAttendee(attendeeId) {
        console.log('Fetching attendee details...');

        helpers.checkId(attendeeId, 'attendeeId');

        const eventCollection = await eventsCollImport();;
        const eventWithAttendee = await eventCollection.findOne({ 'attendees._id': new ObjectId(attendeeId) });

        if (!eventWithAttendee) {
            console.log(`Error: Attendee with ID ${attendeeId} not found.`);
            throw 'Attendee with provided ID does not exist.';
        }

        const attendee = eventWithAttendee.attendees.find(a => a._id.toString() === attendeeId);
        console.log('Attendee details fetched successfully.');
        return attendee;
    },

    async removeAttendee(attendeeId) {
        console.log('Attempting to remove attendee...');

        helpers.checkId(attendeeId, 'attendeeId');

        const eventCollection = await eventsCollImport();;
        const eventWithAttendee = await eventCollection.findOne({ 'attendees._id': new ObjectId(attendeeId) });

        if (!eventWithAttendee) {
            console.log(`Error: Attendee with ID ${attendeeId} not found.`);
            throw 'Attendee with provided ID does not exist.';
        }

        const updateInfo = await eventCollection.updateOne(
            { 'attendees._id': new ObjectId(attendeeId) },
            {
                $pull: { attendees: { _id: new ObjectId(attendeeId) } },
                $inc: { totalNumberOfAttendees: -1 }
            }
        );

        if (updateInfo.modifiedCount === 0) {
            console.log('Error: Could not delete attendee.');
            throw 'Could not delete attendee.';
        }

        console.log('Attendee removed successfully.');
        return await eventCollection.findOne({ _id: eventWithAttendee._id });
    }
};

export default attendeeHelpers;
