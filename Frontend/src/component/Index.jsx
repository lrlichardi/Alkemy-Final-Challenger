import React, { useEffect, useState } from "react";
import NewOneAccount from "./NewOneAccount";
import TableAccount from "./TableAccount";
import '../css/index.css'
import axios from "axios";

export default function Index({user}) {
  const [accounts, setAccounts] = useState([]);
  const [expenses, setExpenses] = useState(0);
  const [income, setIncome] = useState(0);

  useEffect(() => {
    getAccounts();
      }, []);
   
    const getAccounts = async () => {
      const { data } = await axios.get(`/id=${user?.id}`);
      setAccounts(data);
    };

    const balance = () => {
      var expenses = 0;
      var income = 0;
      accounts.map((account) => {
        if (account.type === "EGRESO") {
          return expenses += parseInt(account.value);
        } else {
          return income += parseInt(account.value);
        }
      });
      setExpenses(expenses);
      setIncome(income);
    };
        
  return (
    <>
      <h1 className="mt-3 text-center">Control de Gastos Mensuales</h1>
      <div className="ms-3 d-flex containerIndex">
        <div className="me-5 containerAccount">
          <NewOneAccount getAccounts={getAccounts} balance={balance} user={user} />
        </div>
        <div className="mt-5 me-3 containerTable">
          <TableAccount accounts={accounts} setAccounts={setAccounts} getAccounts={getAccounts} balance={balance} income={income} expenses={expenses}  />
        </div>
      </div>
    </>
  );
}
