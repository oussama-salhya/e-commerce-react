import customFetch from "../../utils/axios";
import { changeSingleProductRating } from "../product/productSlice";
import { getSingleProductReviews } from "./reviewsSlice";

export const getAllReviewsThunk = async (_, thunkAPI) => {
  const url = `/reviews`;
  try {
    const { data } = await customFetch.get(url);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getSingleProductReviewsThunk = async (id, thunkAPI) => {
  const url = `/reviews/${id}`;
  try {
    const { data } = await customFetch.get(url);
    const { user } = thunkAPI.getState().user;
    if (user) {
      for (let index = 0; index < data.reviews.length; index++) {
        const element = data.reviews[index];
        if (element.user._id === user._id && index > 0) {
          data.reviews[index] = data.reviews[0];
          data.reviews[0] = element;
        }
      }
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteReviewThunk = async (reviewId, thunkAPI) => {
  const url = `/reviews/${reviewId}`;
  try {
    const {
      data: { numOfReviews, averageRating },
    } = await customFetch.delete(url);
    thunkAPI.dispatch(
      changeSingleProductRating({ numOfReviews, averageRating })
    );
    return numOfReviews;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const updateReviewThunk = async (_, thunkAPI) => {
  const {
    reviews: { idReview, comment, rating },
    user: { user },
  } = thunkAPI.getState();
  const url = `/reviews/${idReview}`;
  try {
    const {
      data: { review, numOfReviews, averageRating },
    } = await customFetch.patch(url, { comment, rating });
    review.user = user;
    thunkAPI.dispatch(
      changeSingleProductRating({ numOfReviews, averageRating })
    );
    return review;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const createReviewThunk = async (product, thunkAPI) => {
  const { comment, rating } = thunkAPI.getState().reviews;
  const productId = thunkAPI.getState().products.singleProduct._id;
  try {
    const {
      data: { review, numOfReviews, averageRating },
    } = await customFetch.post("/reviews", {
      comment,
      rating,
      product: productId,
    });
    const { user } = thunkAPI.getState().user;
    review.user = user;
    thunkAPI.dispatch(
      changeSingleProductRating({ numOfReviews, averageRating })
    );
    return review;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
