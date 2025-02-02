import { FormEvent, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ShowPasswordIcon from "../../ui/ShowPasswordIcon";
import SpinnerMini from "../../ui/SpinnerMini";

import CryptoJS from "crypto-js";

const generateSessionToken = (): string => {
  const randomData = `${Date.now()}-${Math.random()}-${navigator.userAgent}`;
  return CryptoJS.SHA256(randomData).toString();
};

const HARDCODED_PASSWORD = "admin123";

const AdminLoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ password: "" });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value.trim() }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (formData.password === HARDCODED_PASSWORD) {
        const sessionToken = generateSessionToken();
        Cookies.set("admin-jwt", sessionToken, { expires: 1 }); // Expires in 1 day

        navigate("/admin-home", { replace: true });
      } else {
        alert("Invalid password");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="h-screen flex flex-col items-center justify-center bg-blue-500  text-white pt-16"
      style={{ fontFamily: "Roboto", letterSpacing: "0.8px" }}
    >
      <div className=" mb-2 flex flex-col items-center gap-4">
        <h1 className="text-sm md:text-lg font-extrabold">
          ISLAMIC GUIDANCE ACADAMY STATION
        </h1>
        <p>Admin Login</p>
      </div>
      <div className="w-full md:w-[400px] flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full max-w-md bg-white bg-opacity-90 p-6 rounded-md shadow-xl backdrop-blur-lg  mx-4 md:mx-0"
        >
          <div className="flex flex-col w-full gap-4">
            {/* <div>
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
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div> */}

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
                  autoComplete="current-password"
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
          </div>

          <button
            type="submit"
            className="w-full h-8 md:h-10 flex justify-center items-center bg-gray-800 text-white rounded-md shadow-md"
            disabled={isLoading}
          >
            {isLoading ? <SpinnerMini /> : "Login"}
          </button>
        </form>
      </div>
      {/* <p>
        Need and account? signup{" "}
        <span className="underline font-bold">
          <Link to={"/signup"}>here</Link>
        </span>{" "}
      </p> */}

      {/* <SignupForm /> */}
    </div>
  );
};

export default AdminLoginForm;
