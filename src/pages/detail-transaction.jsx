import { useState, useEffect } from "react";
import { API } from "../config/api";
import { useParams } from "react-router-dom";
import { Button } from "../components/basic";

const DetailTransaction = () => {
  const { id } = useParams();

  const [transaction, setTransaction] = useState({});

  const getDetailTransaction = async () => {
    try {
      const response = await API.get(`/transaction/${id}`);
      setTransaction(response.data.transaction);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetailTransaction();
    return () => {
      setTransaction({});
    };
  }, []);

  return (
    <section className="w-full flex flex-col items-center">
      <TransactionCard
        transaction={transaction}
        getDetailTransaction={getDetailTransaction}
      />
    </section>
  );
};

const TransactionCard = ({ transaction, getDetailTransaction }) => {
  const { id, status, orders, subTotal, shippingCost, totalPrice, shipping } =
    transaction;

  const handleAccepted = async () => {
    try {
      const response = await API.patch(`edit-transaction-status/${id}`, {
        status: "success",
      });

      if (response.data.status === "success") {
        getDetailTransaction();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center p-2 mb-6 shadow-md rounded-lg border-2 max-w-screen-xl">
      {status === "on the way" ? (
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-bold tracking-wider">{status}</h2>
          <Button className="mt-2" onClick={() => handleAccepted()}>
            <h3>Accept Order</h3>
          </Button>
        </div>
      ) : (
        <h2 className="font-bold tracking-wider">{status}</h2>
      )}
      <div className="w-full my-4">
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400">Product</th>
              <th className="border border-gray-400">Price</th>
              <th className="border border-gray-400">Quantity</th>
              <th className="border border-gray-400">Sub Total</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((value, index) => {
              return (
                <tr key={index}>
                  <td className="border border-gray-400 break-all">
                    {value.product.name}
                  </td>
                  <td className="border border-gray-400">
                    {value.product.price}
                  </td>
                  <td className="border border-gray-400">{value.qty}</td>
                  <td className="border border-gray-400">
                    {value.qty * value.product.price}
                  </td>
                </tr>
              );
            })}
            <tr>
              <th colSpan={3} className="border border-gray-400 break-all">
                Total
              </th>
              <td className="border border-gray-400">{subTotal}</td>
            </tr>
            <tr>
              <th colSpan={3} className="border border-gray-400 break-all">
                Shipping Cost
              </th>
              <td className="border border-gray-400">{shippingCost}</td>
            </tr>
            <tr>
              <th colSpan={3} className="border border-gray-400 break-all">
                Total Payment
              </th>
              <td className="border border-gray-400">{totalPrice}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-full">
        <table className="table-auto w-full border-collapse border border-gray-400">
          <tbody>
            <tr>
              <th className="border border-gray-400">Name</th>
              <th className="border border-gray-400">Address</th>
              <th className="border border-gray-400">Post Code</th>
              <th className="border border-gray-400">Phone</th>
              <th className="border border-gray-400">Email</th>
            </tr>

            <tr>
              <td className="border border-gray-400 break-all">
                {shipping?.name}
              </td>
              <td className="border border-gray-400 break-all">
                {shipping?.address}
              </td>
              <td className="border border-gray-400 break-all">
                {shipping?.postCode}
              </td>
              <td className="border border-gray-400 break-all">
                {shipping?.phone}
              </td>
              <td className="border border-gray-400 break-all">
                {shipping?.email}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailTransaction;
