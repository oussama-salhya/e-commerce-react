import { customFetch } from "../../utils";
import { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearValues, getAllCompanies } from "./companiesSlice";

export const getAllCompaniesThunk = async () => {
  const url = `/companies`;
  try {
    const { data } = await customFetch.get(url);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createCompanyThunk = async (_, thunkAPI) => {
  const { name, image } = thunkAPI.getState().companies;
  const url = `/companies`;
  try {
    await customFetch.post(url, { name, image });
    thunkAPI.dispatch(clearValues());
    thunkAPI.dispatch(getAllCompanies());
  } catch (error) {
    checkForUnauthorizedResponse(error, thunkAPI);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateCompanyThunk = async (_, thunkAPI) => {
  const { idCompany: id, name, image } = thunkAPI.getState().companies;
  const url = `/companies/${id}`;
  try {
    await customFetch.patch(url, { name, image });
    thunkAPI.dispatch(clearValues());
    thunkAPI.dispatch(getAllCompanies());
  } catch (error) {
    checkForUnauthorizedResponse(error, thunkAPI);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const deleteCompanyThunk = async (id, thunkAPI) => {
  const url = `/companies/${id}`;
  try {
    await customFetch.delete(url);
    thunkAPI.dispatch(clearValues());
    thunkAPI.dispatch(getAllCompanies());
  } catch (error) {
    checkForUnauthorizedResponse(error, thunkAPI);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getTotalOrdersByCompanyThunk = async (_, thunkAPI) => {
  const url = "/orders/get-total-orders-by-company";
  try {
    const { data } = await customFetch.get(url);
    return data;
  } catch (error) {
    checkForUnauthorizedResponse(error, thunkAPI);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getSingleCompanyThunk = async (name) => {
  const url = `/companies/${name}`;
  try {
    const { data } = await customFetch.get(url);
    return data;
  } catch (error) {
    console.log(error);
  }
};
