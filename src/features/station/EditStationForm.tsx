import { FormEvent, useState } from "react";
import ShowPasswordIcon from "../../ui/ShowPasswordIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import { useUpdateStation } from "./useUpdateStation";
import { StationTypes } from "../../interfaces";
import { useUpdateStationPassword } from "./useUpdateStationPassword";
import { departments, stations } from "./data/stationData";
import Input from "../../ui/Input";
import Label from "../../ui/Label";

interface EditStationFormProps {
  station: StationTypes;
  setIsEdit: (value: boolean) => void;
}

const EditStationForm: React.FC<EditStationFormProps> = ({
  station,
  setIsEdit,
}) => {
  const [formData, setFormData] = useState<Partial<StationTypes>>({
    name: station.name,
    email: station.email,
    userName: station.userName,
    station: station.station,
    department: station.department,
    drn: station.drn,
    fileNumber: station.drn,
    phone: station.phone,
  });

  const [formDataPassword, setFormDataPassword] = useState<
    Partial<StationTypes>
  >({
    password: "",
    passwordConfirm: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { updateStation, isPending } = useUpdateStation(station.id!);
  const { updateStationPassword, isPending: isUpdatingPassWord } =
    useUpdateStationPassword(station.id!);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleInputChangePassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormDataPassword((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await updateStation(formData);
      setIsEdit(false);
    } catch (err) {
      setError("Failed to update station information.");
    }
  };

  const handleSubmitPassword = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formDataPassword.password !== formDataPassword.passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await updateStationPassword(formDataPassword);
      setIsEdit(false);
    } catch (err) {
      setError("Failed to update password.");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="h-screen text-white overflow-y-scroll pb-16 px-2 md:px-4"
      style={{ fontFamily: "Roboto", letterSpacing: "0.8px" }}
    >
      <div className="py-10 flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col gap-4 w-full">
          <div className="mb-2 flex flex-col items-center gap-4">
            <h1 className="text-sm md:text-lg font-extrabold">
              ISLAMIC GUIDANCE ACADEMY STATION
            </h1>
            <p>Update Station</p>
          </div>

          {error && <div className="text-red-500 text-center">{error}</div>}

          <div className="w-full md:w-[400px] flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 bg-white bg-opacity-90 p-6 rounded-md shadow-xl backdrop-blur-lg md:mx-0"
            >
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
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="userName">Username</Label>
                  <Input
                    id="userName"
                    type="text"
                    placeholder="Enter your username"
                    value={formData.userName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="station">Station</Label>
                  <select
                    className="w-full h-6 md:h-8 px-3 rounded-md border placeholder:text-sm focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="station"
                    value={formData.station}
                    onChange={handleInputChange}
                  >
                    <option value="">
                      {" "}
                      <span className="text-sm">Select a station</span>
                    </option>
                    {stations.map((station) => (
                      <option key={station.id} value={station.id}>
                        {station.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="department">Department</Label>
                  <select
                    className="w-full h-6 md:h-8 px-3 rounded-md border placeholder:text-sm focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a department</option>
                    {departments.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="drn">DRN</Label>
                  <Input
                    id="drn"
                    type="text"
                    placeholder="Enter your DRN"
                    value={formData.drn}
                    onChange={handleInputChange}
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
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    pattern="\d{11}" // Enforces exactly 11 digits
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
            </form>
          </div>

          <div className="w-full md:w-[400px] flex items-center justify-center">
            <form
              onSubmit={handleSubmitPassword}
              className="w-full flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 bg-white bg-opacity-90 p-6 rounded-md shadow-xl backdrop-blur-lg md:mx-0"
            >
              <div className="flex flex-col w-full gap-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative w-full">
                    <input
                      className="w-full h-6 md:h-8 px-3 rounded-md border placeholder:text-sm focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formDataPassword.password}
                      onChange={handleInputChangePassword}
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
                  <Label htmlFor="passwordConfirm">Confirm Password</Label>
                  <div className="relative w-full">
                    <input
                      className="w-full h-6 md:h-8 px-3 rounded-md border placeholder:text-sm focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                      id="passwordConfirm"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formDataPassword.passwordConfirm}
                      onChange={handleInputChangePassword}
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
                disabled={isUpdatingPassWord}
              >
                {isUpdatingPassWord ? <SpinnerMini /> : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStationForm;
