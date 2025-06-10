export async function POST(req) {
  const { tournamentId, userId } = await req.json();
  const tournamentRef = doc(db, 'tournaments', tournamentId);

  await updateDoc(tournamentRef, {
    participants: arrayUnion(userId)
  });

  return Response.json({ success: true });
}
