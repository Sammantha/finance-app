'use client';

import useSWR from 'swr';
import { useState } from 'react';

export default function Menu(props) {
  const { id } = props;

  const fetcher = (...args) => fetch(...args).then(res => res.json());
  let { data, error, isLoading } = useSWR('/api/frequency', fetcher);
  const frequencies = data;
  ({ data, error, isLoading } = useSWR('/api/accounts', fetcher));
  const accounts = data;
  ({ data, error, isLoading } = useSWR(`/api/expenses/${id}`, fetcher));

  const [ frequencyId, setFrequencyId ] = useState(props.expense?.frequencyId);

  const onFrequencyChange = (event) => {
    setFrequencyId(event.target.value);
  };

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <div>
        {/* Name */}
        <div>{data.name}</div>
        
        {/* Frequency */}
        <div>
            <select value={frequencyId} onChange={onFrequencyChange}> 
            {frequencies.map(freq => {
                return <option key={`${id}_freq_${freq.id}`} value={freq.id}>{freq.name}</option>
            })}
            </select>
        </div>
        <div>{accounts?.find((account) => account.id === data.accountId)?.name}</div>
      <div>
        <button>Save</button>
      </div>
    </div>
  );
}
