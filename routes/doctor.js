const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  signout,
  checkAllAppointment,
  removeAppointment,
  getDoctorDetail,
} = require("../controllers/doctor");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);
router.post("/checkAllAppointment", checkAllAppointment);
router.put("/removeAppointment", removeAppointment);
router.post("/getDoctorDetail", getDoctorDetail);

module.exports = router;
