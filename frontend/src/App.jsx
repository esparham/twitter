import React  from 'react';
import Router from './components/router/router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

function App() {
  

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
