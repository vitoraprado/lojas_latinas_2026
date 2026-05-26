// frontend/src/app/(sua-rota-de-login)/page.js
'use client'; // Necessário para gerenciar o estado do formulário (React Hooks)

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Aqui no futuro você vai conectar com a sua API Node.js usando o Axios ou Fetch
    console.log('Dados de login enviados:', { email, senha });
    alert(`Tentando logar com: ${email}`);
  };

  return (
    <div className="container">
      {/* Centraliza o card verticalmente e horizontalmente na tela */}
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          
          {/* Card de Login */}
          <div className="card shadow border-0 rounded-3">
            <div className="card-body p-4 p-sm-5">
              
              {/* Título e Logo */}
              <div className="text-center mb-4">
                <i className="bi bi-person-fill" style={{ fontSize: '3rem', color: "blue" }}></i>
                <h3 className="fw-bold text-dark">Acesso - Usuários</h3>
                <p className="text-muted small">Insira seus dados</p>
              </div>

              {/* Formulário */}
              <form onSubmit={handleLogin}>
                
                {/* Campo de E-mail */}
                <div className="form-floating mb-3">
                  <input 
                    type="email" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="nome@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="floatingInput">Endereço de e-mail</label>
                </div>

                {/* Campo de Senha */}
                <div className="form-floating mb-3">
                  <input 
                    type="password" 
                    className="form-control" 
                    id="floatingPassword" 
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                  <label htmlFor="floatingPassword">Senha</label>
                </div>

                {/* Esqueci a senha */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <a href="#" className="text-decoration-none small">Esqueceu a senha?</a>
                </div>

                {/* Botão de Entrar */}
                <button className="btn btn-primary btn-lg w-100 fw-bold mb-3" type="submit">
                  <i className="bi bi-box-arrow-in-right me-2"></i>Entrar
                </button>

                {/* Link para cadastro */}
                <div className="text-center">
                  <p className="text-muted small mb-0">
                    Não tem uma conta? <a href="#" className="text-decoration-none fw-bold">Cadastre-se</a>
                  </p>
                </div>

                {/* Voltar para o início */}
                <div className="text-center">
                    <Link href="/" className="text-decoration-none fw-bold small mb-0">Voltar</Link>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}