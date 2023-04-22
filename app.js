const mongoose = require("mongoose");
const express = require("express");
const app = express();

const doctorRoute = require("./routes/doctor");
const patientRoute = require("./routes/patient");
var bodyParser = require("body-parser");
var cors = require("cors");
mongoose.set("strictQuery", true);

//DB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/appointment", {
    useUnifiedTopology: true,
    keepAlive: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//PORT
const PORT = 8000;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/*+json" }));

// routes
app.use("/doctor", doctorRoute);
app.use("/patient", patientRoute);


//Starting a server
app.listen(PORT, () => {
  return console.log(`Server is up and running at ${PORT}`);
});
