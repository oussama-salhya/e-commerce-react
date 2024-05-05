import axios from "axios";
import { removeUserFromLocalStorage } from "./localStorage";

export const customFetch = axios.create({
  baseURL: "/api/v1",
});

// customFetch.interceptors.request.use((config) => {
//   const user = getUserFromLocalStorage();
//   if (user) {
//     config.headers["Authorization"] = `Bearer ${user.token}`;
//   }
//   return config;
// });

customFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response && error.response.status === 403) {
      removeUserFromLocalStorage();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export const formatPrice = (price) => {
  const dollarsAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2));
  return dollarsAmount;
};

export const generateAmountOptions = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;
    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};
