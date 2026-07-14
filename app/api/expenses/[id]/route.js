import { NextRequest } from 'next/server';
 
export async function GET(request, { params }) {
  const id = (await params).id;
  // e.g. Query a database for user with ID `id`

  // fake it for now
  const expense = { id: 2, name: 'Home Chef', accountId: 0, frequencyId: 0, janAmt: 150.65 }

  return new Response(JSON.stringify(expense), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}