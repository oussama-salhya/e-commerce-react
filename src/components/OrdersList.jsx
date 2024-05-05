import { useLoaderData } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const OrdersList = () => {
  const { orders } = useLoaderData();

  return (
    <div className="mt-8">
      <h4 className="mb-4 capitalize">
        {/* total orders : {meta.pagination.total} */}
      </h4>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Products</th>
              <th>Cost</th>
              <th className="hidden sm:block">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders[0].orderItems.map((order) => {
              const id = order.productDTO.id;
              const { name, description } = order.productDTO;
              const { amount, productId } = order;
              // const date = day(createdAt).format("hh:mm a - MMM Do, YYYY");
              return (
                <tr key={productId}>
                  <td>{name}</td>
                  <td>{description}</td>
                  <td>{amount}</td>
                  {/* <td className="hidden sm:block">{date}</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrdersList;
