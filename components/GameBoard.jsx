useEffect(() => {
  const socket = io();

  socket.on('piece-moved', (data) => {
    // Update game state
  });

  return () => socket.disconnect();
}, []);
