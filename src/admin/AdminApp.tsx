import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { Login } from './Login';
import { AdminPizze } from './AdminPizze';
import { AdminIngredienti } from './AdminIngredienti';

export function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('admin_auth_token');
  });

  if (!isAuthenticated) {
    return <Login onLogin={() => {
      setIsAuthenticated(true);
    }} />;
  }

  return (
    <AdminLayout onLogout={() => {
      setIsAuthenticated(false);
      localStorage.removeItem('admin_auth_token');
    }}>
      <Routes>
        <Route path="/" element={<Navigate to="pizze" replace />} />
        <Route path="pizze" element={<AdminPizze />} />
        <Route path="ingredienti" element={<AdminIngredienti />} />
      </Routes>
    </AdminLayout>
  );
}
