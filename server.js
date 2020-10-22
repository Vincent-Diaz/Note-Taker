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

app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "/public/index.html"));
    // console.log("home");
});

app.get("/api/notes", function (req, res) {
    const notesList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(notesList);
});

app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    //let newId = uuidv4();
    //newNote.id = newId;

    let noteArr = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    noteArr.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(noteArr), "utf8");
    res.json(noteArr);

});

// require("./routes/HTMLroutes")(app);
// require("./routes/APIroutes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});

