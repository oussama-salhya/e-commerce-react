import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  About,
  Cart,
  Checkout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Orders,
  Products,
  Register,
  SingleProduct,
  ProtectedRoute,
} from "./pages";
import {
  DashboardProtectedRoute,
  SharedDashboardLayout,
} from "./pages/dashboard";
import { ErrorElement } from "./components";

// loaders
import { loader as landingLoader } from "./pages/Landing";
import { loader as singleProductLoader } from "./pages/SingleProduct";
import { loader as productsLoader } from "./pages/Products";
import { loader as checkoutLoader } from "./pages/Checkout";
import { loader as ordersLoader } from "./pages/Orders";
// actions
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as checkoutAction } from "./components/CheckoutForm";
import { store } from "./store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute children={<HomeLayout></HomeLayout>} />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
        loader: landingLoader(queryClient),
      },
      {
        path: "products",
        element: <Products />,
        errorElement: <ErrorElement />,
        loader: productsLoader(queryClient),
      },
      {
        path: "products/:id",
        element: <SingleProduct />,
        errorElement: <ErrorElement />,
        loader: singleProductLoader(queryClient),
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "checkout",
        element: <Checkout />,
        loader: checkoutLoader(store),
        action: checkoutAction(store, queryClient),
      },
      {
        path: "orders",
        element: <Orders />,
        loader: ordersLoader(store, queryClient),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store),
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
    action: registerAction(store),
  },
  {
    path: "/dashboard",
    element: (
      <DashboardProtectedRoute>
        <SharedDashboardLayout />
      </DashboardProtectedRoute>
    ),
    errorElement: <Error />,
    // action: registerAction(store),
    children: [
      // {
      //   index: true,
      //   element: <DashboardHome />,
      //   errorElement: <ErrorElement />,
      //   loader: landingLoader(queryClient),
      // },
      //     {
      //       path: "products",
      //       element: <DashboardProducts />,
      //       errorElement: <ErrorElement />,
      //       loader: productsLoader(queryClient),
      //     },
      //     {
      //       path: "add-product",
      //       element: <AddProductDashboard />,
      //       errorElement: <ErrorElement />,
      //       loader: productsLoader(queryClient),
      //     },
      //     {
      //       path: "products",
      //       element: <DashboardProducts />,
      //       errorElement: <ErrorElement />,
      //       loader: productsLoader(queryClient),
      //     },
      //     {
      //       path: "orders",
      //       element: <Orders />,
      //       errorElement: <ErrorElement />,
      //       loader: productsLoader(queryClient),
      //     },
      //     {
      //       path: "customers",
      //       element: <Customers />,
      //       errorElement: <ErrorElement />,
      //       loader: productsLoader(queryClient),
      //     },
      //     {
      //       path: "orders",
      //       element: <Orders />,
      //       errorElement: <ErrorElement />,
      //       loader: productsLoader(queryClient),
      //     },
      //     {
      //       path: "products/:id",
      //       element: <ProductDetails />,
      //       errorElement: <ErrorElement />,
      //       loader: productsLoader(queryClient),
      //     },
      //     {
      //       path: "categories",
      //       element: <Categories />,
      //       errorElement: <ErrorElement />,
      //       loader: productsLoader(queryClient),
      //     },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
