const { assert } = require('chai');

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
    clientSocket.emit('getPeople');
    clientSocket.on('receiveAllPeople', () => {
      clientSocket.off('receiveAllPeople');
      done();
    });
  });

  it('should accept added people', (done) => {
    const people = [
      { name: 'test 0', age: 0 },
      { name: 'test 1', age: 1 },
      { name: 'test 2', age: 2 },
      { name: 'test 3', age: 3 },
      { name: 'test 4', age: 4 },
    ];

    people.forEach((person) => clientSocket.emit('addPerson', person));

    clientSocket.emit('getPeople');
    clientSocket.on('receiveAllPeople',
      (data) => {
        clientSocket.off('receiveAllPeople');
        assert.deepEqual(data, people);
        done();
      });
  });
});
