import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProductThunk,
  deleteProductThunk,
  editProductThunk,
  getSingleProductThunk,
  // uploadImagesThunk,
} from "./productThunk";
import { errorMsg, successMsg } from "../../utils/msgService";
const initialState = {
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
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      // in case the field is an array
      if (Array.isArray(state[name])) {
        state[name] = [value];
      } else {
        state[name] = value;
      }
    },
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
  extraReducers: (builder) => {
    builder
      .addCase(getSingleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, { payload }) => {
        state.product = payload.product;
        state.isLoading = false;
      })
      .addCase(getSingleProduct.rejected, (state, { payload }) => {
        errorMsg(payload.msg);
        state.isLoading = false;
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.singleProduct = payload.product;
        successMsg("product has been created successfully");
      })
      .addCase(createProduct.rejected, (state, { payload }) => {
        console.log(payload);
        errorMsg(payload);
        state.isLoading = false;
      })
      .addCase(editProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProduct.fulfilled, (state, { payload }) => {
        successMsg("Product has been edited successfully");
        state.isLoading = false;
        state.singleProduct = payload.product;
      })
      .addCase(editProduct.rejected, (state, { payload }) => {
        errorMsg(payload.msg);
        state.isLoading = false;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        successMsg("Product has been deleted successfully");
      })
      .addCase(deleteProduct.rejected, (state, { payload }) => {
        errorMsg(payload.msg);
      });
  },
});

export const {
  changeSingleProductRating,
  clearSingleProductValues,
  appendImgtoSingleProductImages,
  changeSingleProductValues,
  deleteImgFromSingleProductImages,
  handleChange,
} = ProductSlice.actions;

export default ProductSlice.reducer;
