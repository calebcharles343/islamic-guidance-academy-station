import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import SpinnerMini from "../../ui/SpinnerMini";
import { Verification } from "../../interfaces";
import toast from "react-hot-toast/headless";
import { useUpdateMember } from "./useUpdateMember";
import Label from "../../ui/Label";
import Input from "../../ui/Input";

interface EditVerificationFormProps {
  member: Verification;
  setIsEdit: (value: boolean) => void;
}

const EditMemberForm: React.FC<EditVerificationFormProps> = ({
  member,
  setIsEdit,
}) => {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Verification>>({
    name: member.name,
    mrn: member.mrn,
    fileNumber: member.fileNumber,
    dateOfBirth: member.dateOfBirth,
    phone: member.phone,
    ethnicGroup: member.ethnicGroup,
    stateOfOrigin: member.stateOfOrigin,
    residentialAddress: member.residentialAddress,
    occupation: member.occupation,
    familyHouseName: member.familyHouseName,
    fhrn: member.fhrn,
    nin: member.nin,
    bvn: member.bvn,
  });

  useEffect(() => {
    setFileInputState("");
  }, []);

  const { updateMember, isPending } = useUpdateMember(member.id);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    previewFile(file);
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result as string);
    };
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      form: formData,
      photo: previewSource,
    };

    updateMember(data as any);

    setPreviewSource(null);
    setIsEdit(false);
  };

  return (
    <div
      className=" flex flex-col h-screen text-white overflow-y-scroll mt-4 pb-4 "
      style={{ fontFamily: "Roboto", letterSpacing: "0.8px" }}
    >
      <div className="py-10 flex flex-col items-center justify-center">
        <div className=" mb-4 flex flex-col items-center gap-2">
          <h1 className="text-sm md:text-lg  font-extrabold">
            ISLAMIC GUIDANCE ACADAMY STATION
          </h1>
          <p>Update Verification</p>
        </div>

        <div className=" w-full md:w-[400px] flex items-center justify-center gap-2">
          <form onSubmit={handleSubmit} className=" flex flex-col w-full gap-2">
            <div className="flex flex-col items-center gap-2">
              <div className="text-center text-sm font-bold w-24 h-24 border">
                {previewSource ? (
                  <img
                    src={previewSource}
                    alt="avatar"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  "PASSPORT"
                )}
              </div>
              <input
                id="imageInput"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileInputChange}
                value={fileInputState}
              />
              <label
                htmlFor="imageInput"
                className="flex items-center justify-center text-[10px] border border-solid border-white bg-slate-800 rounded-sm cursor-pointer w-24 sm:w-24 p-2"
              >
                Upload Photo
              </label>
            </div>
            <div className=" flex flex-col  items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10  bg-white bg-opacity-90 p-6 rounded-md shadow-xl backdrop-blur-lg mx-4 md:mx-0">
              <div className="flex flex-col w-full gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="mrn">MRN</Label>
                  <Input
                    id="mrn"
                    type="text"
                    placeholder="Enter your MRN"
                    value={formData.mrn}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="fileNumber">File Number</Label>
                  <Input
                    id="fileNumber"
                    type="text"
                    placeholder="Enter your file number"
                    value={formData.fileNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="dateOfBirth">Date Of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="text"
                    placeholder="Enter your date of birth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    pattern="\d{11}" // Enforces exactly 11 digits
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="ethnicGroup">Ethnic Group</Label>
                  <Input
                    id="ethnicGroup"
                    type="text"
                    placeholder="Enter ethnic group"
                    value={formData.ethnicGroup}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="stateOfOrigin">State Of Origin</Label>
                  <Input
                    id="stateOfOrigin"
                    type="text"
                    placeholder="Enter your state of origin"
                    value={formData.stateOfOrigin}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="residentialAddress">
                    Residential Address
                  </Label>
                  <Input
                    id="residentialAddress"
                    type="text"
                    placeholder="Enter your residential address"
                    value={formData.residentialAddress}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    type="text"
                    placeholder="Enter your occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="familyHouseName">Family House Name</Label>
                  <Input
                    id="familyHouseName"
                    type="text"
                    placeholder="Enter your family house name"
                    value={formData.familyHouseName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="fhrn">FHRN</Label>
                  <Input
                    id="fhrn"
                    type="text"
                    placeholder="Enter your FHRN"
                    value={formData.fhrn}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="nin">National Identification Number</Label>
                  <Input
                    id="nin"
                    type="text" // Use "text" instead of "number"
                    placeholder="National identification number"
                    value={formData.nin}
                    pattern="\d{11}" // Enforces exactly 11 digits
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="bvn">Bank Verification Number</Label>
                  <Input
                    id="bvn"
                    type="text" // Use "text" instead of "number"
                    placeholder="Bank verification number"
                    value={formData.bvn}
                    pattern="\d{11}" // Enforces exactly 11 digits
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-8 md:h-10 flex justify-center items-center bg-gray-800 text-white rounded-md shadow-md"
                disabled={isPending}
              >
                {isPending ? <SpinnerMini /> : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMemberForm;
