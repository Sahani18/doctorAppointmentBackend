const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  bookAppointment,
  getAllDoctors,
  updateUserData,
  getPatientAppointment,
} = require("../controllers/patient");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/getPatientAppointment", getPatientAppointment);
router.put("/bookAppointment", bookAppointment);
router.get("/getAllDoctors", getAllDoctors);
/* router.put("/updateUserData",updateUserData); */

module.exports = router;
