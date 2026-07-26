'use client';

import useSWR from 'swr';
import { useState } from 'react';
import styles from './Expense.module.css';
import { useParams } from 'next/navigation'

const dayOfWeekMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthsOfTheYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function ExpenseDetail() {
  const params = useParams();

  {/* API fetching */}
  const fetcher = (...args) => fetch(...args).then(res => res.json());
  let { data, error, isLoading } = useSWR('/api/frequencies', fetcher);
  const frequencies = data;
  ({ data, error, isLoading } = useSWR('/api/accounts', fetcher));
  const accounts = data;
  ({ data, error, isLoading } = useSWR(`/api/expenses/${params.id}`, fetcher));

  {/* State declarations */}
  const [ expenseName, setExpenseName ] = useState(data?.expense?.name);
  const [ frequencyId, setFrequencyId ] = useState(data?.expense?.frequencyId == null ? '' : +data?.expense?.frequencyId);
  const [ accountId, setAccountId ] = useState(data?.expense?.accountId == null ? '' : +data?.expense?.accountId);
  const [ amounts, setAmounts ] = useState({
    January: data?.expense?.janAmt, 
    February: data?.expense?.febAmt, 
    March: data?.expense?.marAmt, 
    April: data?.expense?.aprAmt,
    May: data?.expense?.mayAmt,
    June: data?.expense?.junAmt,
    July: data?.expense?.julAmt,
    August: data?.expense?.augAmt,
    September: data?.expense?.sepAmt,
    October: data?.expense?.octAmt,
    November: data?.expense?.novAmt,
    December: data?.expense?.decAmt
  });

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

  const onAmountChange = (event) => {
    // TODO: validate input (too large, too small, number of decimal places, strings)
    let obj = {};
    // multiply by 100 to return the amount to PENNIES state
    obj[event.target.name] = event.target.value * 100;

    setAmounts({...amounts, ...obj});
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
                  return <option key={`${params.id}_acct_${acct.id}`} value={acct.id}>{acct.name}</option>
              })}
            </select>
        </div>

        {/* Transaction Days */}
        <div className={styles.section}>
          <h2 className='center'>Transaction Days</h2>
          {/* Frequency */}
          <label>Frequency </label>
          <select value={frequencyId} onChange={onFrequencyChange}>
            <option value=''>--Select a Frequency--</option>
            {frequencies.map(freq => {
                return <option key={`${params.id}_freq_${freq.id}`} value={freq.id}>{freq.name}</option>
            })}
          </select>

          {/* Day of Week */}
          { frequencyId === 0 && 
            <>
              <label>Day of Week </label>
              <select value={frequencyId} onChange={onFrequencyChange}> 
                {dayOfWeekMap.map((name, index) => {
                    return <option key={`${params.id}_dow_${index}`} value={index}>{name}</option>
                })}
              </select>
            </>
          }
        </div>

        {/* Monthly base amounts */}
        <div className={styles.monthlyAmts}>
          <div className={styles.monthlyAmtsBackground}>
            <h2 className='center'>Monthly Amounts</h2>

            { monthsOfTheYear.map((monthName, index) => {
              return(
                <div key={`${monthName}Amt`} className={styles.singleMonthAmt}>
                  <label>{monthName}</label>
                  {/* TODO: to display trailing .00s we will need to use a non-vanilla <input/> OR custom component */}
                  {/* Divide by 100 to transform PENNIES amount into DOLLARS amount */}
                  <input name={monthName} value={(amounts?.[monthName] ?? 0)/100} onChange={onAmountChange} type='number'/>
                </div>
              );
            })}

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
