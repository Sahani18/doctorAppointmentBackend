const mongoose = require("mongoose");

var patientSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  email:{
    type:String,
    unique:true,
    required:true,
    trim:true    
  },
  password:{
    type:String,
   maxlength:32,
    required:true,
  },
  age: {
    type: Number,
    required: true,
    trim: true,
  },
  bookingDate:{
    type:Array,
    default:[]
  },
  contact: {
    type: Number,
    required: true,
    trim: true,
  },
  role:{
    type:Number,
    default:0
  }
},{timestamps: true});

module.exports = mongoose.model("Patient", patientSchema);
