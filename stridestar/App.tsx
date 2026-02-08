
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import CreateRoute from './pages/CreateRoute';
import Social from './pages/Social';
import Login from './pages/Login';
import { UserAccount } from './types';

const App: React.FC = () => {
  const [accounts, setAccounts] = useState<UserAccount[]>([
    {
      id: 'default_alex',
      name: 'Álex Martínez',
      email: 'alex@stridestar.com',
      avatar: 'https://picsum.photos/seed/user/100/100',
      stars: 124,
      level: 4
    }
  ]);
  const [currentUserId, setCurrentUserId] = useState<string>('default_alex');

  const currentUser = accounts.find(a => a.id === currentUserId) || null;

  const handleLogin = (newUser: UserAccount) => {
    setAccounts(prev => {
      // Avoid duplicate accounts if switching back
      const exists = prev.find(a => a.email === newUser.email);
      if (exists) {
        setCurrentUserId(exists.id);
        return prev;
      }
      setCurrentUserId(newUser.id);
      return [...prev, newUser];
    });
  };

  const switchAccount = (id: string) => {
    setCurrentUserId(id);
  };

  return (
    <HashRouter>
      <Layout 
        currentUser={currentUser} 
        allAccounts={accounts} 
        onSwitchAccount={switchAccount}
      >
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          
          <Route 
            path="/" 
            element={currentUser ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/explore" 
            element={currentUser ? <Explore /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/create" 
            element={currentUser ? <CreateRoute /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/social" 
            element={currentUser ? <Social /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/stats" 
            element={currentUser ? <div className="p-4"><h2 className="text-2xl font-black">Logros de {currentUser.name}</h2><p className="text-slate-500 mt-2">Tus medallas aparecerán aquí pronto.</p></div> : <Navigate to="/login" />} 
          />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
