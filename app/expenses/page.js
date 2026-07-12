'use client';

import useSWR from 'swr';

export default function Expenses() {
  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data, error, isLoading } = useSWR('/api/expenses', fetcher);

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h1>Expenses</h1>
      <p>This is the expenses page where all Expenses, their amounts, and their frequency will be noted and editable.</p>
    
      { data && data.map((expense) => {
        return (
          <p>{expense?.name}</p>
        )
      })}
    </div>
  );
}
