import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Register: React.FC = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await register(name, email, password);
            navigate('/');
        } catch (err: any) {
            console.error(err);
            let msg = 'Erro ao criar conta.';
            if (err.code === 'auth/email-already-in-use') {
                msg = 'Este email já está sendo utilizado.';
            } else if (err.code === 'auth/weak-password') {
                msg = 'A senha é muito fraca (mínimo 6 caracteres).';
            }
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
            <img src="https://i.imgur.com/v8tT9oD.png" alt="Mobibi" className="h-16" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Crie sua conta Mobibi
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Já tem uma conta? <Link to="/login" className="font-medium text-brand hover:text-brand-dark">Faça login</Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleRegister}>
             <div>
              <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm" placeholder="Mínimo 6 caracteres" />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand disabled:opacity-50"
              >
                {isLoading ? 'Cadastrando...' : 'Cadastrar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};