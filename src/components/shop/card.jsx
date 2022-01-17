import { Link } from "react-router-dom";
import toRupiah from "@develoka/angka-rupiah-js";

const ProductCard = ({ product }) => {
  const { image, name, id, price } = product;
  return (
    <Link to={`/product/${id}`}>
      <div className="w-full aspect-[3/4] border-[1px] border-gray-300 rounded-lg md:rounded-xl shadow-md flex flex-col text-center">
        <img
          src={
            typeof image === "object" ? URL.createObjectURL(image[0]) : image
          }
          alt="product"
          className="w-full aspect-square rounded-t-lg md:rounded-t-xl object-cover"
        />
        <div className="w-full grow p-[3%] text-gray-500 rounded-b-lg md:rounded-b-xl flex flex-col justify-center bg-[#faf3eb] items-center">
          <h3>{name && name}</h3>
          <h4 className="font-semibold">{price && toRupiah(price)}</h4>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
