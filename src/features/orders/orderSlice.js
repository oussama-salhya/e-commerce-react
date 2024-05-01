import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createOrderThunk,
  createPaymentIntentThunk,
  getAllOrdersThunk,
  getCustomersThunk,
  getDashboardInfoThunk,
  getFilteredOrdersThunk,
  getSingleProductOrdersThunk,
  getStatsThunk,
  getTotalOrdersGroupByCategoriesThunk,
} from "./orderThunk";
import { errorMsg } from "../../utils/msgService";

const initialFilters = {
  page: 1,
  companies: [],
  categories: [],
  cities: [],
  month: "",
};

const initialState = {
  isLoading: false,
  clientSecret: "",
  orders: [],
  companiesOptions: [],
  categoriesOptions: [],
  citiesOptions: [],
  customers: [],
  dashboardInfo: {},
  singleProductOrders: [],
  ...initialFilters,
};

export const createPaymentIntent = createAsyncThunk(
  "create-payment-intent",
  createPaymentIntentThunk
);
export const createOrder = createAsyncThunk("create-order", createOrderThunk);
export const getAllOrders = createAsyncThunk(
  "get-all-orders",
  getAllOrdersThunk
);
export const getFilteredOrders = createAsyncThunk(
  "get-filtered-orders",
  getFilteredOrdersThunk
);
export const getTotalOrdersGroupByCategories = createAsyncThunk(
  "get-total-orders-by-categories",
  getTotalOrdersGroupByCategoriesThunk
);
export const getCustomers = createAsyncThunk(
  "get-customers",
  getCustomersThunk
);
export const getDashboardInfo = createAsyncThunk(
  "get-dashboard-info",
  getDashboardInfoThunk
);
export const getStats = createAsyncThunk("get-stats", getStatsThunk);
export const getSingleProductOrders = createAsyncThunk(
  "get-product-orders",
  getSingleProductOrdersThunk
);
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    toggleFilter: (state, { payload: { name, value } }) => {
      // in case the filter is a list
      if (Array.isArray(state[name])) {
        if (state[name].includes(value)) {
          // we will remove the filter because it exists
          state[name] = state[name].filter((item) => item !== value);
        } else {
          // we will then add filter
          state[name].push(value);
        }
      }
      // in case the filter is just an item
      else {
        return { ...state, [name]: value };
      }
    },
    clearFilters: (state) => {
      return { ...state, ...initialFilters };
    },
  },
  extraReducers: {
    [createPaymentIntent.pending]: (state) => {
      state.isLoading = true;
    },
    [createPaymentIntent.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.clientSecret = payload.clientSecret;
      state.paymentIntentId = payload.paymentIntentId;
    },
    [createPaymentIntent.rejected]: (state, { payload }) => {
      state.isLoading = false;
      errorMsg(payload);
    },
    [createOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [createOrder.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.clientSecret = "";
    },
    [createOrder.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
    [getAllOrders.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllOrders.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.orders = payload.orders;
      if (payload.categories && payload.companies && payload.cities) {
        state.categoriesOptions = payload.categories.map((category) => ({
          name: category,
          enabled: true,
        }));
        state.companiesOptions = payload.companies.map((company) => ({
          name: company,
          enabled: true,
        }));
        state.citiesOptions = payload.cities.map((city) => ({
          name: city,
          enabled: true,
        }));
      }
    },
    [getAllOrders.rejected]: (state, { payload }) => {
      state.isLoading = false;
      errorMsg(payload);
    },
    [getFilteredOrders.pending]: (state) => {
      state.isLoading = true;
    },
    [getFilteredOrders.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.orders = payload.orders;
    },
    [getFilteredOrders.rejected]: (state, { payload }) => {
      state.isLoading = false;
      errorMsg(payload);
    },
    [getTotalOrdersGroupByCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [getTotalOrdersGroupByCategories.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.orders = payload.orders;
    },
    [getTotalOrdersGroupByCategories.rejected]: (state, { payload }) => {
      state.isLoading = false;
      errorMsg(payload);
    },
    [getCustomers.pending]: (state) => {
      state.isLoading = true;
    },
    [getCustomers.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.customers = payload.customers;
    },
    [getCustomers.rejected]: (state, { payload }) => {
      state.isLoading = false;
      errorMsg(payload);
    },
    [getDashboardInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [getDashboardInfo.fulfilled]: (state, { payload }) => {
      state.dashboardInfo = { ...state.dashboardInfo, ...payload };
      state.isLoading = false;
    },
    [getDashboardInfo.rejected]: (state, { payload }) => {
      state.isLoading = false;
      errorMsg(payload);
    },
    [getStats.pending]: (state) => {
      state.isLoading = true;
    },
    [getStats.fulfilled]: (state, { payload }) => {
      state.dashboardInfo = { ...state.dashboardInfo, ...payload };
      state.isLoading = false;
    },
    [getStats.rejected]: (state, { payload }) => {
      state.isLoading = false;
      errorMsg(payload);
    },
    [getSingleProductOrders.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleProductOrders.fulfilled]: (state, { payload }) => {
      state.singleProductOrders = payload.orders;
      state.isLoading = false;
    },
    [getSingleProductOrders.rejected]: (state, { payload }) => {
      state.isLoading = false;
      errorMsg(payload);
    },
  },
});

export const { toggleFilter, clearFilters } = orderSlice.actions;

export default orderSlice.reducer;
