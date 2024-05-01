import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllCategoriesThunk,
  createCategoryThunk,
  updateCategoryThunk,
  deleteCategoryThunk,
  getTotalOrdersByCategoryThunk,
  getSingleCategoryThunk,
} from "./categoriesThunk";
import { errorMsg, successMsg } from "../../utils/msgService";

const initialState = {
  categories: [],
  isLoading: false,
  isEditing: false,
  name: "",
  idCategory: "",
  image: "",
  imagePath: "",
  ordersByCategories: [],
};

export const getAllCategories = createAsyncThunk(
  "/categories/getAllCategories",
  getAllCategoriesThunk
);
export const createCategory = createAsyncThunk(
  "/categories/createCategory",
  createCategoryThunk
);
export const updateCategory = createAsyncThunk(
  "/categories/updateCategory",
  updateCategoryThunk
);
export const deleteCategory = createAsyncThunk(
  "/categories/deleteCategory",
  deleteCategoryThunk
);
export const getTotalOrdersByCategory = createAsyncThunk(
  "/categories/getTotalOrdersByCategory",
  getTotalOrdersByCategoryThunk
);
export const getSingleCategory = createAsyncThunk(
  "/categories/get-single-category",
  getSingleCategoryThunk
);
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    triggerUpdateCategory: (state, { payload: id }) => {
      const { name, image } = state.categories.find(
        (category) => category._id === id
      );
      state.isEditing = true;
      state.idCategory = id;
      state.name = name;
      state.imagePath = image;
      state.image = image;
    },
    clearValues: (state) => {
      return {
        ...initialState,
        ordersByCategories: state.ordersByCategories,
        categories: state.categories,
        msg: state.msg,
        showError: state.showError,
      };
    },
  },
  extraReducers: {
    [getAllCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllCategories.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.categories = payload.categories;
    },
    [getAllCategories.rejected]: (state, { payload }) => {
      state.isLoading = false;
      errorMsg(payload.msg);
    },
    [getSingleCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleCategory.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.image = payload.category.image;
      state.name = payload.category.name;
    },
    [getSingleCategory.rejected]: (state, { payload }) => {
      state.isLoading = false;
      errorMsg(payload.msg);
    },
    [createCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [createCategory.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      successMsg("Category created successfully");
    },
    [createCategory.rejected]: (state, { payload }) => {
      state.isLoading = false;
      errorMsg(payload.msg);
    },
    [deleteCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteCategory.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      successMsg("Category removed successfully");
    },
    [deleteCategory.rejected]: (state, { payload }) => {
      state.isLoading = false;
      errorMsg(payload.msg);
    },
    [updateCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [updateCategory.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      successMsg("Category updated successfully");
    },
    [updateCategory.rejected]: (state, { payload }) => {
      state.msg = payload;
      state.isLoading = false;
      errorMsg(payload.msg);
    },
    [getTotalOrdersByCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [getTotalOrdersByCategory.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.ordersByCategories = payload.stats;
    },
    [getTotalOrdersByCategory.rejected]: (state, { payload }) => {
      state.isLoading = false;
      errorMsg(payload.msg);
    },
  },
});

export const {
  handleChange,
  triggerUpdateCategory,
  clearValues,
  displayError,
  hideError,
  hideMsg,
  clearMsgContent,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
