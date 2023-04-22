const mongoose = require("mongoose");

var doctorSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    registration: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      maxlength: 32,
      required: true,
    },
    appointment: {
      type: Array,
      default: ["0", "0", "0", "0", "0"], //userid will be filled in this
    },
    specialization: {
      type: String,
      maxlength: 32,
      trim: true,
      default: "MBBS",
    },
    contact: {
      type: Number,
      trim: true,
    },
    role: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Doctor", doctorSchema);
