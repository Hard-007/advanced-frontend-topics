import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useFirebase } from '../../hooks/useFirebase';

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    
    // Use the Firebase hook
    const { loading, error, sendPasswordResetEmail } = useFirebase();

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage('');
        
        const success = await sendPasswordResetEmail(email);
        if (success) {
            setSuccessMessage('Email de recuperação enviado. Verifique sua caixa de entrada.');
            setEmail('');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Recuperar Senha</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Insira seu email e enviaremos instruções para redefinir sua senha
                    </p>
                </div>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{successMessage}</span>
                    </div>
                )}
                
                <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
                    <div className="rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {loading ? 'Enviando...' : 'Enviar instruções'}
                        </button>
                    </div>
                </form>
                
                <div className="text-sm text-center">
                    <a 
                        href="/login"
                        className="font-medium text-blue-600 hover:text-blue-500"
                    >
                        Voltar para o login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;