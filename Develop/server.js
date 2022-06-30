// Require Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// generating unique ids
const generateUniqueId = require("generate-unique-id");
const { get } = require("http");
const { stringify } = require("querystring");

// Initialize and parse express app
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/////////////////pull in routes
require("./public/routes/routes.js");

//run app listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
