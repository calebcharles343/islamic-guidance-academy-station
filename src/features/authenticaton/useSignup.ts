import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import { signup as signupApi } from "../../services/apiAuth.ts";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-hot-toast";
import { StationTypes } from "../../interfaces.ts";

interface ErrorResponse {
  message: string;
}

interface UseSignupType {
  data: StationTypes;
}

interface LoginError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useSignup() {
  // const navigate = useNavigate();

  const {
    mutate: signup,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({ data }: UseSignupType) => signupApi(data),

    onSuccess: (data) => {
      if (data.status === 201) {
        // const userData = data.data.user;

        toast.success("Sign up successful");
        // Navigate to home page after successful login
        // navigate("/login", { replace: true });
      } else {
        toast.error(`${data.message}`);

        console.error("Signup Error:", data.message);
      }
    },

    onError: (err: LoginError) => {
      toast.error(`${err.response?.data.message}` || "An error occurred");

      const error = err.response?.data.message;
      console.error("Signup Error:", error);
    },
  });

  return { signup, isPending, isError };
}
