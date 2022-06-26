// Require Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// generating unique ids
const generateUniqueId = require("generate-unique-id");

// Initialize and parse express app
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

/////////////////pull in routes
// require("./public/routes/routes.js");
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
      const notes = JSON.parse(data);
      console.log("data", data);
      console.log("notes", notes);

      res.json(notes);
    }
  });
});
/////////////end of routes

//run app listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
