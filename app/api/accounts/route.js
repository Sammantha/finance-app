export async function GET(request) {
  // fetch data from your DB here
  const accounts = [
    { id: 0, name: 'Joint Checking', balance: 4284.43 },
    { id: 1, name: 'Sam\'s Checking', balance: 243.32 },
    { id: 2, name: 'HSA', balance: 234.23 }
  ];

  return new Response(JSON.stringify(accounts), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}