import TournamentCard from '../components/TournamentCard';

export default function Home() {
  const tournaments = [
    { id: 1, name: "Quick Match", entry: 10, prize: 100 },
    { id: 2, name: "Pro League", entry: 50, prize: 500 }
  ];

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-6">Ludo Tournaments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tournaments.map(tournament => (
          <TournamentCard key={tournament.id} tournament={tournament} />
        ))}
      </div>
    </main>
  );
}
