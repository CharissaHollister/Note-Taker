// Require Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// generating unique ids
const generateUniqueId = require("generate-unique-id");

// Initialize and parse express app
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//pull in routes
require("./public/routes/routes.js");
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

//run app listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
