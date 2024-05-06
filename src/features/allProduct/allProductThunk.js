// import customFetch, { checkForUnauthenticatedError } from "../../utils/axios";
import {
  clearFilters,
  // clearSingleProductValues,
  // getAllProducts,
  // getFilteredProducts,
  setProgressPercentage,
  setupFilters,
} from "./allProductSlice";

export const getAllProductsThunk = async (_, thunkAPI) => {
  const { search } = thunkAPI.getState().products;
  let url = `/products/`;
  if (search) {
    url += `?search=${search}`;
  }
  url += search ? "&limit=5" : "?limit=5";
  try {
    const { data } = await customFetch.get(url, {
      onDownloadProgress: (progressEvent) => {
        thunkAPI.dispatch(
          setProgressPercentage({
            loaded: progressEvent.loaded,
            size: progressEvent.event.currentTarget.getResponseHeader("size"),
          })
        );
      },
    });
    thunkAPI.dispatch(clearFilters());
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getFilteredProductsThunk = async (_, thunkAPI) => {
  const { page, sort, companies, categories, colors, price, search } =
    thunkAPI.getState().products;
  let url = `/products/filter?sort=${sort}&limit=5`; //
  if (search) {
    url += `&search=${search}`;
  }
  if (page) {
    url += `&page=${page}`;
  }
  if (price) {
    url += `&price=${price}`;
  }
  if (categories.length > 0) {
    url += `&category=${categories.join(",")}`;
  }
  if (companies.length > 0) {
    url += `&company=${companies.join(",")}`;
  }
  if (colors.length > 0) {
    url += `&colors=${colors.join(",")}`;
  }
  try {
    const {
      data: {
        maxPrice,
        products,
        categories,
        companies,
        numOfPages,
        totalProducts,
      },
    } = await customFetch.get(url);
    thunkAPI.dispatch(setupFilters({ maxPrice, categories, companies }));
    return { products, numOfPages, totalProducts };
  } catch (error) {
    console.log(error);
  }
};

export const getSearchSuggestionsThunk = async (_, thunkAPI) => {
  const searchTerm = thunkAPI.getState().products.search;
  const url = "/products//getSearchSuggestions?searchTerm=" + searchTerm;
  try {
    const { data } = await customFetch.get(url);
    return data;
  } catch (error) {
    console.log(error);
  }
};
