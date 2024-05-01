import customFetch, { checkForUnauthenticatedError } from "../../utils/axios";

export const createPaymentIntentThunk = async (_, thunkAPI) => {
  const newCart = thunkAPI.getState().cart.cartItems.map((item) => {
    const { id, amount, price } = item;
    return { amount, price, productId: id };
  });
  try {
    const { data } = await customFetch.post(
      "/orders/create-payment-intent",
      newCart
    );
    return data;
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};
export const createOrderThunk = async (paymentIntentId, thunkAPI) => {
  const orderItems = thunkAPI.getState().cart.cartItems.map((item) => {
    const { id, amount, price, name, image } = item;
    return { amount, price, product: id, name, image };
  });

  try {
    await customFetch.post("/orders/createOrder", {
      paymentIntentId,
      orderItems,
    });
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};

export const getAllOrdersThunk = async () => {
  try {
    const { data } = await customFetch.get("/orders");
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getFilteredOrdersThunk = async (_, thunkAPI) => {
  const { companies, categories, cities, page, month } =
    thunkAPI.getState().orders;

  let url = "/orders/get-filtered-orders?";
  if (month) {
    url += `date=${month}&`;
  }
  if (page > 1) {
    url += `page=${page}&`;
  }
  if (categories.length > 0) {
    url += `category=${categories.join(",")}&`;
  }
  if (companies.length > 0) {
    url += `company=${companies.join(",")}&`;
  }
  if (cities.length > 0) {
    url += `city=${cities.join(",")}&`;
  }
  try {
    const { data } = await customFetch.get(url);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getTotalOrdersGroupByCategoriesThunk = async () => {
  try {
    const { data } = await customFetch.get(
      "/orders/get-total-orders-by-category"
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getCustomersThunk = async () => {
  try {
    const { data } = await customFetch.get("/orders/get-customers");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getDashboardInfoThunk = async (_, thunkAPI) => {
  try {
    const { data } = await customFetch.get("/orders/dashboard");
    return data;
  } catch (error) {
    checkForUnauthenticatedError(error, thunkAPI);
    console.log(error);
  }
};

export const getStatsThunk = async (date) => {
  try {
    const { data } = await customFetch.get("/orders/stats/" + date);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleProductOrdersThunk = async (productId, date) => {
  try {
    const { data } = await customFetch.get(
      `/orders/get-product-orders?i=${productId}`
    ); //&d=${date}
    return data;
  } catch (error) {
    console.log(error);
  }
};
