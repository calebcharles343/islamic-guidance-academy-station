export interface FileType {
  name: string
  url: string
  cloudinaryId: string
  mimeType: string
  size: number
  fileType: string
  createdAt: string
  updatedAt: string
  id: string
}

export interface UseVerification {
  status?: number
  data: UseVerificationTypes
  message?: string
}

export interface UseVerificationTypes {
  verification: Verification
  uploadedResponse?: UploadedResponse
}

export interface Verification {
  station_id?: number
  station?: string
  name: string
  mrn: string
  fileNumber: string
  dateOfBirth: string
  phone: string
  ethnicGroup: string
  stateOfOrigin: string
  residentialAddress: string
  occupation: string
  familyHouseName: string
  sequentialId: string
  fhrn: string
  nin: string
  bvn: string
  photo: string
  createdAt: string
  updatedAt: string
  id: string
}

// export interface MRNQuery {
//   status: number;
//   message: string;
//   data: { files: MRNType[] };
// }

// export interface MRNType {
//   firstName: string;
//   middleName?: string;
//   lastName: string;
//   stateOfOrigin: string;
//   dateOfBirth: string;
//   religion: string;
//   mrn: string;
//   fileNumber: string;
//   nationality: string;
//   ethnicGroup: string;
//   phone: string;
//   sequentialId?: string;
//   createdAt: string;
//   updatedAt: string;
//   id?: string;
//   files?: [];
//   createdBy: StationTypes;
// }

// interfaces/index.ts or wherever you keep them
export interface MRNQuery {
  status: number | string // depending on your handleResponse
  message: string
  data: { files: MRNType[] }
}

export interface MRNType {
  firstName: string
  middleName?: string
  lastName: string
  familyName?: string // NEW
  stateOfOrigin: string
  dateOfBirth: string // YYYY-MM-DD
  religion: string // e.g. "M0" | "M1" | "M2"
  mrn: string
  fileNumber: string
  nationality: string
  ethnicGroup: string

  address?: string // NEW
  residentialAddress?: string // NEW

  phone: string
  bvn?: string // NEW
  nin?: string // NEW
  politicalParty?: string // NEW
  relativePhone?: string // NEW
  assistanceOfficerRN?: string // NEW

  sequentialId?: string
  createdAt: string
  updatedAt: string
  id?: string
  files?: []
  createdBy: StationTypes
}

export interface UploadedResponse {
  asset_id: string
  public_id: string
  version: number
  version_id: string
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  tags: any[]
  bytes: number
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  asset_folder: string
  display_name: string
  api_key: string
}

export interface StationTypes {
  id?: string
  name: string
  email: string
  userName: string
  station: string
  department: string
  drn: string
  fileNumber: string
  phone: string
  password: string
  passwordConfirm: string
  sequentialId?: string
  createdAt?: string
}

export interface VerificationTypes {
  form: Verification
  photo: string | null
}

// export interface FormType {
//   name: string;
//   mrn: string;
//   fileNumber: string;
//   dateOfBirth: string;
//   phone: string;
//   ethnicGroup: string;
//   stateOfOrigin: string;
//   residentialAddress: string;
//   occupation: string;
//   familyHouseName: string;
//   fhrn: string;
//   nin: string;
//   bvn: string;
//   station?: string;
// }

export interface VerifiedMembersType {
  status: number
  message: string
  amount: number
  data: Verification[]
}
