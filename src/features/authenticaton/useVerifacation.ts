import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import { verification as verificationApi } from "../../services/apiVerificattion.ts";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-hot-toast";
import { FormTypes } from "../../interfaces.ts";

interface ErrorResponse {
  message: string; // Assuming the error response has a 'message' field
  // Add any other properties that might be in the error response
}

interface UseVerification {
  form: FormTypes;
  photo: string | null;
}

interface LoginError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useVerification() {
  // const navigate = useNavigate();

  const {
    mutate: verify,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (data: UseVerification) => verificationApi(data),

    onSuccess: (data) => {
      if (data.status === 201) {
        // const userData = data.data.user;

        console.log(data.data, "❌❌❌");

        toast.success("Verification successfull");
        // Navigate to home page after successful login
        // navigate("/login", { replace: true });
      } else {
        toast.error(`${data.message}`);

        console.error("Verification Error:", data.message);
      }
    },

    onError: (err: LoginError) => {
      toast.error(`${err.response?.data.message}` || "An error occurred");

      const error = err.response?.data.message;
      console.error("Verification Error:", error);
    },
  });

  return { verify, isPending, isError };
}
