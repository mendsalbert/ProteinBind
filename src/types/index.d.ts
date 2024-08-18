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

declare type CompoundData = {
  MolecularFormula: string;
  MolecularWeight: string;
  InChIKey: string;
  CanonicalSMILES: string;
  IsomericSMILES: string;
  IUPACName: string;
  XLogP: string;
  ExactMass: string;
  MonoisotopicMass: string;
  TPSA: string;
  Complexity: string;
  Charge: string;
  HBondDonorCount: string;
  HBondAcceptorCount: string;
  RotatableBondCount: string;
  HeavyAtomCount: string;
};

declare type ModalProps = {
  id: string;
  title: string;
  content: React.ReactNode;
  onCloseText: string;
};
