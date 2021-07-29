import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

import serverAddress from './server-address.json';

const App1 = function App1() {
  const [dataSet, setDataSet] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const socket = useRef();

  useEffect(() => {
    socket.current = io(serverAddress);

    return () => socket.current.close();
  }, []);

  const handleAgeChange = function handleAgeChange({ target }) {
    setAge(target.value);
  };

  const handleNameChange = function handleNameChange({ target }) {
    setName(target.value);
  };

  const handleSubmit = function handleSubmit(event) {
    const person = { name, age };
    setDataSet((old) => [...old, person]);
    socket.current.emit('addPerson', person);
    event.preventDefault();
  };

  return (
    <div className="app-1">
      <h2>Hello, there! Welcome to app one!</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={handleNameChange} />
        <input type="number" value={age} onChange={handleAgeChange} />
        <input type="submit" />
      </form>
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

export default App1;
