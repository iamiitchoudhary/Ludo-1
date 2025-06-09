export async function GET() {
  const tournaments = [
    { id: 1, name: "Quick Match", players: 4 },
    { id: 2, name: "Pro League", players: 8 }
  ];
  return new Response(JSON.stringify(tournaments), {
    headers: { 'Content-Type': 'application/json' }
  });
}
