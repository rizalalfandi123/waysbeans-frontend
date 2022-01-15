import { Button } from "../components/basic";

const Income = () => {
  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col items-center p-2 mb-4 shadow-md rounded-lg border-2 max-w-screen-lg">
        <div className="grid grid-cols-2 content-center gap-x-2">
          <Button className="text-font-color bg-green-200">Approve</Button>
          <Button className="text-font-color bg-red-200">Cancel</Button>
        </div>
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
                <td className="border border-gray-400 break-all">
                  addddddddddddds
                </td>
                <td className="border border-gray-400">b</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-full">
          <table className="table-auto w-full border-collapse border border-gray-400">
            <tbody>
              <tr>
                <th className="border border-gray-400">Name</th>
                <td className="border border-gray-400 break-all">Jolowing</td>
              </tr>

              <tr>
                <th className="border border-gray-400">Address</th>
                <td className="border border-gray-400 break-all">
                  kkddddddddddddddddddddddddddddd
                </td>
              </tr>

              <tr>
                <th className="border border-gray-400">Post Code</th>
                <td className="border border-gray-400 break-all">kk</td>
              </tr>

              <tr>
                <th className="border border-gray-400">Phone</th>
                <td className="border border-gray-400 break-all">kk</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full flex flex-col items-center p-2 mb-4 shadow-md rounded-lg border-2 max-w-screen-lg">
        <div className="grid grid-cols-2 content-center gap-x-2">
          <Button className="text-font-color bg-green-200">Approve</Button>
          <Button className="text-font-color bg-red-200">Cancel</Button>
        </div>
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
                <td className="border border-gray-400 break-all">
                  addddddddddddds
                </td>
                <td className="border border-gray-400">b</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-full">
          <table className="table-auto w-full border-collapse border border-gray-400">
            <tbody>
              <tr>
                <th className="border border-gray-400">Name</th>
                <td className="border border-gray-400 break-all">Jolowing</td>
              </tr>

              <tr>
                <th className="border border-gray-400">Address</th>
                <td className="border border-gray-400 break-all">
                  kkddddddddddddddddddddddddddddd
                </td>
              </tr>

              <tr>
                <th className="border border-gray-400">Post Code</th>
                <td className="border border-gray-400 break-all">kk</td>
              </tr>

              <tr>
                <th className="border border-gray-400">Phone</th>
                <td className="border border-gray-400 break-all">kk</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Income;
