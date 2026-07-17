export async function GET(request) {
  // fetch data from your DB here
  const scheduledTransactions = [
    { id: 0, expenseId: 0, month: 8, year: 2026, transactionDay: 3, amount: 34.43, isPaid: false, expense: { id: 0, name: 'Rental Insurance', accountId: 0, frequencyId: 1 } },
    { id: 1, expenseId: 1, month: 8, year: 2026, transactionDay: 4, amount: 1200.00, isPaid: false, expense: { id: 1, name: 'Rent', accountId: 0, frequencyId: 2} },
    { id: 2, expenseId: 2, month: 8, year: 2026, transactionDay: 7, amount: 150.65, isPaid: false, expense: { id: 2, name: 'Home Chef', accountId: 0, frequencyId: 0 } },
    { id: 3, expenseId: 0, month: 8, year: 2026, transactionDay: 18, amount: 34.34, isPaid: false, expense: { id: 0, name: 'Rental Insurance', accountId: 0, frequencyId: 1 } },
    { id: 4, expenseId: 2, month: 8, year: 2026, transactionDay: 21, amount: 157.32, isPaid: false, expense: { id: 2, name: 'Home Chef', accountId: 0, frequencyId: 0 } }
  ];

  return new Response(JSON.stringify(scheduledTransactions), {
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