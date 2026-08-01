import Link from 'next/link';
import styles from './Budget.module.css';
import { monthsOfYearMap } from '../_helpers/time'

export default function Budget() {
  // For now, instead of keeping this in a DB, let's keep a rolling view of last month, this month, and 3 months ahead
  const currentMonthIndex = new Date().getMonth(); // 0-based index lines up with our helper array
  const currentYear = new Date().getFullYear();

  // help the roll-around between 12 and 1
  const lastMonthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
  const nextMonthIndex = currentMonthIndex === 11 ? 0 : currentMonthIndex + 1;
  const twoMonthsIndex = nextMonthIndex === 11 ? 0 : nextMonthIndex + 1;
  
  const displayMonths = [
    { monthIndex: lastMonthIndex, year: lastMonthIndex > currentMonthIndex ? currentYear - 1 : currentYear },
    { monthIndex: currentMonthIndex, year: currentYear },
    { monthIndex: nextMonthIndex, year: nextMonthIndex < currentMonthIndex ? currentYear + 1 : currentYear },
    { monthIndex: twoMonthsIndex, year: nextMonthIndex < currentMonthIndex ? currentYear + 1 : currentYear }
  ];

  return (
    <div className={styles.container}>
      <h1>Budget Status Page</h1>
      <p>This page contains a rolling list of Links that dynamically match the month.</p>

      { displayMonths && displayMonths?.map(({monthIndex, year}) => {
        return (
          <Link key={monthIndex} className={styles.month} href={`/budget/${encodeURIComponent(year)}/${encodeURIComponent(monthIndex + 1)}`}>{monthsOfYearMap[monthIndex]} {year}</Link>
        );
      })}
    </div>
  );
}
