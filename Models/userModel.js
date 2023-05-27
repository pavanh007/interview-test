import mongoose from "mongoose";
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";


const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: uuidv4(),
      unique: true,
    },
    first_name: {
      type: String,
      required: [true, "User should have first name"],
    },
    last_name: {
      type: String,
      required: [true, "User should have last name"],
    },
    gmail: {
      type: String,
      required: [true, "User should have email address"],
      unique: true,
    },
    mobileNo: {
      type: String,
      required: ["User must have phone number"],
      unique: true,
      match: /^((\+91)?(\s|-)?)(\d{10})$/,
    },
    dateOfBirth: {
      type: Date,
      format: "YYYY-MM-DD",
      required: true,
      trim: true,
    },
    active: {
      type: String,
      enum: ["INACTIVE", "ACTIVE"],
      default: "ACTIVE",
      select: false,
      required: true, 
    },
    company: {
      type: String,
      required: [true, "User should have company"],
      unique: true,
    },
    city: {
      type: String,
      required: [true, "User should have city"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

export async function validateCreateUser(userData) {
  const schema = Joi.object({
    first_name: Joi.string().min(3).required(),
    last_name: Joi.string().min(3).required(),
    gmail: Joi.string().email({ tlds: { allow: false } }),
    mobileNo: Joi.string()
      .pattern(/^((\+91)?(\s|-)?)(\d{10})$/)
      .required(),
    dateOfBirth: Joi.date().format("iso").raw().required(),
    active: Joi.string().valid("ACTIVE", "INACTIVE").required(),
    company: Joi.string().required(),
    city: Joi.string().required(),
  });
  try {
    return schema.validate(userData);
  } catch (error) {
    console.error(error);
  }
}
