import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import SpinnerMini from "../../ui/SpinnerMini";
import { FormTypes } from "../../interfaces";
import { useVerification } from "./useVerifacation";
import toast from "react-hot-toast/headless";
import { useLogout } from "./useLogout";
import { BiLogOut } from "react-icons/bi";

const VerificationForm: React.FC = () => {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormTypes>({
    name: "",
    mrn: "",
    fileNumber: "",
    dateOfBirth: "",
    phone: "",
    ethnicGroup: "",
    stateOforigin: "",
    residentialAddress: "",
    occupation: "",
    familyHouseName: "",
    fhrn: "",
    nin: "",
    bvn: "",
  });

  useEffect(() => {
    setFileInputState("");
  }, []);

  const { verify, isPending } = useVerification();

  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { id, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [id]: value.trim() }));
  // };

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

    verify(data);

    setPreviewSource(null);
  };

  const { logout, isPending: isLoggingOut } = useLogout();

  const handleLogout = async () => {
    logout();
  };

  return (
    <div className=" flex flex-col h-screen text-white  overflow-y-scroll md:px-4 pt-8 pb-16">
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
        <div className=" mb-4 flex flex-col items-center">
          <h1 className="text-sm md:text-lg  font-extrabold">
            ISLAMIC GUIDANCE ACADAMY STATION
          </h1>
          <p>Verification</p>
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
                className="flex items-center justify-center text-xs border border-solid border-white bg-slate-800 rounded-sm cursor-pointer w-24 sm:w-24 p-2"
              >
                Upload Photo
              </label>
            </div>
            <div className=" flex flex-col  items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10  bg-white bg-opacity-90 p-6 rounded-md shadow-xl backdrop-blur-lg mx-4 md:mx-0">
              <div className="flex flex-col w-full gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="mrn"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    MRN
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="mrn"
                    type="text"
                    placeholder="Enter your MRN"
                    value={formData.mrn}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="fileNumber"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    File Number
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="fileNumber"
                    type="text"
                    placeholder="Enter your file number"
                    value={formData.fileNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    Date Of Birth
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="dateOfBirth"
                    type="text"
                    placeholder="Enter your date of birth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="ethnicGroup"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    Ethnic Group
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="ethnicGroup"
                    type="text"
                    placeholder="Enter ethnic group"
                    value={formData.ethnicGroup}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="stateOforigin"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    State Of Origin
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="stateOforigin"
                    type="text"
                    placeholder="Enter your state of origin"
                    value={formData.stateOforigin}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="residentialAddress"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    Residential Address
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="residentialAddress"
                    type="text"
                    placeholder="Enter your residential address"
                    value={formData.residentialAddress}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="occupation"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    Occupation
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="occupation"
                    type="text"
                    placeholder="Enter your occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="familyHouseName"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    Family House Name
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="familyHouseName"
                    type="text"
                    placeholder="Enter your family house name"
                    value={formData.familyHouseName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="fhrn"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    FHRN
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="fhrn"
                    type="text"
                    placeholder="Enter your FHRN"
                    value={formData.fhrn}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="nin"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    National Identification Number
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="nin"
                    type="number"
                    placeholder="National identification number"
                    value={formData.nin}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="bvn"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    Bank Verification Number
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="bvn"
                    type="number"
                    placeholder="Bank verification number"
                    value={formData.bvn}
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

export default VerificationForm;
