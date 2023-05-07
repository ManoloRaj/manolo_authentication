import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import AuthGuard from './helpers/AuthGuard';

function App() {
  return (
    <div className="App">
      <Router baseName="">
        <Routes>
          <Route path="" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/homepage" element={<AuthGuard children={<HomePage />} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
