// Require Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// generating unique ids
const generateUniqueId = require("generate-unique-id");
const { get } = require("http");

// Initialize and parse express app
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/////////////////pull in routes
// require("./public/routes/routes.js");

//populate index.html file for the website on landing
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);
//put notes in html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);
//get notes from db and parse them
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
      const notes = JSON.parse([data]);
      console.log("data", data);
      console.log("notes", notes);

      res.json(notes);
    }
  });
});
//look for new notes and add to db
app.post("/api/notes", (req, res) => {
  // fs.readFile("./db/db.json", "utf8", (err, data) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     const notes = data + req.body;
  // notes.push(req.body);
  // res.json(notes);
  console.log(res.body, req.body);
  const note = res.body;
  fs.writeFile("./db/db.json", note, (err) => {
    if (err) {
    } else {
      console.log("saving notes");
      res.send(note);
    }
    console.log("written successfully");
  });
  // }
});
// });
//delete note
app.delete("/api/notes/:id", (req, res) => {
  fs.writeFile("./db/db.json", notes, (err) => {
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
      // const notes = JSON.stringify(data);
      console.log("delete");
      res.json.stringify(notes); ///or should it be res.send???
    }
  });
});
/////////////end of routes

//run app listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
