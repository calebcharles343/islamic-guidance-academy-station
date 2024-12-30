import axios from "axios";

import { VerificationTypes } from "../interfaces";

const apiURL =
  "https://islamic-guidance-academy-station.onrender.com/api/v1/islamic-guidance-academy";

export const verification = async function (data: VerificationTypes) {
  try {
    const response = await axios.post<VerificationTypes>(
      `${apiURL}/verifications`,
      data
    );
    console.log(response.data);

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    } else {
      console.log(err);
    }
  }
};
