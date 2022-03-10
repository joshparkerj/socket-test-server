const { io: Client } = require('socket.io-client');
const getServerStarter = require('../index');

describe('first test', () => {
  let closeServer;
  let clientSocket;

  before((done) => {
    closeServer = getServerStarter()(8082, () => {
      clientSocket = new Client('http://localhost:8082');
      clientSocket.on('connect', done);
    });
  });

  after(() => {
    closeServer();
    clientSocket.close();
  });

  it('should respond', (done) => {
    clientSocket.emit('addPerson', { name: 'test', age: 0 });
    clientSocket.emit('getPeople');
    clientSocket.on('receiveAllPeople', () => done());
  });
});
