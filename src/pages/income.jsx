import { useState, useEffect } from "react";
import { API } from "../config/api";
import IncomeCard from "../components/income/card";

const Income = () => {
  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    try {
      const response = await API.get("/transactions");
      setTransactions(response.data.transactions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactions();

    return () => {
      setTransactions([]);
    };
  }, []);

  return (
    <section className="w-full flex flex-col items-center">
      {transactions.map((value, index) => {
        return (
          <IncomeCard
            transaction={value}
            key={index}
            getTransactions={getTransactions}
          />
        );
      })}
    </section>
  );
};

export default Income;
