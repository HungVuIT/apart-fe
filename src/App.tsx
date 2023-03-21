import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from './router/MainRouter';
import 'react-toastify/dist/ReactToastify.css';
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
