import axios from "axios";

import { StationTypes } from "../interfaces.ts";
import { baseUrl } from "./baseUrl.ts";

const apiURL = baseUrl();

export const login = async function (email: string, password: string) {
  try {
    const response = await axios.post<Partial<StationTypes>>(
      `${apiURL}/stations/login`,
      {
        email,
        password,
      }
    );

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    } else {
      console.log(err);
    }
  }
};

export const signup = async function (data: StationTypes) {
  try {
    const response = await axios.post<StationTypes>(
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

export const getStation = async function (id: string) {
  try {
    const response = await axios.get(`${apiURL}/stations/${id}`);

    console.log(response);

    return response.data.data;
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

export const getStations = async function () {
  try {
    const response = await axios.get(`${apiURL}/stations`);

    console.log(response);

    return response.data.data;
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

export const deleteStation = async function (id: string) {
  try {
    const response = await axios.delete(`${apiURL}/stations/delete/${id}`);
    return response.data.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message || "Failed to delete station");
    } else {
      throw new Error("Network error. Server may be down.");
    }
  }
};

export const updateStation = async function (
  id: string,
  data: Partial<StationTypes>
) {
  try {
    const response = await axios.patch<StationTypes>(
      `${apiURL}/stations/update/${id}`,
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

export const updateStationPassword = async function (
  id: string,
  data: Partial<StationTypes>
) {
  try {
    const response = await axios.patch<StationTypes>(
      `${apiURL}/stations/updateStationPassword/${id}`,
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
