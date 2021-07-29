import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import serverAddress from './server-address.json';

const App2 = function App2() {
  const [dataSet, setDataSet] = useState([]);

  useEffect(() => {
    const socket = io(serverAddress);
    socket.on('connect', () => {
      socket.emit('getPeople');
    });

    socket.on('receiveAllPeople', (data) => {
      setDataSet(data);
    });

    socket.on('trigger', () => {
      socket.emit('getPeople');
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="app-2">
      <h2>Hi, this is app 2!</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>age</th>
          </tr>
        </thead>
        <tbody>
          {dataSet.map((e) => (
            <tr>
              <td>{e.name}</td>
              <td>{e.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App2;
