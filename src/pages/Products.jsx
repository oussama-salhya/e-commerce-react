import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils";
const url = "/products";

const allProductsQuery = (queryParams) => {
  const {
    search,
    category,
    company,
    sort,
    maxPrice,
    maxRating,
    shipping,
    page,
  } = queryParams;

  return {
    queryKey: [
      "products",
      search ?? "",
      category ?? "all",
      company ?? "all",
      sort ?? "a-z",
      maxPrice ?? 100000,
      maxRating ?? 5,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      customFetch(url, {
        params: queryParams,
      }),
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const response = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );
    console.log(response.data);
    const products = response.data.products;
    const meta = {
      categories: response.data.categories,
      companies: response.data.companies,
    };
    console.log("products", products);
    return { products, meta, params };
  };

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};
export default Products;
