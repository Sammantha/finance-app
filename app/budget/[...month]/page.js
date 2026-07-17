'use client';

import useSWR from 'swr';
import { useParams } from 'next/navigation';
import styles from './Month.module.css';
import { useState } from 'react';
import BudgetItem from '../../_components/budgetItem/budgetItem';

const monthsOfYearMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function BudgetMonth(props) {
  const params = useParams();
  const year = params.month[0];
  const month = params.month[1];

  {/* API fetching */}
  const fetcher = (...args) => fetch(...args).then(res => res.json());
  let { data, error, isLoading } = useSWR('/api/accounts', fetcher);
  const accounts = data;
  ({ data, error, isLoading } = useSWR(`/api/scheduledTransactions`, fetcher));
  const expenses = data;

  {/* State declarations */}
  const [accountBalances, setAccountBalances] = useState(accounts);
  const [historicalExpenses, setHistoricalExpenses] = useState(null);

  {/* State change functions */}

  {/* Loading or Error */}
  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>

  {/* Page Contents */}
  return (
    <div className={styles.container}>
        <h1 className='center'>{monthsOfYearMap[month - 1]} {year}</h1>

        {/* Account Balances */}
        <h2>Account Balances</h2>
        <div className={styles.accountSection}>
          {accounts?.map((account) => {
            return (
            <div className={styles.account} key={`acct_${account?.id}`}>
              <div className={styles.accountName}>{account?.name}</div>
              <div className={styles.accountBalance}>${account?.balance}</div>
            </div>
          );
          })}
        </div>

        {/* Expenses */}
        {/* If no historical/paid expenses exist, we need to create them, so provide a button */}
        {!expenses && <div>
          <h2>No expenses found for this month. Create them?</h2>
          <button>Yes, do it now.</button>
        </div>}

        {expenses && <div>
          {/* Table Headers */}
          <div className={styles.headers}>
            <div className={styles.cell2}>Expense Name</div>
            <div className={styles.cell2}>Transaction Date</div>
            <div className={styles.cell2}>Account</div>
            <div className={styles.cell2}>$ Amount</div>
            <div className={styles.cell1}>Paid?</div>
          </div>
          { expenses.map((expense) => {
              return <BudgetItem key={`budgetItem_${expense.id}`} accounts={accounts} expense={expense}></BudgetItem>
          })}
        </div>}
    </div>
  );
}
