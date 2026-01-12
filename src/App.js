import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { OrganizationSettings } from './components/OrganizationSettings';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import './App.css';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  return token && role === 'admin' ? children : <Navigate to="/" />;
}

function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route 
                path="/" 
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/admin/settings" 
                element={
                  <AdminRoute>
                    <OrganizationSettings />
                  </AdminRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </SettingsProvider>
  );
}

export default App;