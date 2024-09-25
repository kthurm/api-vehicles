const functions = require("firebase-functions");
const express = require("express");
const { faker } = require("@faker-js/faker");
const cors = require("cors");

const app = express();
app.use(cors());

const generateRandomRecords = () => {
  const records = [];
  for (let i = 0; i < 100; i++) {
    const randomDate = faker.date.past(30);
    records.push({
      timestamp: randomDate.toISOString(),
      occupants: faker.number.int({ min: 1, max: 6 }),
      height: faker.number.int({ min: 90, max: 250 }),
      classification: faker.helpers.arrayElement([
        "car",
        "van",
        "truck",
        "bus",
        "bike",
      ]),
    });
  }
  return records;
};

let records = generateRandomRecords();

app.get("/", (req, res) => {
  if (records.length > 0) {
    res.json(records);
  } else {
    res.status(404).send("No records found.");
  }
});

setInterval(() => {
  records = generateRandomRecords();
}, 15000);

exports.api = functions.https.onRequest(app);
