
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAccount } from '../types';

interface LoginProps {
  onLogin: (user: UserAccount) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    const newUser: UserAccount = {
      id: Math.random().toString(36).substr(2, 9),
      name: name || (isLogin ? 'Usuario Demo' : 'Nueva Atleta'),
      email: email || 'demo@stridestar.com',
      avatar: `https://picsum.photos/seed/${name || 'random'}/100/100`,
      stars: 0,
      level: 1
    };
    onLogin(newUser);
    navigate('/');
  };

  return (
    <div className="min-h-full flex flex-col p-6 bg-slate-50 items-center justify-center animate-in fade-in duration-700">
      <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-4xl font-black mb-8 shadow-2xl shadow-indigo-200">
        S
      </div>
      
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">StrideStar</h1>
        <p className="text-slate-500 text-sm mt-2">Camina, corre, conquista la ciudad.</p>
      </div>

      <div className="w-full bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-8">
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${!isLogin ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
          >
            REGISTRO
          </button>
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${isLogin ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
          >
            ACCESO
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 ml-1">Nombre Completo</label>
              <input 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text" 
                className="w-full p-4 bg-slate-50 rounded-2xl text-sm border-2 border-transparent focus:border-indigo-100 outline-none transition-all" 
                placeholder="Álex Martínez"
              />
            </div>
          )}
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 ml-1">Email</label>
            <input 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email" 
              className="w-full p-4 bg-slate-50 rounded-2xl text-sm border-2 border-transparent focus:border-indigo-100 outline-none transition-all" 
              placeholder="hola@ejemplo.com"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 ml-1">Contraseña</label>
            <input 
              required
              type="password" 
              className="w-full p-4 bg-slate-50 rounded-2xl text-sm border-2 border-transparent focus:border-indigo-100 outline-none transition-all" 
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest mt-4 shadow-lg shadow-indigo-100 active:scale-95 transition-all">
            {isLogin ? 'Entrar' : 'Empezar Aventura'}
          </button>
        </form>
      </div>

      <p className="text-[10px] text-slate-400 mt-8 text-center px-8 uppercase font-bold tracking-widest leading-relaxed">
        Al continuar, aceptas nuestros términos de servicio y política de privacidad.
      </p>
    </div>
  );
};

export default Login;
