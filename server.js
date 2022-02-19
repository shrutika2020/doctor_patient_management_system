const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./models/index");
db.sequelize.sync({ }).then(() => {
// server.listen(PORT)
    console.log("Drop and re-sync db.");
}).catch(e=> console.log(e))

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to doctor patient management application." });
});

const doctor = require('./routes/doctor_patient.routes');

app.use('/doctor/',doctor)

// set port, listen for requests
const PORT =  8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});