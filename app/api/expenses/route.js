export async function GET(request) {
  // fetch data from your DB here
  const expenses = [
    { id: 0, name: 'Rental Insurance', accountId: 0, frequencyId: 1, janAmt: 34.43 },
    { id: 1, name: 'Rent', accountId: 0, frequencyId: 2, janAmt: 1200.00 },
    { id: 2, name: 'Home Chef', accountId: 0, frequencyId: 0, janAmt: 150.65 },
  ];

  return new Response(JSON.stringify(users), {
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