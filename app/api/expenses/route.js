export async function GET(request) {
  const response = await fetch('https://finance-api.sammantha-sadler.workers.dev/api/expenses')
    .then((res) => res.json());

  return new Response(JSON.stringify(response.expenses), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
 
// export async function POST(request) {
//   // Parse the request body
//   const body = await request.json();
//   const { name } = body;
 
//   // e.g. Insert new user into your DB
//   const newUser = { id: Date.now(), name };
 
//   return new Response(JSON.stringify(newUser), {
//     status: 201,
//     headers: { 'Content-Type': 'application/json' }
//   });
// }