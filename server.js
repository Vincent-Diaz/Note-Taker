const express = require("express");
//const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const {json} = require("express");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// app.get("*", function(req, res){
//     res.sendFile(path.join(__dirname, "/public/index.html"));
//     // console.log("home");
// });

app.get("/api/notes", function (req, res) {
    const notesList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(notesList);
});

app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    //let newId = uuidv4();
    //newNote.id = newId;

    var noteArr = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    newNote.id = Math.floor(Math.random()*1000)
    noteArr.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(noteArr), "utf8");
    res.json(noteArr);

});

app.delete("/api/notes/:id", function (req, res) {
    const { id } = req.params
    let notesArray = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    for(let i = 0; i < notesArray.length; i++){
        if(notesArray[i].id == id){
            console.log("Note deleted: " + JSON.stringify(notesArray[i]));
            notesArray.splice(i, 1)
            break;
        }
    }
    fs.writeFileSync("./db/db.json", JSON.stringify(notesArray), "utf8");
    res.json(notesArray);
});

// require("./routes/HTMLroutes")(app);
// require("./routes/APIroutes")(app);
app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "/public/index.html"));
    // console.log("home");
});

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});

