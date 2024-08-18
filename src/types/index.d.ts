declare type MoleculeStructure = {
  structure: string;
  score: number;
};

declare type MoleculeGenerationHistoryType = {
  _id?: string;
  smiles: string;
  numMolecules: number;
  minSimilarity: number;
  particles: number;
  iterations: number;
  generatedMolecules: MoleculeStructure[];
  createdAt?: Date;
};

declare type CreateUserParams = {
  email: string;
  fullname?: string;
  password: string;
  photo: string;
  firstName?: string;
  lastName?: string;
  userBio?: string;
  isEmailVerified?: boolean;
};

declare type UpdateUserParams = {
  firstName: string;
  lastName: string;
  photo: string;
  userBio?: string;
  email: string;
};
