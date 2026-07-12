export async function GET(request) {
  // fetch data from your DB here
  const expenses = [
    { id: 0, name: 'Weekly' },
    { id: 1, name: 'BiMonthly' },
    { id: 2, name: 'Monthly' },
    { id: 3, name: 'Annual' }
  ];

  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}