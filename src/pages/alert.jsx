import { Button } from "../components/basic";
import { Link } from "react-router-dom";

const AlertPage = ({ message, action, actionLink }) => {
  return (
    <section className="w-full h-[80vh] flex flex-col justify-center items-center">
      <h2 className="font-medium my-2">{message}</h2>
      <Link to={actionLink}>
        <Button className="py-4 px-12">{action}</Button>
      </Link>
    </section>
  );
};

export default AlertPage;
