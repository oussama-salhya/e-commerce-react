import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllCompaniesThunk,
  createCompanyThunk,
  updateCompanyThunk,
  deleteCompanyThunk,
  getTotalOrdersByCompanyThunk,
  getSingleCompanyThunk,
} from "./companiesThunk";
import { errorMsg, successMsg } from "../../utils/msgService";

const initialState = {
  companies: [],
  isLoading: false,
  isEditing: false,
  name: "",
  idCompany: "",
  image: "",
  imagePath: "",
  ordersByCompanies: [],
};

export const getAllCompanies = createAsyncThunk(
  "/companies/getAllCompanies",
  getAllCompaniesThunk
);
export const createCompany = createAsyncThunk(
  "/companies/createCompany",
  createCompanyThunk
);
export const updateCompany = createAsyncThunk(
  "/companies/updateCompany",
  updateCompanyThunk
);
export const deleteCompany = createAsyncThunk(
  "/companies/deleteCompany",
  deleteCompanyThunk
);
export const getTotalOrdersByCompany = createAsyncThunk(
  "/companies/getTotalOrdersByCompany",
  getTotalOrdersByCompanyThunk
);
export const getSingleCompany = createAsyncThunk(
  "/companies/get-single-company",
  getSingleCompanyThunk
);
const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    triggerUpdateCompany: (state, { payload: id }) => {
      const { name, image } = state.companies.find(
        (company) => company._id === id
      );
      state.isEditing = true;
      state.idCompany = id;
      state.name = name;
      state.imagePath = image;
      state.image = image;
    },
    clearValues: (state) => {
      return {
        ...initialState,
        ordersByCompanies: state.ordersByCompanies,
        companies: state.companies,
        msg: state.msg,
        showError: state.showError,
      };
    },
  },
  extraReducers: {
    [getAllCompanies.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllCompanies.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.companies = payload;
    },
    [getAllCompanies.rejected]: (state, { payload }) => {
      state.isLoading = false;
      errorMsg(payload.msg);
    },
    [getSingleCompany.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleCompany.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.image = payload.company.image;
      state.name = payload.company.name;
    },
    [getSingleCompany.rejected]: (state, { payload }) => {
      state.isLoading = false;
      errorMsg(payload.msg);
    },
    [createCompany.pending]: (state) => {
      state.isLoading = true;
    },
    [createCompany.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      successMsg("Company created successfully");
    },
    [createCompany.rejected]: (state, { payload }) => {
      state.isLoading = false;
      errorMsg(payload.msg);
    },
    [deleteCompany.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteCompany.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      successMsg("Company removed successfully");
    },
    [deleteCompany.rejected]: (state, { payload }) => {
      state.isLoading = false;
      errorMsg(payload.msg);
    },
    [updateCompany.pending]: (state) => {
      state.isLoading = true;
    },
    [updateCompany.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      successMsg("Company updated successfully");
    },
    [updateCompany.rejected]: (state, { payload }) => {
      state.isLoading = false;
      errorMsg(payload.msg);
    },
    [getTotalOrdersByCompany.pending]: (state) => {
      state.isLoading = true;
    },
    [getTotalOrdersByCompany.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.ordersByCompanies = payload.stats;
    },
    [getTotalOrdersByCompany.rejected]: (state, { payload }) => {
      state.isLoading = false;
      errorMsg(payload.msg);
    },
  },
});

export const {
  handleChange,
  triggerUpdateCompany,
  clearValues,
  displayError,
  hideError,
  hideMsg,
  clearMsgContent,
} = companiesSlice.actions;
export default companiesSlice.reducer;
