export async function GET(request) {
  const response = await fetch('https://finance-api.sammantha-sadler.workers.dev/api/frequencies')
    .then((res) => res.json());

  return new Response(JSON.stringify(response.frequencies), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}