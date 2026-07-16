import styles from './Budget.module.css';

export default function BudgetS() {
  return (
    <div className={styles.container}>
      <h1>Budget Status Page</h1>
      <p>This is where we will report on which months have expenses created and which ones do not yet.</p>
      <p>It also serves as a Link page to access the Budget for every month.</p>

      <p>July---no</p>
      <p>August---no</p>
    </div>
  );
}
