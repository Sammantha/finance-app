'use client';

import styles from './ExpenseItem.module.css';
import Link from 'next/link';

export default function Menu(props) {
  return (
    <div className={styles.container}>
        <div className={styles.cell2}>{props.expense.name}</div>
        <div className={styles.cell1}>{props.frequencies?.find((frequency) => frequency.id === props.expense.frequencyId)?.name}</div>
        <div className={styles.cell1}>{props.accounts?.find((account) => account.id === props.expense.accountId)?.name}</div>
        <div className={styles.cell1}>{props.expense?.janAmt}</div>
      <div>
        <Link href={`/expenses/${encodeURIComponent(props.expense.id)}`}>
          <button className={styles.edit}>Edit</button>
        </Link>
      </div>
    </div>
  );
}
