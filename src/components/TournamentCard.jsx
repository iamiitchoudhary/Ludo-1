export default function TournamentCard({ tournament }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold">{tournament.name}</h3>
      <p>Entry: ${tournament.entry}</p>
      <p>Prize: ${tournament.prize}</p>
      <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">
        Join
      </button>
    </div>
  );
}
