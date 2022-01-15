import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { image, name, id, price } = product;
  return (
    <Link to={`/product/${id && id}`}>
      <div className="w-full aspect-[3/4] border-[1px] border-gray-300 rounded-lg md:rounded-xl shadow-md flex flex-col text-center">
        <img
          src={image ? image : "images/1.jpeg"}
          alt="product"
          className="h-[75%] object-cover"
        />
        <div className="w-full grow p-[3%] text-gray-500 flex flex-col justify-center bg-[#faf3eb] items-center">
          <h3>{name && name}</h3>
          <h4 className="font-semibold">{price && price}</h4>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
