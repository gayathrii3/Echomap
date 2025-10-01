const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("EchoMap Backend is Running");
});

// Sample safety locations
let safetyLocations = [
  { lat: 28.6139, lng: 77.209, name: "Hyderabad Point 1" },
  { lat: 28.7041, lng: 77.1025, name: "Hyderabad Point 2" },
  { lat: 28.5355, lng: 77.3910, name: "Secunderabad" }
];

// Endpoint to get locations
app.get("/locations", (req, res) => {
  res.json(safetyLocations);
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

