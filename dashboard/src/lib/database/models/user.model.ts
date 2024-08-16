import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      unique: false,
      required: false,
    },
    photo: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    profession: {
      type: String,
    },
    planId: {
      type: Number,
      default: 1,
    },
    creditBalance: {
      type: Number,
      default: 10,
    },
    password: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    verificationExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    sessions: [
      {
        token: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          expires: "30d",
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const User = models?.User || model("User", UserSchema);

export default User;
