import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createReviewThunk,
  deleteReviewThunk,
  getAllReviewsThunk,
  getSingleProductReviewsThunk,
  updateReviewThunk,
} from "./reviewsThunk";
import { errorMsg } from "../../utils/msgService";

const initialState = {
  reviews: [],
  singleProductId: localStorage.getItem("singleProductId")
    ? JSON.parse(localStorage.getItem("singleProductId"))
    : "",
  isLoading: false,
  numOfReviews: 0,
  reviewsGroupedByRating: [],
  averageRating: 0,
  comment: "",
  rating: 0,
  isEditing: false,
  idReview: "",
};
export const getAllReviews = createAsyncThunk(
  "reviews/getAllReviews",
  getAllReviewsThunk
);
export const getSingleProductReviews = createAsyncThunk(
  "/reviews/getSingleProductReviews",
  getSingleProductReviewsThunk
);
export const deleteReview = createAsyncThunk(
  "/reviews/deleteReview",
  deleteReviewThunk
);
export const updateReview = createAsyncThunk(
  "/reviews/updateReview",
  updateReviewThunk
);
export const createReview = createAsyncThunk(
  "/reviews/createReview",
  createReviewThunk
);
const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setSingleProductId: (state, { payload: id }) => {
      state.singleProductId = id;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    triggerUpdateReview: (state, { payload: reviewId }) => {
      const review = state.reviews.find((review) => review._id === reviewId);
      state.comment = review.comment;
      state.rating = review.rating;
      state.isEditing = true;
      state.idReview = reviewId;
    },
    cleanReviewForm: (state) => {
      state.comment = "";
      state.isEditing = false;
      state.rating = 0;
      state.idReview = "";
    },
  },
  extraReducers: {
    [getAllReviews.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllReviews.fulfilled]: (state, { payload }) => {
      state.reviews = payload.reviews;
      state.numOfReviews = payload.numOfReviews;
      state.reviewsGroupedByRating = payload.reviewsGrouped;
      state.averageRating = payload.averageRating;
      state.isLoading = false;
    },
    [getAllReviews.rejected]: (state, { payload }) => {
      state.isLoading = false;
      errorMsg(payload.msg);
    },
    [getSingleProductReviews.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleProductReviews.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.reviews = payload.reviews;
      state.numOfReviews = payload.numOfReviews;
      state.reviewsGroupedByRating = payload.reviewsGrouped;
      state.averageRating = payload.averageRating;
    },
    [getSingleProductReviews.rejected]: (state, { payload }) => {
      state.isLoading = false;
      errorMsg(payload.msg);
    },
    [createReview.pending]: (state) => {
      state.isLoading = true;
    },
    [createReview.fulfilled]: (state, { payload: review }) => {
      state.isLoading = false;
      state.comment = "";
      state.rating = 0;
      state.reviews.unshift(review);
      state.numOfReviews = state.numOfReviews + 1;
    },
    [createReview.rejected]: (state, { payload }) => {
      state.isLoading = false;
      errorMsg(payload.msg);
    },
    [deleteReview.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteReview.fulfilled]: (state, { payload: numOfReviews, id }) => {
      state.isLoading = false;
      state.numOfReviews = numOfReviews;
      state.reviews = state.reviews.filter(
        (review) => review.id !== state.idReview
      );
    },
    [deleteReview.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.msg = payload;
      errorMsg(payload.msg);
    },
    [updateReview.pending]: (state) => {
      state.isLoading = true;
    },
    [updateReview.fulfilled]: (state, { payload: review }) => {
      state.isLoading = false;
      state.comment = "";
      state.rating = 0;
      state.isEditing = false;
      state.idReview = "";
      state.reviews = state.reviews.map((r) =>
        r.id === review.id ? review : r
      );
    },
    [updateReview.rejected]: (state, { payload }) => {
      state.isLoading = false;
      errorMsg(payload.msg);
    },
  },
});

export const {
  setSingleProductId,
  handleChange,
  triggerUpdateReview,
  cleanReviewForm,
  displayError,
  hideError,
} = reviewsSlice.actions;
export default reviewsSlice.reducer;
