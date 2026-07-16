'use client';

import useSWR from 'swr';
import { useState } from 'react';
import styles from './Expense.module.css';

const dayOfWeekMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Menu(props) {
  const { id } = props;

  {/* API fetching */}
  const fetcher = (...args) => fetch(...args).then(res => res.json());
  let { data, error, isLoading } = useSWR('/api/frequency', fetcher);
  const frequencies = data;
  ({ data, error, isLoading } = useSWR('/api/accounts', fetcher));
  const accounts = data;
  ({ data, error, isLoading } = useSWR(`/api/expenses/${id}`, fetcher));

  {/* State declarations */}
  const [ expenseName, setExpenseName ] = useState(data?.name);
  const [ frequencyId, setFrequencyId ] = useState(data?.frequencyId == null ? '' : +data.frequencyId);
  const [ accountId, setAccountId ] = useState(data?.accountId == null ? '' : +data.accountId);
  const [ janAmount, setJanAmount ] = useState(data?.janAmt);

  {/* State change functions */}
  const onAccountChange = (event) => {
    const value = event.target.value === '' ? '' : +event.target.value;
    setAccountId(value);
  };

  const onFrequencyChange = (event) => {
    const value = event.target.value === '' ? '' : +event.target.value;
    setFrequencyId(value);
  };

  const onNameChange = (event) => {
    setExpenseName(event.target.value);
  };

  const onJanAmountChange = (event) => {
    setJanAmount(event.target.value);
  };

  const onSave = (event) => {
    console.log('saving', expenseName);
  }

  {/* Loading or Error */}
  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>

  {/* Page Contents */}
  return (
    <div className={styles.container}>
        <h1>{expenseName}</h1>

        {/* Name */}
        <div className={styles.section}>
          <label>Name </label>
          <input value={expenseName} onChange={onNameChange}/>
        </div>

        {/* Account */}
        <div className={styles.section}>
            <label>Account </label>
            <select value={accountId} onChange={onAccountChange}>
              <option value=''>--Select an Account--</option>
              {accounts.map(acct => {
                  return <option key={`${id}_acct_${acct.id}`} value={acct.id}>{acct.name}</option>
              })}
            </select>
        </div>

        {/* Transaction Days */}
        <h2 className='center'>Transaction Days</h2>
        <div className={styles.section}>
          {/* Frequency */}
          <label>Frequency </label>
          <select value={frequencyId} onChange={onFrequencyChange}>
            <option value=''>--Select a Frequency--</option>
            {frequencies.map(freq => {
                return <option key={`${id}_freq_${freq.id}`} value={freq.id}>{freq.name}</option>
            })}
          </select>

          {/* Day of Week */}
          { frequencyId === 0 && 
            <>
              <label>Day of Week </label>
              <select value={frequencyId} onChange={onFrequencyChange}> 
                {dayOfWeekMap.map((name, index) => {
                    return <option key={`${id}_dow_${index}`} value={index}>{name}</option>
                })}
              </select>
            </>
          }
        </div>

        {/* Monthly base amounts */}
        <h2 className='center'>Monthly Amounts</h2>
        <div className={styles.monthlyAmts}>
          <div className={styles.singleMonthAmt}>
            <label>January</label>
            <input value={janAmount} onChange={onJanAmountChange}/>
          </div>

          <div className={styles.singleMonthAmt}>
            <label>February</label>
            <input/>
          </div>
        </div>

        {/* Buttons */}
        <div className={styles.buttons}>
          <button className={styles.save} onClick={onSave}>Save</button>
          <button className={styles.delete}>Delete</button>
        </div>
    </div>
  );
}
