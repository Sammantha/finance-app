import Link from 'next/link';
import styles from './Menu.module.css';

export default function Menu() {
  return (
    <div className={styles.container}>
      <Link href="/">Home</Link>
      <Link href="/expenses">Expenses</Link>
      <Link href="/budget">Budget</Link>
    </div>
  );
}
