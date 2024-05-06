import { useLoaderData } from "react-router-dom";
import { formatPrice, customFetch, generateAmountOptions } from "../utils";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
import { nanoid } from "nanoid";

const singleProductQuery = (id) => {
  return {
    queryKey: ["singleProduct", id],
    queryFn: () => customFetch(`/products/${id}`),
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const response = await queryClient.ensureQueryData(
      singleProductQuery(params.id)
    );
    console.log(response.data);
    return { product: response.data };
  };

const SingleProduct = () => {
  const { product } = useLoaderData();
  const {
    image,
    name,
    numOfReviews,
    price,
    description,
    colors,
    company,
    averageRating,
    category,
    freeShipping,
    inventory,
  } = product;
  const dollarsAmount = formatPrice(price);
  let [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(inventory);

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };
  // just in dev :
  productColor = productColor ? productColor : "";
  const cartProduct = {
    cartID: product.id + productColor,
    id: product.id,
    image,
    name,
    price,
    company,
    productColor,
    amount,
    stock,
  };
  console.log("cartID", product);
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      {/* PRODUCT */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* IMAGE */}
        <img
          src={image}
          alt={name}
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />
        {/* PRODUCT */}
        <div>
          <h1 className="capitalize text-3xl font-bold">{name}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company.name}
          </h4>
          <p className="mt-3 text-xl">{dollarsAmount}</p>
          <p className="mt-6 leading-8">{description}</p>
          {/* COLORS */}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>
            <div className="mt-2">
              {colors.map((color) => {
                console.log(color);
                console.log(nanoid());
                return (
                  <button
                    key={nanoid()}
                    type="button"
                    className={`badge w-6 h-6 mr-2 ${
                      color === productColor && "border-2 border-secondary"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setProductColor(color)}
                  ></button>
                );
              })}
            </div>
          </div>
          {/* AMOUNT */}
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="amount">
              <h4 className="text-md font-medium -tracking-wider capitalize">
                amount
              </h4>
            </label>
            <select
              className="select select-secondary select-bordered select-md"
              id="amount"
              value={amount}
              onChange={handleAmount}
            >
              {generateAmountOptions(amount)}
            </select>
          </div>
          {/* CART BTN */}
          <div className="mt-10">
            <button className="btn btn-secondary btn-md" onClick={addToCart}>
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SingleProduct;
