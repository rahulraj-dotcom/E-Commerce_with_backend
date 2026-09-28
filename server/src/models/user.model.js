import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  /**
   * name , email , password , confirmPassword
   */

  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
//   confirmPasswordHash: {
//     type: String,
//     required: true,
//   },
  refreshToken: {
    type: String,
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
