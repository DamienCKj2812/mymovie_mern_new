import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Login from './Login.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
      <Routes>
        <Route path='/' element={<Login />}/> 
        <Route path='/App' element={<App />}/> 
      </Routes>
    </React.StrictMode>
  </Router>
);

