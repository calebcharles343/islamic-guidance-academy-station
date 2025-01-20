export interface UseVerification {
  status?: number;
  data: UseVerificationTypes;
  message?: string;
}

export interface UseVerificationTypes {
  verification: Verification;
  uploadedResponse?: UploadedResponse;
}

export interface Verification {
  station_id: string;
  station: string;
  name: string;
  drn: string;
  fileNumber: string;
  dateOfBirth: string;
  phone: string;
  ethnicGroup: string;
  stateOfOrigin: string;
  residentialAddress: string;
  occupation: string;
  familyHouseName: string;
  fhrn: string;
  nin: string;
  bvn: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface UploadedResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: any[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  asset_folder: string;
  display_name: string;
  api_key: string;
}

export interface SignupTypes {
  name: string;
  email: string;
  userName: string;
  station: string;
  drn: string;
  fileNumber: string;
  phone: string;
  password: string;
  passwordConfirm: string;
}

export interface VerificationTypes {
  form: FormTypes;
  photo: string | null;
}

export interface FormTypes {
  name: string;
  drn: string;
  fileNumber: string;
  dateOfBirth: string;
  phone: string;
  ethnicGroup: string;
  stateOfOrigin: string;
  residentialAddress: string;
  occupation: string;
  familyHouseName: string;
  fhrn: string;
  nin: string;
  bvn: string;
}

export interface VerifiedStudentsType {
  status: number;
  message: string;
  amount: number;
  data: StudentType[];
}

export interface StudentType {
  name: string;
  mrn: string;
  fileNumber: string;
  dateOfBirth: string;
  phone: string;
  ethnicGroup: string;
  stateOfOrigin: string;
  residentialAddress: string;
  occupation: string;
  familyHouseName: string;
  fhrn: string;
  nin: string;
  bvn: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  sequentialId: string;
  station_id?: number;
  station: string;
}
