import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { AuthProvider } from './provider/AuthProvider';
import PrivateRoute from './provider/PrivateRoute';
import PublicRoute from './provider/PublicRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <PrivateRoute><Home /></PrivateRoute> } />
          <Route path="/login" element={ <PublicRoute><Login /></PublicRoute> } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
