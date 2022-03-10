const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const socketDebug = require('debug')('socket');

const getServerStarter = function getServerStarter() {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);
  const people = [];

  io.on('connection', (socket) => {
    socketDebug('a user connected');

    socket.on('addPerson', ({ name, age }) => {
      socketDebug('addPerson', name, age);
      people.push({
        name,
        age,
      });

      socket.broadcast.emit('trigger', {});
    });

    socket.on('getPeople', () => {
      socketDebug('getPeople', people.length);
      socket.emit('receiveAllPeople', people);
    });

    socket.on('disconnect', () => {
      socketDebug('a user disconnected');
    });
  });

  app.use(express.static('./public'));

  return (port, callback) => {
    server.listen(port, callback);
    return () => {
      server.close();
    };
  };
};

module.exports = getServerStarter;
