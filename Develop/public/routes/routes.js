//dependencies
const path = require("path");
const fs = require("fs");
// const db = require("./db/db.json"); ///need?

//export to server.js
module.exports = (app) => {

  // retrieve existing notes from db.json
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    // Convert string into JSON object
    var notes = json.parse(data);
    //////////////////API routes///////////////////
    //get api/notes route, used to return the notes as JSON to the server???
    app.get("/api/notes", (req, res) =>
      res.sendFile(path.join(__dirname, "/public/notes.html"))
    );
    //api post route, takes a new note and adds it to the notes variable
    app.post("/api/notes", function (req, res) {
          // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    //////////in index.js?
    const newNote = {
      title,
      text,
      id: generateUniqueId(),
    };
      // Receives a new note, adds it to db.json, then returns the new note
      newNote = req.body;
      notes.push(newNote);
      updateDb();
          const response = {
      status: "success",
      body: newNote,
    };
    console.log(response);
    res.json(response);
      return console.log("Added new note: " + newNote.title);
    };
})


    // update db.json anytime a note is added or deleted
    function updateDb() {
      fs.writeFile("./db/db.json", JSON.stringify(notes, null, 4), (writeErr) =>
        writeErr
          ? console.error(writeErr)
          : console.info("Successfully updated notes!")
      );}
    })
}
  
  

    //////////////////View routes///////////////////
    //send notes to notes.html page to display them
//?????????????????
    // GET request for notes
    app.get("/api/notes", (req, res) => {
      // Send a message to the client
      res.json(`${req.method} request received to get notes`);

      // Log our request to the terminal
      console.info(`${req.method} request received to get notes`);
    });

      // Log our request to the terminal
      console.info(`${req.method} request received to get reviews`);
    
    // "Display index.html when all other routes are accessed"??





///////////////////////////////


///// do we need this or is this all handled currently by the active note etc???
// GET request for a single review
app.get("/api/reviews/:review_id", (req, res) => {
  if (req.params && req.params.review_id) {
    console.info(`${req.method} request received to get a single a review`);
    const reviewId = req.params.review_id;
    for (let i = 0; i < reviews.length; i++) {
      const currentReview = reviews[i];
      if (currentReview.review_id === reviewId) {
        res.json(currentReview);
        return;
      }
    }
    res.json("Review ID not found");
  }
});






