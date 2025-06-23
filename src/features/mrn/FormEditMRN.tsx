import { FormEvent, useEffect, useState } from "react";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import { MRNType } from "../../interfaces";
// import { useLogout } from "../authenticaton/useLogout";
// import { BiLogOut } from "react-icons/bi";
import SpinnerMini from "../../ui/SpinnerMini";
import { religions, states } from "../station/data/stationData";
import Select from "../../ui/Select";
import { FileUpload } from "../../ui/FileUpload";
import { useUpdateFile } from "./useUpdateFile";

const FormEditMRN = ({
  file,
  setIsEdit,
}: {
  file: MRNType;
  setIsEdit: (value: boolean) => void;
}) => {
  const [formData, setFormData] = useState<Partial<MRNType>>({
    firstName: file.firstName,
    middleName: file.middleName,
    lastName: file.lastName,
    stateOfOrigin: file.stateOfOrigin,
    dateOfBirth: file.dateOfBirth,
    religion: file.religion,
    nationality: file.nationality,
    ethnicGroup: file.ethnicGroup,
    phone: file.phone,
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const { update, isPending } = useUpdateFile(file?.id!); // Hook for creating file

  // Generate file number when state of origin changes
  useEffect(() => {
    if (formData.stateOfOrigin && formData.stateOfOrigin.length >= 3) {
      const statePrefix = formData.stateOfOrigin.substring(0, 3).toUpperCase();

      setFormData((prev) => ({ ...prev, fileNumber: `${statePrefix}01` }));
    }
  }, [formData.stateOfOrigin]);

  // Generate MRN when religion changes
  useEffect(() => {
    if (formData.religion) {
      const currentYear = new Date().getFullYear();
      const yearPart = (currentYear - 578).toString(); // 2023 - 578 = 1445 (Islamic calendar)

      // Get religion code (assuming religions have M0, M1, M2 in their ids)
      const religionObj = religions.find((r) => r.id === formData.religion);
      const religionCode = religionObj?.id || "M0";

      setFormData((prev) => ({
        ...prev,
        mrn: `m263-${yearPart}-2501${religionCode}`,
      }));
    }
  }, [formData.religion]);

  const handleInputChange = (
    field: keyof MRNType,
    value: string | string[] | number
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // console.log(formData);

    update({ data: formData, files: selectedFiles });
    setIsEdit(false);
  };

  // const { logout, isPending: isLoggingOut } = useLogout();

  // const handleLogout = async () => {
  //   logout();
  // };

  return (
    <div
      className=" flex flex-col h-screen text-white  overflow-y-scroll md:px-2 pt-8 pb-16"
      style={{ fontFamily: "Roboto", letterSpacing: "0.8px" }}
    >
      {/* <div className="ml-2 md:ml-0">
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
      </div> */}

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
                </div>
              </div>

              <FileUpload
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
                accept=".jpg,.png,.pdf,.xlsx,.docx"
                multiple={true}
              />

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

export default FormEditMRN;
