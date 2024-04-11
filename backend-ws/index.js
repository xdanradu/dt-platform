const io = require('socket.io');
const server = io.listen(8000);
console.log('Server socket is listening on port 8000');
let connectedClients = new Map();
let connectedUsers = new Map();

// event fired every time a new client connects
server.on('connection', socket => {
  console.info(`Client connected [id=${socket.id}]`);
  connectedClients.set(socket.id, socket);
  console.log(connectedClients.size + ' client/s connected');

  // when socket disconnects, remove it from the map
  socket.on('disconnect', () => {
    connectedClients.delete(socket.id);
    console.info(`Client [id=${socket.id}] disconnected`);
    console.log(connectedClients.size + ' client/s connected');
  });

  socket.on('auth', payload => {
    // console.log(`auth token: ${payload.username} ${payload.token} ${socket.id}`);
    for (let [key, client] of connectedClients) {
      // connectedUsers.set(socket.id, payload);
    }
  });

  socket.on('chat', payload => {
    sendMessageToAllOtherClients(socket, payload);
  });
});

function sendMessageToAllOtherClients(sender, message) {
  if (!connectedUsers.get(sender.id)) {
    connectedUsers.set(sender.id, { username: message.username});
  }
  console.log(connectedUsers);
  
  const userId = connectedUsers.get(sender.id)?.username || sender.id;
  for (let [key, socket] of connectedClients) {
    socket.emit('message-from-server', { userId: userId, message: message.text });
  }
}
