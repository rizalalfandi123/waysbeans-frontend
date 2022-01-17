import { Button } from "../basic";
import { API } from "../../config/api";

const IncomeCard = ({ transaction, getTransactions }) => {
  const { orders, status, id } = transaction;

  const handleApprove = async () => {
    try {
      const response = await API.patch(`edit-transaction-status/${id}`, {
        status: "on the way",
      });

      if (response.data.status === "success") {
        await getTransactions();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async () => {
    try {
      const response = await API.patch(`cancel-transaction/${id}`, {
        orders,
      });

      if (response.data.status === "success") {
        await getTransactions();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center p-2 mb-4 shadow-md rounded-lg border-2 max-w-screen-lg">
      {status === "waiting approve" ? (
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-bold tracking-wider">{status}</h2>
          <div className="flex mt-2">
            <Button
              className="text-font-color bg-green-200 mx-2"
              onClick={() => handleApprove()}
            >
              Approve
            </Button>
            <Button
              className="text-font-color bg-red-200 mx-2"
              onClick={() => handleCancel()}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <h2 className="font-bold tracking-wider">{status}</h2>
      )}
      <div className="w-full my-4">
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400">Product</th>
              <th className="border border-gray-400">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((value, index) => {
              return (
                <tr key={index}>
                  <td className="border border-gray-400 break-all">
                    {value.product.name}
                  </td>
                  <td className="border border-gray-400">{value.qty}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncomeCard;
