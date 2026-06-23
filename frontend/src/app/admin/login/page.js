'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(
      'http://127.0.0.1:8000/api/users/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password: senha,
          user_type: 1, // 1 para funcionários
        })
      }
    );

    console.log('Resposta do login:', response);
    
    if (response.ok) {
      const result = await response.json();
      localStorage.setItem('user', JSON.stringify(result.data));
      router.push('dashboard');
    } else {
      const error = await response.json();
      alert(error.message || 'Usuário ou senha inválidos');
      return;
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          
          <div className="card shadow border-0 rounded-3">
            <div className="card-body p-4 p-sm-5">
              
              <div className="text-center mb-4">
                <i className="bi bi-person-vcard" style={{ fontSize: '3rem', color: "blue" }}></i>
                <h3 className="fw-bold text-dark">Acesso - Funcionários</h3>
                <p className="text-muted small">Insira seus dados</p>
              </div>

              <form onSubmit={handleLogin}>
                
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

                {/*<div className="d-flex justify-content-between align-items-center mb-4">
                  <a href="#" className="text-decoration-none small">Esqueceu a senha?</a>
                </div>*/}

                <button className="btn btn-primary btn-lg w-100 fw-bold mb-3" type="submit">
                  <i className="bi bi-box-arrow-in-right me-2"></i>Entrar
                </button>

                <div className="text-center">
                  <p className="text-muted small mb-0">
                    Não tem uma conta? <a href="#" className="text-decoration-none fw-bold">Cadastre-se</a>
                  </p>
                </div>

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