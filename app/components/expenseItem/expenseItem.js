'use client';

import styles from './ExpenseItem.module.css';

export default function Menu(props) {
  return (
    <div className={styles.container}>
        <div className={styles.cell2}>{props.expense.name}</div>
        <div className={styles.cell1}>{props.frequencies?.find((frequency) => frequency.id === props.expense.frequencyId)?.name}</div>
        <div className={styles.cell1}>{props.accounts?.find((account) => account.id === props.expense.accountId)?.name}</div>
    
      <div>
        <button className={styles.save}>Save</button>
        <button className={styles.delete}>Delete</button>
      </div>
    </div>
  );
}
