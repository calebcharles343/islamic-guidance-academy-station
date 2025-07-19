import { FormEvent, useState } from "react";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import { MRNType } from "../../interfaces";
import { useLogout } from "../authenticaton/useLogout";
import { BiLogOut } from "react-icons/bi";
import SpinnerMini from "../../ui/SpinnerMini";
import { religions, states } from "../station/data/stationData";
import { useCreateFile } from "./useCreateFile";
import Select from "../../ui/Select";
import { FileUpload } from "../../ui/FileUpload";

const FormMRN = () => {
  const [formData, setFormData] = useState<Partial<MRNType>>({
    firstName: "",
    middleName: "",
    lastName: "",
    stateOfOrigin: "",
    dateOfBirth: "",
    religion: "",
    nationality: "",
    ethnicGroup: "",
    phone: "",
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fileError, setFileError] = useState("");

  const { create, isPending } = useCreateFile(); // Hook for creating file

  const handleInputChange = (
    field: keyof MRNType,
    value: string | string[] | number
  ) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.middleName) newErrors.middleName = "Middle name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.stateOfOrigin)
      newErrors.stateOfOrigin = "State of origin is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.nationality)
      newErrors.nationality = "Nationality is required";
    if (!formData.religion) newErrors.religion = "Religion is required";
    if (!formData.ethnicGroup)
      newErrors.ethnicGroup = "Ethnic group is required";
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{11}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 11 digits";
    }

    setErrors(newErrors);

    // Validate files
    if (selectedFiles.length < 1) {
      setFileError("At least one file is required");
      return false;
    } else {
      setFileError("");
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    create({ data: formData, files: selectedFiles });
  };

  const { logout, isPending: isLoggingOut } = useLogout();

  const handleLogout = async () => {
    logout();
  };

  return (
    <div
      className=" flex flex-col h-screen text-white bg-blue-500  overflow-y-scroll md:px-4 pt-8 pb-16"
      style={{ fontFamily: "Roboto", letterSpacing: "0.8px" }}
    >
      <div className="ml-2 md:ml-0">
        {isLoggingOut ? (
          <SpinnerMini />
        ) : (
          <button
            className="flex items-center justify-center gap-2 mt-auto mb-0 text-gray-800 bg-gray-50 p-2 rounded hover:bg-gray-800 hover:text-gray-50 transition-colors duration-200"
            onClick={handleLogout}
          >
            <BiLogOut />
            Log out
          </button>
        )}
      </div>

      <div className="py-10 flex flex-col items-center justify-center">
        <div className=" mb-4 flex flex-col items-center gap-2">
          <h1 className="text-sm md:text-lg  font-extrabold">
            ISLAMIC GUIDANCE ACADAMY STATION
          </h1>
          <p>File Generator</p>
        </div>

        <div className=" w-full md:w-[400px] flex items-center justify-center gap-2">
          <form onSubmit={handleSubmit} className=" flex flex-col w-full gap-2">
            <div className=" flex flex-col  items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10  bg-white bg-opacity-90 p-6 rounded-md shadow-xl backdrop-blur-lg mx-4 md:mx-0">
              <div className="flex flex-col w-full gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    required
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="middleName">Middle Name</Label>
                  <Input
                    id="middleName"
                    type="text"
                    placeholder="Enter your middle name"
                    value={formData.middleName}
                    onChange={(e) =>
                      handleInputChange("middleName", e.target.value)
                    }
                    required
                  />
                  {errors.middleName && (
                    <p className="text-red-500 text-sm">{errors.middleName}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    required
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="stateOfOrigin">State Of Origin</Label>
                  <Select
                    clearable={true}
                    filterable={true}
                    id="stateOfOrigin"
                    customLabel="Select A State"
                    value={formData.stateOfOrigin || ""}
                    onChange={(value) =>
                      handleInputChange("stateOfOrigin", value)
                    }
                    options={
                      states
                        ? states
                            .filter((state) => state.id)
                            .map((state) => ({
                              id: state.id,
                              name: state.name,
                            }))
                        : []
                    }
                    required
                  />
                  {errors.stateOfOrigin && (
                    <p className="text-red-500 text-sm">
                      {errors.stateOfOrigin}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="text"
                    placeholder="Enter your date of birth"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                    required
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    type="text"
                    placeholder="Enter your nationality"
                    value={formData.nationality}
                    onChange={(e) =>
                      handleInputChange("nationality", e.target.value)
                    }
                    required
                  />
                  {errors.nationality && (
                    <p className="text-red-500 text-sm">{errors.nationality}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="religion">Religion</Label>
                  <Select
                    clearable={true}
                    id="religion"
                    customLabel="Select Religion"
                    value={formData.religion || ""}
                    onChange={(value) => handleInputChange("religion", value)}
                    options={
                      religions
                        ? religions
                            .filter((religion) => religion.id)
                            .map((religion) => ({
                              id: religion.id,
                              name: religion.name,
                            }))
                        : []
                    }
                    required
                  />
                  {errors.religion && (
                    <p className="text-red-500 text-sm">{errors.religion}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="ethnicGroup">Ethnic Group</Label>
                  <Input
                    id="ethnicGroup"
                    type="text"
                    placeholder="Enter your Ethnic Group"
                    value={formData.ethnicGroup}
                    onChange={(e) =>
                      handleInputChange("ethnicGroup", e.target.value)
                    }
                    required
                  />
                  {errors.ethnicGroup && (
                    <p className="text-red-500 text-sm">{errors.ethnicGroup}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    pattern="\d{11}"
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>
              </div>

              <FileUpload
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
                accept=".jpg,.png,.pdf,.xlsx,.docx"
                multiple={true}
              />
              {fileError && <p className="text-red-500 text-sm">{fileError}</p>}

              <button
                type="submit"
                className="w-full h-8 md:h-10 flex justify-center items-center bg-gray-800 text-white rounded-md shadow-md"
                disabled={isPending}
              >
                {isPending ? <SpinnerMini /> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormMRN;
