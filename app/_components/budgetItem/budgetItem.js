'use client'

import styles from './BudgetItem.module.css';
import Link from 'next/link';
import { useState } from 'react';

export default function BudgetItem(props) {
  const transaction = props.expense;
  const accounts = props.accounts;

  {/* State declarations */}
  const [ isPaid, setIsPaid ] = useState(transaction?.isPaid);
  const [ amount, setAmount ] = useState(transaction?.amount);
  
  {/* State change functions */}
  const onChangeIsPaid = (event) => {
    // flip isPaid
    setIsPaid(!isPaid);

    // POST request to update transaction isPaid status

    // POST request to update account balance
    // will parent know to refresh? should we call a function defined in the parent so it knows?
  };

  const onChangeAmount = (event) => {
    setAmount(event.target.value);

    // POST request to update transaction amount
  };

  return (
    <div className={styles.container}>
      <div className={styles.cell2}>{transaction.expense?.name}</div>
      <div className={styles.cell2}>{transaction?.transactionDay}</div>
      <div className={styles.cell2}>{accounts?.find((account) => account.id === transaction.expense?.accountId)?.name}</div>
      <div className={styles.cell2}>{amount}</div>
      <div className={styles.cell1}><button className={isPaid ? styles.done : styles.delete} onClick={onChangeIsPaid}>{isPaid ? 'Paid' : 'UNPAID'}</button></div>
    </div>
  );
}
