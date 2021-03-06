// Require Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// generating unique ids
const generateUniqueId = require("uniqid");

// Initialize and parse express app
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

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
      const notes = JSON.parse(data);

      res.json(notes);
    }
  });
});
//look for new notes and add to db
app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const notes = JSON.parse(data);
      req.body.id = generateUniqueId();
      const noteNew = req.body;
      notes.push(noteNew);
      fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify(notes)
      );
      res.send("ok");
    }
  });
});

//delete note
app.delete("/api/notes/:noteId", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const notes = JSON.parse(data);
      const result = notes.filter((note) => note.id !== req.params.noteId);
      fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify(result)
      );
      res.send("ok");
    }
  });
});
/////////////end of routes

//run app listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
