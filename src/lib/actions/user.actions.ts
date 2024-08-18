"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import { sendVerificationEmail, sendResetPasswordEmail } from "./email.actions";

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const newUser = await User.create({
      ...user,
      password: hashedPassword,
      userBio: user.userBio || "",
    });

    const verificationUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/verify-email?token=${newUser._id}`;
    await sendVerificationEmail(
      newUser.email,
      newUser.firstName || "User",
      verificationUrl,
    );

    return JSON.parse(JSON.stringify(newUser));
  } catch (error: any) {
    console.log(error);
    handleError(error);
    throw new Error(
      error.message || "An error occurred during user registration",
    );
  }
}

export async function loginUser(email: string, password: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function verifyEmail(token: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(token);
    if (!user) throw new Error("Invalid token or user not found");

    user.isEmailVerified = true;
    await user.save();

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function requestPasswordReset(email: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    const resetUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/reset-password?token=${user._id}`;
    await sendResetPasswordEmail(
      user.email,
      user.firstName || "User",
      resetUrl,
    );

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function resetPassword(token: string, newPassword: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(token);
    if (!user) throw new Error("Invalid token or user not found");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function getUserById(userId: string) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ Id: userId });
    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(Id: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();
    const updatedUser = await User.findOneAndUpdate({ _id: Id }, user, {
      new: true,
    });
    if (!updatedUser) throw new Error("User update failed");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(Id: string) {
  try {
    await connectToDatabase();

    const userToDelete = await User.findOne({ Id });
    if (!userToDelete) {
      throw new Error("User not found");
    }

    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

export async function updateCredits(userId: string, creditFee: number) {
  try {
    await connectToDatabase();

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee } },
      { new: true },
    );

    if (!updatedUserCredits) throw new Error("User credits update failed");

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    handleError(error);
  }
}

export async function getUserByEmail(email: string) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}
