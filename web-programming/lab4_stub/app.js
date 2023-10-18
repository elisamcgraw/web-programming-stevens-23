/*
    1. Create a event of your choice.
    2. Log the newly created event. (Just that event, not all events)
    3. Create another event of your choice.
    4. Query all events, and log them all
    5. Create the 3rd event of your choice.
    6. Log the newly created 3rd event. (Just that event, not all events)
    7. Rename the first event
    8. Log the first event with the updated name. 
    9. Remove the second event you created.
    10. Query all events, and log them all
    11. Try to create an event with bad input parameters to make sure it throws errors.
    12. Try to remove an event that does not exist to make sure it throws errors.
    13. Try to rename an event that does not exist to make sure it throws errors.
    14. Try to rename an event passing in invalid data for the newEventName parameter to make sure it throws errors.
    15. Try getting an event by ID that does not exist to make sure it throws errors.
*/

import * as events from './data/events.js';

const runTests = async () => {
  try {
    // Create a event of your choice.
    const firstEvent = await events.create(
      "John's Pool Party",
      "Chill and have fun in the pool!",
      { streetAddress: "123 Fun St", city: "PartyTown", state: "CA", zip: "12345" },
      "john@example.com",
      20,
      0,
      "12/12/2023",
      "1:00PM",
      "5:00PM",
      true
    );
    console.log(firstEvent);

    // Create another event of your choice.
    const secondEvent = await events.create(
      "Music Fest",
      "Enjoy the live music with popular bands!",
      { streetAddress: "789 Music Ave", city: "TuneCity", state: "NY", zip: "67890" },
      "musicfest@example.com",
      300,
      25,
      "05/05/2024",
      "6:00PM",
      "11:00PM",
      true
    );

    // Query all events, and log them all
    const allEventsBefore = await events.getAll();
    console.log(allEventsBefore);

    // Create the 3rd event of your choice.
    const thirdEvent = await events.create(
      "Art Gallery Opening",
      "Explore the finest contemporary art pieces.",
      { streetAddress: "456 Art Blvd", city: "ArtCity", state: "WA", zip: "11223" },
      "artgallery@example.com",
      100,
      10,
      "03/03/2024",
      "3:00PM",
      "8:00PM",
      false
    );
    console.log(thirdEvent);

    // Rename the first event
    const renamedFirstEvent = await events.rename(firstEvent._id, "John's Grand Pool Party");
    console.log(renamedFirstEvent);

    // Remove the second event you created.
    const removedEventStatus = await events.remove(secondEvent._id);
    console.log(removedEventStatus);

    // Query all events, and log them all
    const allEventsAfter = await events.getAll();
    console.log(allEventsAfter);

    // Error scenarios for testing:
    // Try to create an event with bad input parameters to make sure it throws errors.
    try {
      const badEvent = await events.create();
    } catch (error) {
      console.log('Error creating bad event:', error);
    }

    // Try to remove an event that does not exist to make sure it throws errors.
    try {
      const removeStatus = await events.remove("badid12345");
    } catch (error) {
      console.log('Error removing non-existing event:', error);
    }

    // Try to rename an event that does not exist to make sure it throws errors.
    try {
      const renameStatus = await events.rename("badid12345", "Some New Name");
    } catch (error) {
      console.log('Error renaming non-existing event:', error);
    }

    // Try to rename an event passing in invalid data for the newEventName parameter to make sure it throws errors.
    try {
      const renameStatus = await events.rename(firstEvent._id, "");
    } catch (error) {
      console.log('Error renaming with invalid name:', error);
    }

    // Try getting an event by ID that does not exist to make sure it throws errors.
    try {
      const nonexistentEvent = await events.get("badid12345");
    } catch (error) {
      console.log('Error fetching non-existing event:', error);
    }

  } catch (error) {
    console.error('An error occurred:', error);
  }
};

runTests();

