// frontend/src/App.tsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Chat from './components/Chat'; // Adjust the path as per your project structure
import Register from './components/Register'; // Adjust the path as per your project structure
import Login from './components/Login'; // Adjust the path as per your project structure

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setToken={setToken} setUserId={setUserId} />} />
        <Route path="/chat" element={token && userId ? <Chat token={token} userId={userId} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
