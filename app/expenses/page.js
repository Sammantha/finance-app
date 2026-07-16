'use client';

import useSWR from 'swr';
import ExpenseItem from '../_components/expenseItem/expenseItem';
import styles from './Expenses.module.css';

export default function Expenses() {
  const fetcher = (...args) => fetch(...args).then(res => res.json());
  let { data, error, isLoading } = useSWR('/api/frequency', fetcher);
  const frequencyMap = data;
  ({ data, error, isLoading } = useSWR('/api/accounts', fetcher));
  const accountsMap = data;
  ({ data, error, isLoading } = useSWR('/api/expenses', fetcher));

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Expenses</h1>
        <button className={styles.new}>New Expense</button>
      </div>
      { data && frequencyMap && accountsMap && data.map((expense) => {
        return (
          <ExpenseItem key={expense.id} expense={expense} frequencies={frequencyMap} accounts={accountsMap}></ExpenseItem>
        )
      })}
    </div>
  );
}
