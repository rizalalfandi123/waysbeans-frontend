import { useState, useEffect } from "react";
import { API } from "../config/api";
import { useParams } from "react-router-dom";

const DetailTransaction = () => {
  const { id } = useParams();

  const [transaction, setTransaction] = useState({});

  const getDetailTransaction = async () => {
    try {
      const response = await API.get(`/transaction/${id}`);
      console.log(response.data.transaction);
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
    <section>
      <div className="w-full flex flex-col items-center p-2 mb-4 shadow-md rounded-lg border-2 max-w-screen-lg">
        <h2 className="font-bold tracking-wider">dd</h2>
        <div className="w-full my-4">
          <table className="table-auto w-full border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-400">Product</th>
                <th className="border border-gray-400">Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 break-all">dd</td>
                <td className="border border-gray-400">s</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-full">
          <table className="table-auto w-full border-collapse border border-gray-400">
            <tbody>
              <tr>
                <th className="border border-gray-400">Name</th>
                <td className="border border-gray-400 break-all">vv</td>
              </tr>

              <tr>
                <th className="border border-gray-400">Address</th>
                <td className="border border-gray-400 break-all">ff</td>
              </tr>

              <tr>
                <th className="border border-gray-400">Post Code</th>
                <td className="border border-gray-400 break-all">f</td>
              </tr>

              <tr>
                <th className="border border-gray-400">Phone</th>
                <td className="border border-gray-400 break-all">f</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default DetailTransaction;
