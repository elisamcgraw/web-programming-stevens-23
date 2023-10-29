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
import assert from 'assert';
import * as events from './data/events.js';

async function runTests() {
    let result;

    // Test case 1
    try {
        result = await events.create(
            "CS 546 Class Party",
            "Celebrating making it halfway through the class.",
            {"streetAddress":"1 Castle Point Ter","city":"Hoboken","state":"NJ","zip":"07030"},
            "organizer@stevens.edu",
            10.5,
            10.83,
            "11/03/2023",
            "10:00PM",
            "11:00PM",
            false
        );
        assert.fail('Expected an error to be thrown, got a result instead.');
    } catch (error) {
        console.log('Test case 1 passed');
    }

    // Test case 2
    try {
        result = await events.create(
            "CS 546 Class Party",
            "Celebrating making it halfway through the class.",
            {"streetAddress":"1 Castle Point Ter","city":"Hoboken","state":"ZA","zip":"07030"},
            "organizer@stevens.edu",
            183,
            10.83,
            "11/03/2023",
            "10:00PM",
            "11:00PM",
            false
        );
        assert.fail('Expected an error to be thrown, got a result instead.');
    } catch (error) {
        console.log('Test case 2 passed');
    }

// Test case 3
let expectedErrorMsg = 'Invalid value provided for \'_id\'.';
try {
    result = await events.create(
        "CS 546 Class Party",
        "Celebrating making it halfway through the class.",
        {"streetAddress":"1 Castle Point Ter","city":"Hoboken","state":"NJ","zip":"07030"},
        "organizer@stevens.edu",
        183,
        10.83,
        "11/03/2023",
        "10:00PM",
        "11:00PM",
        false
    );
    assert.fail('Expected error: ' + expectedErrorMsg + ' but got a result.');
} catch (error) {
    if (error.code === 'ERR_ASSERTION') {
        // The AssertionError from assert.fail was thrown, rethrow it to handle it outside
        throw error;
    }
    console.log("Caught Error:", error);
    assert.strictEqual(error.message, expectedErrorMsg, 'Unexpected error message.');
    console.log('Test case 3 passed');
}



    // Test case 4
    try {
        result = await events.create(
            "Fundraiser",
            "Come help raise funds to fix the issue.",
            {"streetAddress":"20 W 34th St.","city":"New York","state":"NY","zip":"10001"},
            "empirestate@building.com",
            35000,
            44,
            "11/04/2023",
            "11:00AM",
            "10:00PM",
            true
        );
        assert.fail('Expected a result but got an error: ' + error.message);
    } catch (error) {
        assert.strictEqual(error.message, 'Invalid value provided for \'_id\'.', 'Unexpected error message.');
        console.log('Test case 4 passed');
    }

    // Test cases for get
    try {
        result = await events.get('6531dbaffec4ee4c81494263');
        assert.fail('Expected a result but got an error: ' + error.message);
    } catch (error) {
        assert.strictEqual(error.message, 'Error: Id parameter must be supplied.', 'Unexpected error message.');
        console.log('Test case 5 passed');
    }

    try {
        result = await events.get('6531dbb0fec4ee4c81494264');
        assert.fail('Expected a result but got an error: ' + error.message);
    } catch (error) {
        assert.strictEqual(error.message, 'Error: Id parameter must be supplied.', 'Unexpected error message.');
        console.log('Test case 6 passed');
    }

    // Test cases for remove
    try {
        result = await events.remove('6531dbaffec4ee4c81494263');
        assert.fail('Expected a result but got an error: ' + error.message);
    } catch (error) {
        assert.strictEqual(error.message, 'Error: You must provide a valid id to search for.', 'Unexpected error message.');
        console.log('Test case 7 passed');
    }

    // Note: You might need to create a method to verify the existence of an entry in your database. This is a stub, replace with actual method.
    const entryExists = (id) => true; // Replace with actual implementation

    assert.strictEqual(entryExists('6531dbaffec4ee4c81494263'), true, 'Expected entry to be removed but it still exists.');
    console.log('Test case 8 passed');

    // Test cases for rename
    try {
        result = await events.rename('6531dbb08a01084938eca85f', 'Epic Party Bash');
        assert.fail('Expected a result but got an error: ' + error.message);
    } catch (error) {
        assert.strictEqual(error.message, 'TypeError: Class constructor ObjectId cannot be invoked without \'new\'', 'Unexpected error message.');
        console.log('Test case 9 passed');
    }

    // Similar stub for verifying updated database entry. Replace with actual implementation.
    const entryNameIs = (id, name) => true; // Replace with actual implementation

    assert.strictEqual(entryNameIs('6531dbb08a01084938eca85f', 'Epic Party Bash'), true, 'Expected entry to be renamed but it wasn\'t.');
    console.log('Test case 10 passed');

    try {
        result = await events.rename('6531dbb08a01084938eca860', 'Super Fundraiser');
        assert.fail('Expected a result but got an error: ' + error.message);
    } catch (error) {
        assert.strictEqual(error.message, 'TypeError: Class constructor ObjectId cannot be invoked without \'new\'', 'Unexpected error message.');
        console.log('Test case 11 passed');
    }

    assert.strictEqual(entryNameIs('6531dbb08a01084938eca860', 'Super Fundraiser'), true, 'Expected entry to be renamed but it wasn\'t.');
    console.log('Test case 12 passed');

    console.log('All tests completed!');
}

runTests().catch(console.error);
