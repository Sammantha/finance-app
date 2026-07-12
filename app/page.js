import Head from 'next/head';
import styles from './Home.module.css';
import Menu from './components/menu/menu';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>This is a NextJS Template</h1>
      <p>Because the template on their website doesn't meet my needs</p>
    </div>
  );
}
