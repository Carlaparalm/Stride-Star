
import React from 'react';
import { UserAccount } from '../types';
import { useNavigate } from 'react-router-dom';

interface AccountSwitcherProps {
  accounts: UserAccount[];
  currentId: string;
  onSwitch: (id: string) => void;
  onClose: () => void;
  onAddAccount: () => void;
}

const AccountSwitcher: React.FC<AccountSwitcherProps> = ({ accounts, currentId, onSwitch, onClose, onAddAccount }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}>
      <div 
        className="w-full max-w-md bg-white rounded-t-[32px] p-6 pb-12 shadow-2xl animate-in slide-in-from-bottom-full duration-500 fill-mode-forwards"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6"></div>
        
        <h3 className="text-xl font-extrabold text-slate-800 mb-6 px-2">Cuentas</h3>
        
        <div className="space-y-2 mb-6 max-h-[40vh] overflow-y-auto no-scrollbar">
          {accounts.map(account => (
            <button
              key={account.id}
              onClick={() => { onSwitch(account.id); onClose(); }}
              className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all ${
                currentId === account.id ? 'bg-indigo-50 border-2 border-indigo-100' : 'hover:bg-slate-50 border-2 border-transparent'
              }`}
            >
              <div className="flex items-center gap-4">
                <img src={account.avatar} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt={account.name} />
                <div className="text-left">
                  <p className="font-bold text-slate-800">{account.name}</p>
                  <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">{account.stars} estrellas</p>
                </div>
              </div>
              {currentId === account.id && (
                <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                  <i className="fa-solid fa-check text-xs"></i>
                </div>
              )}
            </button>
          ))}
        </div>

        <button 
          onClick={() => { onAddAccount(); onClose(); }}
          className="w-full flex items-center gap-4 p-3 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all font-bold"
        >
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300">
            <i className="fa-solid fa-plus text-slate-400"></i>
          </div>
          <span>Añadir nueva cuenta</span>
        </button>
      </div>
    </div>
  );
};

export default AccountSwitcher;
