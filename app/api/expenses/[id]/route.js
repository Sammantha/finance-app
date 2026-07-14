import { NextRequest } from 'next/server';
 
export async function GET(request, { params }) {
  const id = (await params).id;
  // e.g. Query a database for user with ID `id`
  return new Response(JSON.stringify({ id, name: `Expense ${id}` }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}