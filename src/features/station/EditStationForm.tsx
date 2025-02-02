import { FormEvent, useState } from "react";
import ShowPasswordIcon from "../../ui/ShowPasswordIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import { useUpdateStation } from "./useUpdateStation";
import { SignupTypes } from "../../interfaces";

const stations = [
  { id: "NGKW-1446-2401", name: "NGKW-1446-2401" },
  { id: "NGOY-1446-2401", name: "NGOY-1446-2401" },
];

interface EditStationFormProps {
  station: SignupTypes;
  setIsEdit: (value: boolean) => void;
}

const EditStationForm: React.FC<EditStationFormProps> = ({
  station,
  setIsEdit,
}) => {
  const [formData, setFormData] = useState<SignupTypes>({
    name: station.name,
    email: station.email,
    userName: station.userName,
    station: station.station,
    drn: station.drn,
    fileNumber: station.drn,
    phone: station.phone,
    password: "",
    passwordConfirm: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { updateStation, isPending } = useUpdateStation(station.id!);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log(formData, "Form Data");

    // const data = {
    //   data: formData,
    // };

    updateStation(formData);
    setIsEdit(false);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="h-screen  text-white  overflow-y-scroll pb-16 px-2 md:px-4"
      style={{ fontFamily: "Roboto", letterSpacing: "0.8px" }}
    >
      <div className="py-10 flex flex-col items-center justify-center gap-8">
        <div>
          <div className=" mb-4 flex flex-col items-center">
            <h1 className="text-sm md:text-lg  font-extrabold">
              ISLAMIC GUIDANCE ACADAMY STATION
            </h1>
            <p>Update Station</p>
          </div>

          <div className="w-full md:w-[400px] flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full bg-white bg-opacity-90 p-6 rounded-md shadow-xl backdrop-blur-lg mx-4 md:mx-0"
            >
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
                    htmlFor="email"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="userName"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="userName"
                    type="text"
                    placeholder="Enter your username"
                    value={formData.userName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="station"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    Station : {station.station}
                  </label>

                  <select
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="station"
                    value={formData.station}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a station</option>
                    {stations.map((station) => (
                      <option key={station.id} value={station.id}>
                        {station.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="drn"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    DRN
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="drn"
                    type="text"
                    placeholder="Enter your DRN"
                    value={formData.drn}
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
                    pattern="\d{11}" // Enforces exactly 11 digits
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative w-full">
                    <input
                      className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={handleShowPassword}
                    >
                      <ShowPasswordIcon showPassword={showPassword} />
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="passwordConfirm"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="relative w-full">
                    <input
                      className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                      id="passwordConfirm"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.passwordConfirm}
                      onChange={handleInputChange}
                      required
                    />
                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={handleShowPassword}
                    >
                      <ShowPasswordIcon showPassword={showPassword} />
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-8 md:h-10 flex justify-center items-center bg-gray-800 text-white rounded-md shadow-md"
                disabled={isPending}
              >
                {isPending ? <SpinnerMini /> : "Update"}
              </button>
            </form>
          </div>
        </div>
        {/* <p>
          Already have an account? login{" "}
          <span className="underline font-bold">
            <Link to={"/login"}>here</Link>
          </span>{" "}
        </p> */}
      </div>
    </div>
  );
};

export default EditStationForm;
