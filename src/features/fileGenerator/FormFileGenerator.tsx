import { FormEvent, useState } from "react";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import { FileGenerator, Verification } from "../../interfaces";
import { useLogout } from "../authenticaton/useLogout";
import { BiLogOut } from "react-icons/bi";
import SpinnerMini from "../../ui/SpinnerMini";

const FormFileGenerator = () => {
  const [formData, setFormData] = useState<Partial<FileGenerator>>({
    firstName: "",
    middleName: "",
    lastName: "",
    stateOfOrigin: "",
    community: "",
    mrn: "",
    fileNumber: "",
    nationality: "",
    ethnicGroup: "",
    phone: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // if (previewSource === null) {
    //   toast.error("Please provide your photo");
    //   return;
    // }

    const data = {
      form: formData,
    };

    // verify(data as any);
  };

  const { logout, isPending: isLoggingOut } = useLogout();

  const handleLogout = async () => {
    logout();
  };

  const isPending = false;

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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Enter your middle name"
                    value={formData.lastName}
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
                  <Label htmlFor="community">Community</Label>
                  <Input
                    id="community"
                    type="text"
                    placeholder="Enter your community"
                    value={formData.community}
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
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    type="text"
                    placeholder="Enter your nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="community">Community</Label>
                  <Input
                    id="community"
                    type="text"
                    placeholder="Enter your community"
                    value={formData.community}
                    onChange={handleInputChange}
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
              </div>

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

export default FormFileGenerator;
