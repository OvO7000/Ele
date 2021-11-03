import React from 'react';
import Alert from './components/Alert';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Alert
            title='title'
            desc='descd'
          />
      </header>
    </div>
  );
}

export default App;
