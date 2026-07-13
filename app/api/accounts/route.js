export async function GET(request) {
  // fetch data from your DB here
  const accounts = [
    { id: 0, name: 'Joint Checking' },
    { id: 1, name: 'Sam\'s Checking' },
    { id: 2, name: 'HSA' }
  ];

  return new Response(JSON.stringify(accounts), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}