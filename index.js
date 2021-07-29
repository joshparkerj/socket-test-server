const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const people = [];

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('addPerson', ({ name, age }) => {
    console.log('addPerson', name, age);
    people.push({
      name,
      age,
    });

    socket.broadcast.emit('trigger', {});
  });

  socket.on('getPeople', () => {
    console.log('getPeople', people.length);
    socket.emit('receiveAllPeople', people);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

app.use(express.static('./public'));

server.listen(8082, () => {
  console.log('listening on 8082');
});
