const express = require("express");
const { faker } = require("@faker-js/faker"); // Updated import
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const generateRandomRecords = () => {
  const records = [];
  for (let i = 0; i < 100; i++) {
    records.push({
      timestamp: new Date().toISOString(),
      axles: faker.number.int({ min: 2, max: 6 }), // Updated method
      height: faker.number.int({ min: 90, max: 250 }), // Updated method
      classification: faker.helpers.arrayElement([
        "car",
        "van",
        "truck",
        "bus",
        "bike",
      ]), // Updated method
    });
  }
  return records;
};

let records = generateRandomRecords();

app.get("/api/records", (req, res) => {
  res.json(records);
});

setInterval(() => {
  records = generateRandomRecords();
}, 15000); // Refresh records every 15 seconds

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
