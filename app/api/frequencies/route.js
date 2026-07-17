export async function GET(request) {
  // fetch data from your DB here
  const frequencies = [
    { id: 0, name: 'Weekly' },
    { id: 1, name: 'BiMonthly' },
    { id: 2, name: 'Monthly' },
    { id: 3, name: 'Annual' }
  ];

  return new Response(JSON.stringify(frequencies), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}