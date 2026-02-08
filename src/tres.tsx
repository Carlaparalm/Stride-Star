
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserAccount } from '../types';
import AccountSwitcher from './AccountSwitcher';

interface LayoutProps {
  children: React.ReactNode;
  currentUser: UserAccount | null;
  allAccounts: UserAccount[];
  onSwitchAccount: (id: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentUser, allAccounts, onSwitchAccount }) => {
  const [showSwitcher, setShowSwitcher] = useState(false);
  const navigate = useNavigate();

  if (!currentUser) return <>{children}</>;

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-2xl overflow-hidden relative">
      {/* Header */}
      <header className="p-4 bg-white border-b flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="text-xl font-extrabold text-indigo-900 tracking-tight">StrideStar</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <i className="fa-solid fa-star"></i>
            {currentUser.stars}
          </div>
          <button 
            onClick={() => setShowSwitcher(true)}
            className="focus:outline-none active:scale-90 transition-transform"
          >
            <img 
              src={currentUser.avatar} 
              className="w-8 h-8 rounded-full border-2 border-indigo-200" 
              alt="profile" 
            />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar bg-slate-50">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="h-16 bg-white border-t flex items-center justify-around px-2 z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 p-2 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
          <i className="fa-solid fa-house-chimney text-xl"></i>
          <span className="text-[10px] font-bold uppercase">Inicio</span>
        </NavLink>
        <NavLink to="/explore" className={({ isActive }) => `flex flex-col items-center gap-1 p-2 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
          <i className="fa-solid fa-map-location-dot text-xl"></i>
          <span className="text-[10px] font-bold uppercase">Explorar</span>
        </NavLink>
        <div className="relative -mt-8">
           <NavLink to="/create" className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white">
            <i className="fa-solid fa-plus text-xl"></i>
          </NavLink>
        </div>
        <NavLink to="/social" className={({ isActive }) => `flex flex-col items-center gap-1 p-2 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
          <i className="fa-solid fa-user-group text-xl"></i>
          <span className="text-[10px] font-bold uppercase">Social</span>
        </NavLink>
        <NavLink to="/stats" className={({ isActive }) => `flex flex-col items-center gap-1 p-2 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
          <i className="fa-solid fa-chart-line text-xl"></i>
          <span className="text-[10px] font-bold uppercase">Logros</span>
        </NavLink>
      </nav>

      {showSwitcher && (
        <AccountSwitcher 
          accounts={allAccounts}
          currentId={currentUser.id}
          onSwitch={onSwitchAccount}
          onClose={() => setShowSwitcher(false)}
          onAddAccount={() => navigate('/login')}
        />
      )}
    </div>
  );
};

export default Layout;
