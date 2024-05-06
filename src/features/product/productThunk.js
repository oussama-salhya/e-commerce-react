import { checkForUnauthorizedResponse } from "../../utils/axios";
import { customFetch } from "../../utils";
import {
  clearFilters,
  // clearSingleProductValues,
  // getAllProducts,
  // getFilteredProducts,
  // setProgressPercentage,
  // setupFilters,
} from "../allProduct/allProductSlice";
import { useSelector } from "react-redux";

export const getSingleProductThunk = async (id, thunkAPI) => {
  const url = `/products/${id}`;
  const { isEditing } = thunkAPI.getState().products;
  try {
    const { data } = await customFetch.get(url);
    if (isEditing) {
      data.product.category = data.product.category._id;
      data.product.mainImgIndex = 0;
    }
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const createProductThunk = async (_, thunkAPI) => {
  const url = `/products/`;
  const state = thunkAPI.getState();
  const product = state.productState;
  // const { categories } = state.categoriesState;
  // const { companies } = state.companiesState;
  // if (!product.category) {
  //   console.log("categories", categories[0].name);
  //   product.category = categories[0].name;
  // }
  // if (!product.company) {
  //   product.company = companies[0].name;
  // }
  console.log(product);
  const mainImage = product.images[product.mainImgIndex];
  product.images = product.images.filter((item, index) => {
    if (index !== product.mainImgIndex) {
      return item;
    }
  });
  product.mainImage = mainImage;
  try {
    await customFetch.post(url, product);
    thunkAPI.dispatch(getAllProducts());
    return;
  } catch (error) {
    console.log(error);
    checkForUnauthorizedResponse(error, thunkAPI);
    return thunkAPI.rejectWithValue(error.response.data?.message);
  }
};
export const editProductThunk = async (_, thunkAPI) => {
  const { singleProduct } = thunkAPI.getState().products;
  const product = { ...singleProduct };
  const url = `/products/${product._id}`;
  product._id = undefined;
  product.id = undefined;
  product.mainImage = product.images[product.mainImgIndex];
  try {
    await customFetch.patch(url, product);
    thunkAPI.dispatch(getFilteredProducts());
  } catch (error) {
    checkForUnauthorizedResponse(error, thunkAPI);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const deleteProductThunk = async (id, thunkAPI) => {
  const url = `/products/${id}`;

  try {
    await customFetch.delete(url);
    thunkAPI.dispatch(getFilteredProducts());
  } catch (error) {
    checkForUnauthorizedResponse(error, thunkAPI);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
