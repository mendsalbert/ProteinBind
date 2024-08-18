"use server";

import { revalidatePath } from "next/cache";
import MoleculeGenerationHistory from "../database/models/molecule-generation.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import mongoose from "mongoose";

// CREATE MOLECULE GENERATION HISTORY
export async function createMoleculeGenerationHistory(
  payload: MoleculeGenerationHistoryType,
  userId: string,
) {
  try {
    await connectToDatabase();

    const newHistoryEntry = await MoleculeGenerationHistory.create({
      ...payload,
      user: new mongoose.Types.ObjectId(userId), // Associate with the user
    });

    return JSON.parse(JSON.stringify(newHistoryEntry));
  } catch (error) {
    console.error("Error creating history entry:", error);
    handleError(error);
  }
}

// GET ALL MOLECULE GENERATION HISTORY
export async function getMoleculeGenerationHistoryByUser(userId: string) {
  try {
    await connectToDatabase();

    const historyEntries = await MoleculeGenerationHistory.find({
      user: userId, // Filter by user
    }).sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(historyEntries));
  } catch (error) {
    console.error("Error retrieving history entries:", error);
    handleError(error);
  }
}

// GET MOLECULE GENERATION HISTORY BY ID
export async function getMoleculeGenerationHistoryById(historyId: string) {
  try {
    await connectToDatabase();

    const historyEntry = await MoleculeGenerationHistory.findById(historyId);
    if (!historyEntry) throw new Error("History entry not found");

    return JSON.parse(JSON.stringify(historyEntry));
  } catch (error) {
    console.error("Error retrieving history entry by ID:", error);
    handleError(error);
  }
}

// DELETE A MOLECULE GENERATION HISTORY ENTRY
export async function deleteMoleculeGenerationHistory(entryId: string) {
  try {
    await connectToDatabase();

    const deletedEntry =
      await MoleculeGenerationHistory.findByIdAndDelete(entryId);

    return JSON.parse(JSON.stringify(deletedEntry));
  } catch (error) {
    console.error("Error deleting history entry:", error);
    handleError(error);
  }
}
