export async function GET(request) {
  const response = await fetch('https://finance-api.sammantha-sadler.workers.dev/api/accounts')
    .then((res) => res.json());

  return new Response(JSON.stringify(response.accounts), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}