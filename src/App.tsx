import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from './router/MainRouter';
function App() {
  return (
        <Router>
            <div className='App'>
              <MainRouter />
            </div>
        </Router>
  );
}

export default App;
