import { NextRequest } from 'next/server';
 
export async function GET(request, { params }) {
  const id = (await params).id;
  const response = await fetch(`https://finance-api.sammantha-sadler.workers.dev/api/expenses/${id}`)
    .then((res) => res.json());

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}