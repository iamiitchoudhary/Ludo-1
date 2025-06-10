import { Server } from 'socket.io';

export default function SocketHandler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      socket.on('join-room', (roomId) => {
        socket.join(roomId);
      });
      
      socket.on('move-piece', (data) => {
        io.to(data.roomId).emit('piece-moved', data);
      });
    });
  }
  res.end();
}
