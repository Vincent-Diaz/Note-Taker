const fs = require("fs");
let data = fs.readFileSync("db/db.json", "utf-8");
let notesList = JSON.parse(data);


module.exports = function(app) {

    app.get("/api/notes", function (req, res) {
        res.json(notesList);
    });

    app.post("/api/notes", function (req, res) {
        notesList.push(req.body);
        fs.writeFileSync("db/db.json", JSON.stringify(notesList), function (err) {
            if (err) throw err;

        });
        res.json(notesList);

    });

    app.get("/api/notes/:id", function (req, res) {
        res.json(notesList[req.params.id]);
    });

    app.delete("/api/notes/:id", function (req, res) {
        notesList.splice(req.params.id, 1);
        fs.writeFileSync("db/db.json", JSON.stringify(notesList), function (err) {
            if (err) throw err;
        });
        res.json(notesList);
    });
}
