import axios from "axios";
import { clearStore } from "../features/user/userSlice";
import { getUserFromLocalStorage } from "./localStorage";

// customFetch.interceptors.request.use((config) => {
//   const user = getUserFromLocalStorage();
//   if (user) {
//     config.headers["Authorization"] = `Bearer ${user.token}`;
//   }
//   return config;
// });

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};
// export const checkForUnauthenticatedError = async (error, thunkAPI) => {
//   const user = getUserFromLocalStorage();
//   if (error.response.status === 401) {
//     thunkAPI.dispatch(removeUser());
//     if (user?.role === "admin") {
//       thunkAPI.dispatch(displayError());
//       thunkAPI.dispatch(displayMsg("Unauthorized!!! logging Out"));
//     }
//   }
// };
