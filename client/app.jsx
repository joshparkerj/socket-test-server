import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App1 from './app1';
import App2 from './app2';

const App = function App() {
  const [whichApp, setWhichApp] = useState(1);

  return (
    <div className="app">
      <h1>app</h1>
      <button id="toggle-button" type="button" onClick={() => setWhichApp((whichApp % 2) + 1)}>
        toggle app
      </button>
      {whichApp === 1 ? <App1 /> : <App2 />}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('react-app-area'));
