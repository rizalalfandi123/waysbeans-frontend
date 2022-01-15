import toRupiah from "@develoka/angka-rupiah-js";
import classNames from "classnames";

const TransactionCard = ({ transaction }) => {
  const { orders, shippingCost, totalPrice, subTotal, status } = transaction;
  return (
    <div className="w-full mb-4 flex items-center shadow-md border-[1px] rounded-lg md:rounded-xl md:w-[80%] lg:w-[70%] xl:w-[65%]">
      <img
        src="/images/1.jpeg"
        alt="product"
        className="h-[10rem] w-auto max-w-[35%] object-cover"
      />
      <div className="p-[2%] flex flex-col w-full justify-center text-center">
        <div className="flex flex-col sm:flex-row-reverse items-center sm:justify-between">
          <div
            className={classNames(
              "py-[2%] rounded-md px-6",
              status === "success"
                ? "bg-green-400"
                : status === "cancel"
                ? "bg-red-400"
                : "bg-sky-400"
            )}
          >
            {status}
          </div>
          <h4 className="font-medium py-[2%]">{`${orders[0].product.name} ${
            orders.length > 1 ? `& ${orders.length - 1} others` : ""
          }`}</h4>
        </div>

        <div className="flex flex-col items-center text-center sm:text-left sm:items-start md:flex-row md:justify-between md:items-center py-[2%] md:p-[2px]">
          <div className="flex flex-col">
            <h3>Subtotal : {toRupiah(subTotal)}</h3>
            <h3>Shipping Cost : {toRupiah(shippingCost)}</h3>
          </div>
          <div className="font-bold tracking-wider pt-[2%] md:text-xl lg:text-2xl md:pt-0">
            {toRupiah(totalPrice)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
