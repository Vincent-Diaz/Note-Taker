const express = require("express");
//const fs = require("fs");
//const path = require("path");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

require("./routes/HTMLroutes")(app);
require("./routes/APIroutes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});

