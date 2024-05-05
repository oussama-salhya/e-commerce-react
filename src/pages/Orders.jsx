import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import {
  OrdersList,
  ComplexPaginationContainer,
  SectionTitle,
} from "../components";

const ordersQuery = (params, user) => {
  return {
    queryKey: ["orders", user.name, params.page ? parseInt(params.page) : 1],
    queryFn: () =>
      customFetch.get("/orders/showAllMyOrders", {
        // params,
        // headers: {
        //   Authorization: `Bearer ${user.token}`,
        // },
      }),
  };
};

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;

    if (!user) {
      toast.warn("You must logged in to view orders");
      return redirect("/login");
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    try {
      console.log(user);
      const response = await queryClient.ensureQueryData(
        ordersQuery(params, user)
      );
      console.log("orders", response.data);
      return { orders: response.data };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.message || "there was an error placing your order";
      toast.error(errorMessage);
      if (error?.response?.status === 401 || error?.response?.status === 403)
        return redirect("/login");
      return null;
    }
  };

const Orders = () => {
  const { orders } = useLoaderData();
  if (orders?.orderItems?.length < 1) {
    return <SectionTitle text="please make an order" />;
  }
  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrdersList />
      {/* <ComplexPaginationContainer /> */}
    </>
  );
};
export default Orders;
