import { MongoClient, ObjectId } from 'mongodb';


// Connection URL and Database Name
const url = 'mongodb://localhost:27017';
const dbName = 'Elisa_McGraw_Lab6';

// Sample Data
const sampleAttendees = [
  {
    _id: new ObjectId(),
    firstName: "Jennifer",
    lastName: "Cheng",
    emailAddress: "JCheng123@gmail.com"
  },
  {
    _id: new ObjectId(),
    firstName: "Mike",
    lastName: "Jordan",
    emailAddress: "MJ23@gmail.com"
  },
  {
    _id: new ObjectId(),
    firstName: "Lucy",
    lastName: "Smith",
    emailAddress: "LucyS@gmail.com"
  },
  {
    _id: new ObjectId(),
    firstName: "Daniel",
    lastName: "Craig",
    emailAddress: "DCraig007@gmail.com"
  }
];

const events = Array.from({ length: 10 }, (_, index) => ({
  eventName: `Event #${index + 1}`,
  description: `Description for event #${index + 1}`,
  eventLocation: {
    streetAddress: `${index + 1} Main Street`,
    city: "Hoboken",
    state: "NJ",
    zip: "07030"
  },
  contactEmail: `event${index + 1}@example.com`,
  maxCapacity: 50,
  priceOfAdmission: index * 10,
  eventDate: `08/${25 + index}/2024`,
  startTime: `${2 + index}:00 PM`,
  endTime: `${3 + index}:00 PM`,
  publicEvent: index % 2 === 0,
  attendees: sampleAttendees.slice(0, index % 4 + 1),  // Varying number of attendees for each event
  totalNumberOfAttendees: index % 4 + 1
}));

async function main() {
  let client;

  try {
    // Use connect method to connect to the server
    client = await MongoClient.connect(url, { useUnifiedTopology: true });
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const eventsCollection = db.collection('events');

    // Insert Events
    const insertResult = await eventsCollection.insertMany(events);
    console.log("Inserted events into the database", insertResult);

  } catch (err) {
    console.log(err.stack);
  }

  if (client) {
    client.close();
  }
}

main().catch(console.error);
