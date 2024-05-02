import { checkForUnauthorizedResponse } from "../../utils/axios";
import { customFetch } from "../../utils";
// import { clearValues } from "../job/jobSlice";
import { clearUserValues, logoutUser } from "./userSlice";
import { clearCart } from "../cart/cartSlice";
export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
export const clearStoreThunk = async (thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser());
    thunkAPI.dispatch(clearUserValues());
    thunkAPI.dispatch(clearCart());
    // thunkAPI.dispatch(clear ....()); !!!!!!!!!!!!!!!!!!!!!....
    // thunkAPI.dispatch(clearValues());
    // clear values is a reducer of a state
    return Promise.resolve();
  } catch (error) {
    log("error", error);
    return Promise.reject();
  }
};
export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, user);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const logoutUserThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.post(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const showMeUserThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.post(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

// const handleLogout = () => {
//   dispatch(clearCart());
//   dispatch(logoutUser());
//   navigate("/");
// };
