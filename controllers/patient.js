const Patient = require("../models/patient");
const Doctor = require("../models/doctor");

exports.signup = (req, res) => {
  const patient = new Patient(req.body);
  patient.save((err, patient) => {
    if (err) {
      return res.status(400).json({
        error: "Patient not saved in DB",
      });
    }
    res.send(patient);
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  Patient.findOne({ email }, (error, patient) => {
    if (error) {
      return res.status(400).json({
        error: "User not Found in DB",
      });
    }
    if (patient.password != password) {
      return res.status(401).json({
        error: "Password incorrect",
      });
    }
    //we are sending these info to frontend
    res.json(patient);
  });
};

exports.bookAppointment = (req, res) => {
  //get id of doctor who's appointment has to be booked

  const { id, appointment, index } = req.body;

  //find doctor in db & update appointment array
  Doctor.findByIdAndUpdate(
    { _id: id },
    { $set: { [`appointment.${index}`]: appointment } },
    { new: true, useFindAndModify: false },
    (err, doctor) => {
      if (err) {
        return res.status(400).json({ message: "Error in Booking" });
      } else {
        Patient.findByIdAndUpdate(
          { _id: appointment },
          { $push: { bookingDate: req.body } },
          { new: true, useFindAndModify: false },
          (err, patient) => {
            if (err) {
              return res
                .status(400)
                .json({ message: "Error in saving Booking" });
            } else
              res.json({
                message: "APPOINTMENT BOOKED SUCCESSFULLY",
              });
          }
        );
      }
    }
  );
  // if above step is successfull then save the appointment date in patients slot
};

exports.getAllDoctors = (req, res) => {
  Doctor.find((err, doctor) => {
    if (err) {
      res.status(400).json({
        message: "No Doctor Found",
      });
    }
    res.send(doctor);
  });
};

exports.seeMyAppointment = (req, res) => {
  const { id } = req.body;
  Patient.findById(id, (err, patient) => {
    if (err) {
      res.status(400).json({ message: "No user found" });
    }
    res.send(patient.appointment);
  });
};

exports.getPatientAppointment = (req, res) => {
  const { id } = req.body;
  Patient.findById(id).exec((err, patient) => {
    if (err || !patient) {
      return res.status(400).json({ message: "Patient not Found" });
    }
    res.json(patient.bookingDate);
  });
};
