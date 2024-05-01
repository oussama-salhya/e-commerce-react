import customFetch, { checkForUnauthenticatedError } from "../../utils/axios";
import { clearValues, getAllCategories } from "./categoriesSlice";

export const getAllCategoriesThunk = async () => {
  const url = `/categories`;
  try {
    const { data } = await customFetch.get(url);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createCategoryThunk = async (_, thunkAPI) => {
  const { name, image } = thunkAPI.getState().categories;
  const url = `/categories`;
  try {
    await customFetch.post(url, { name, image });
    thunkAPI.dispatch(clearValues());
    thunkAPI.dispatch(getAllCategories());
  } catch (error) {
    checkForUnauthenticatedError(error, thunkAPI);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateCategoryThunk = async (_, thunkAPI) => {
  const { idCategory: id, name, image } = thunkAPI.getState().categories;
  const url = `/categories/${id}`;
  try {
    await customFetch.patch(url, { name, image });
    thunkAPI.dispatch(clearValues());
    thunkAPI.dispatch(getAllCategories());
  } catch (error) {
    checkForUnauthenticatedError(error, thunkAPI);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const deleteCategoryThunk = async (id, thunkAPI) => {
  const url = `/categories/${id}`;
  try {
    await customFetch.delete(url);
    thunkAPI.dispatch(clearValues());
    thunkAPI.dispatch(getAllCategories());
  } catch (error) {
    checkForUnauthenticatedError(error, thunkAPI);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getTotalOrdersByCategoryThunk = async (_, thunkAPI) => {
  const url = "/orders/get-total-orders-by-category";
  try {
    const { data } = await customFetch.get(url);
    return data;
  } catch (error) {
    checkForUnauthenticatedError(error, thunkAPI);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const getSingleCategoryThunk = async (name) => {
  const url = `/categories/${name}`;
  try {
    const { data } = await customFetch.get(url);
    return data;
  } catch (error) {
    console.log(error);
  }
};
