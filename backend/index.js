const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('EchoMap backend is running');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Sample safety locations
let safetyLocations = [
  { lat: 28.6139, lng: 77.209, name: "Delhi Point 1" },
  { lat: 28.7041, lng: 77.1025, name: "Delhi Point 2" },
  { lat: 28.5355, lng: 77.3910, name: "Noida" }
];

// GET all safety locations
app.get('/locations', (req, res) => {
  res.json(safetyLocations);
});

// POST new location (optional for later)
app.post('/locations', (req, res) => {
  const newLoc = req.body;
  safetyLocations.push(newLoc);
  res.json({ message: "Location added", location: newLoc });
});
