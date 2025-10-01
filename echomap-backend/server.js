const express = require("express");
const app  express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${Port}`);
});


