import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { API } from "../config/api";
import classNames from "classnames";
import TransactionCard from "../components/transaction/card";

const Transaction = () => {
  const [state, dispatch] = useContext(UserContext);

  const [transactions, setTransactions] = useState([]);

  const [filter, setFilter] = useState(0);

  const getTransaction = async () => {
    try {
      const response = await API.get(`/my-transactions`);
      setTransactions(response.data.transaction);
    } catch (error) {
      console.log(`Error : ${error}`);
    }
  };

  useEffect(() => {
    getTransaction();

    return () => {
      setTransactions([]);
    };
  }, []);

  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full flex md:justify-center p-2 md:py-4 mx-2 mb-4 overflow-x-scroll overflow-y-hidden md:scrollbar-hide whitespace-nowrap font-medium">
        {filterData.map((value, index) => {
          return (
            <h4
              key={index}
              onClick={() => setFilter(value.id)}
              className={classNames(
                "inline-block px-3 cursor-pointer",
                value.id === filter ? "text-primary-color" : "text-gray-400"
              )}
            >
              {value.title}
            </h4>
          );
        })}
      </div>
      {filter === 0
        ? transactions.map((value, index) => {
            return <TransactionCard key={index} transaction={value} />;
          })
        : filter === 1
        ? transactions.map((value, index) => {
            if (value.status === "waiting payment") {
              return <TransactionCard key={index} transaction={value} />;
            }
          })
        : filter === 2
        ? transactions.map((value, index) => {
            if (value.status === "waiting approve") {
              return <TransactionCard key={index} transaction={value} />;
            }
          })
        : filter === 3
        ? transactions.map((value, index) => {
            if (value.status === "on the way") {
              return <TransactionCard key={index} transaction={value} />;
            }
          })
        : filter === 4
        ? transactions.map((value, index) => {
            if (value.status === "success") {
              return <TransactionCard key={index} transaction={value} />;
            }
          })
        : transactions.map((value, index) => {
            if (value.status === "cancel") {
              return <TransactionCard key={index} transaction={value} />;
            }
          })}
    </section>
  );
};

const filterData = [
  { id: 0, title: "All" },
  { id: 1, title: "Waiting Payment" },
  { id: 2, title: "Waiting Approve" },
  { id: 3, title: "On The Way" },
  { id: 4, title: "Success" },
  { id: 5, title: "Cancel" },
];


export default Transaction;
