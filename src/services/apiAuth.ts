import axios from "axios";

import { SignupTypes } from "../interfaces.ts";

const apiURL =
  "https://islamic-guidance-academy-station.onrender.com/api/v1/islamic-guidance-academy";

export const login = async function (email: string, password: string) {
  try {
    const response = await axios.post<Partial<SignupTypes>>(
      `${apiURL}/stations/login`,
      {
        email,
        password,
      }
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

export const signup = async function (data: SignupTypes) {
  console.log(data, "API❌❌❌");

  try {
    const response = await axios.post<SignupTypes>(
      `${apiURL}/stations/signup`,
      data
    );
    console.log(response.data);

    return response.data;
  } catch (err) {
    // ErrorHandler(err);
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    } else {
      // Handle other errors
      console.log(err);
    }
  }
};

export const logout = async function () {
  try {
    const response = await axios.post(`${apiURL}/stations/logout`);
    // console.log(response.data);
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// export const getUser = async function () {
//   try {
//     const response = await axios.get<UserProfileToken>(`${apiURL}/users/user`, {
//       headers,
//     });

//     return response.data.data;
//   } catch (err) {
//     // ErrorHandler(err);
//     if (axios.isAxiosError(err)) {
//       return err.response?.data;
//     } else {
//       // Handle other errors
//       console.log(err);
//     }
//   }
// };

// export const updateUser = async function (
//   UserId: number | undefined,
//   data: UpdateUserType
// ) {
//   console.log("❌updateUser", data);

//   try {
//     const response = await axios.patch<UpdateUserType>(
//       `${apiURL}/users/${UserId}`,
//       data,
//       { headers }
//     );
//     console.log(response.data);

//     return response.data;
//   } catch (err) {
//     // ErrorHandler(err);
//     if (axios.isAxiosError(err)) {
//       return err.response?.data;
//     } else {
//       // Handle other errors
//       console.log(err);
//     }
//   }
// };
