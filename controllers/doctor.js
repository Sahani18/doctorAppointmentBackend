const Doctor = require("../models/doctor");
const Patient = require("../models/patient");

//for signup
//get all data from req.body
//all the data should exist
//check if user already exists
//encrypt the pwd
//save user in db
//generate a token for user and send it

exports.signup = (req, res) => {
  const doctor = new Doctor(req.body);
  doctor.save((err, doctor) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.send(doctor);
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  Doctor.findOne({ email }, (err, doctor) => {
    if (err) {
      return res.status(400).json({
        error: "User not Found in DB",
      });
    }
    if (doctor.password != password) {
      return res.status(401).json({
        error: "Password incorrect",
      });
    }

    //we are sending these info to frontend
    const { _id, fullname, email, appointment, specialization } = doctor;
    res.send({
      doctor: {
        _id,
        fullname,
        email,
        appointment,
        specialization,
      },
    });
  });
};

exports.signout = (req, res) => {
  return res.json({ message: "Sign OUT " });
};

exports.checkAllAppointment = (req, res) => {
  const { email } = req.body;

  Doctor.findOne({ email }, (error, doctor) => {
    if (error) {
      return res.status(400).json({ message: "Error Searching Doctor" });
    }
    if (doctor.appointment != null) {
      return res.send(doctor.appointment);
    } else res.status(400).json({ message: "Appointmnet NOT found" });
  });
};



exports.removeAppointment = (req, res) => {
  const { id, index, appointment } = req.body;
  var toBeDeletedAppointment;
  //this will contain id of patient for further reference to delete appointment in Patient model
  //get patient id before deleting the appointment slot
  Doctor.findById(id, (err, doctor) => {
    if (err) {
      return res.status(400).json({ error: "Error to find" });
    } else {
      toBeDeletedAppointment = doctor.appointment[index];
      // delete the slot by updating it with 0 (appointment's value will be passed 0 from frontend)
      Doctor.findByIdAndUpdate(
        { _id: id },
        { $set: { [`appointment.${index}`]: appointment } },
        { new: true, useFindAndModify: false },
        (err, doctor) => {
          if (err) {
            return res.status(400).json({ error: "Cannot Delete " });
          }
        },
        //once doctors slot is deleted now check patient's booking and remove appointment for that doctor
        Patient.findByIdAndUpdate(
          { _id: toBeDeletedAppointment },
          {
            $pull: { bookingDate: { id: id, index: index } },
          },
          { upsert: false, multi: true },
          (err, patient) => {
            if (err) {
              return res.status(400).json({
                message: "Couldn't be deleted",
              });
            }
            res.json({
              message: "Deleted Successfully",
            });
          }
        )
      );
    }
  });
};

exports.getDoctorDetail = (req, res) => {
  const { docId } = req.body;
  Doctor.findById({ _id: docId }).exec((err, doctor) => {
    if (err) {
      return res.status(400).json({
        error: "Doctor not Found",
      });
    }
    const { fullname, email, appointment } = doctor;
    res.json({ fullname, email, appointment });
  });
};
