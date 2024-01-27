import mongoose from "mongoose";

export const UserRegistrationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 70,
    },
    
    age: {
      type: Number,
      required: true,
      min: [15, "You are younger than the required age"],
      max: [150, "Enter a valid age"],
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    
    password: {
      type: String,
      required: true,
    },

    Avatar:{
      // For user's image on profile
      type:String
    }
  },
  {
    timestamps: true, // Enable automatic timestamps
  }
);
