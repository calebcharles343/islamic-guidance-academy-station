import { useMutation } from "@tanstack/react-query";
import { verification as verificationApi } from "../../services/apiVerificattion.ts";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-hot-toast";

interface ErrorResponse {
  message: string;
}

interface LoginError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useVerification() {
  const {
    mutate: verify,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (data) => verificationApi(data),

    onSuccess: (data) => {
      console.log(data);

      if (data.status === 201) {
        toast.success("Verification successful");
      } else {
        if (data.message === "Missing required parameter - file") {
          toast.error(`Please provide photo`);
        } else {
          toast.error(`${data.message}`);
        }

        console.error("Verification Error:", data.message);
      }
    },

    onError: (err: LoginError) => {
      if (err.response?.data.message === "Missing required parameter - file") {
        toast.error(`Please provide photo`);
      } else {
        toast.error(`${err.response?.data.message}` || "An error occurred");
      }

      const error = err.response?.data.message;
      console.error("Verification Error:", error);
    },
  });

  return { verify, isPending, isError };
}
