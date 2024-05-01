import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProductThunk,
  deleteProductThunk,
  editProductThunk,
  getSingleProductThunk,
  uploadImagesThunk,
} from "./productThunk";
import { errorMsg, successMsg } from "../../utils/msgService";
const singleProduct = {
  images: [],
  mainImgIndex: 0,
  name: "",
  description: "",
  price: 0,
  category: "",
  company: "",
  stock: 0,
  isLoading: false,
};
// export const updateUser = createAsyncThunk(
//   "user/updateUser",
//   async (user, thunkAPI) => {
//     return updateUserThunk("/auth/updateUser", user, thunkAPI);
//   }
// );
export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  getSingleProductThunk
);
export const createProduct = createAsyncThunk(
  "products/createProduct",
  createProductThunk
);
export const editProduct = createAsyncThunk(
  "products/editProduct",
  editProductThunk
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  deleteProductThunk
);
const ProductSlice = createSlice({
  name: "product",
  singleProduct,
  reducers: {
    clearSingleProductValues: (state) => {
      return { isEditing: false, singleProduct };
    },
    openActionsButton: (state, { payload: id }) => {
      state.actions.isOpen = true;
      state.actions.id = id;
    },
    appendImgtoSingleProductImages: (state, { payload: image }) => {
      const images = state.images;
      state.images = [...images, image];
    },
    deleteImgFromSingleProductImages: (state, { payload: id }) => {
      const images = state.images.filter((item, index) => index !== id);
      state.images = images;
    },
    changeSingleProductRating: (
      state,
      { payload: { numOfReviews, averageRating } }
    ) => {
      state.numOfReviews = numOfReviews;
      state.averageRating = averageRating;
    },
  },
  extraReducers: {
    [getSingleProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleProduct.fulfilled]: (state, { payload }) => {
      state = payload.product;
      state.isLoading = false;
    },
    [getSingleProduct.rejected]: (state, { payload }) => {
      errorMsg(payload.msg);
      state.isLoading = false;
    },
    [createProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [createProduct.fulfilled]: (state) => {
      state.isLoading = false;
      state.singleProduct = singleProduct;
      successMsg("product has been created successfully");
    },
    [createProduct.rejected]: (state, { payload }) => {
      errorMsg(payload.msg);
      state.isLoading = false;
    },
    [editProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [editProduct.fulfilled]: (state) => {
      successMsg("Product has been edited successfully");
      state.isLoading = false;
      state.singleProduct = singleProduct;
    },
    [editProduct.rejected]: (state, { payload }) => {
      errorMsg(payload.msg);
      state.isLoading = false;
    },
    [deleteProduct.fulfilled]: (state) => {
      successMsg("Product has been deleted successfully");
    },
    [deleteProduct.rejected]: (state, { payload }) => {
      errorMsg(payload.msg);
    },
  },
});

export const {
  changeSingleProductRating,
  clearSingleProductValues,
  appendImgtoSingleProductImages,
  changeSingleProductValues,
  deleteImgFromSingleProductImages,
} = ProductSlice.actions;

export default ProductSlice.reducer;
