'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { request } from '../../../../lib/api';
import { getUser, logout } from '../../../services/auth';

export default function MainPage() {
    const router = useRouter();
    const [message, setMessage] = useState('')
    const [products, setProducts] = useState([])
    const [userName, setUserName] = useState('')

    const load = async () => {
        try {
            const response = await request('/products')
            setProducts(response?.data || [])
            setMessage('Dados carregados com sucesso.')
        } catch (error) {
            setMessage(error.message || 'Falha ao carregar dados.')
        }
    }

    useEffect(() => {
        const user = getUser();

        if (!user) {
            router.push('./login');
            return;
        }

        if (Number(user.user_type) !== 2) {
            router.push('/');
            return;
        }

        if (user.name) {
            setUserName(user.name);
        }

        load();
    }, []);


    return (
        <>
            {/* BARRA DE NAVEGAÇÃO */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
                <div className="container d-flex align-items-center">
                    <a className="navbar-brand fw-bold text-light z-1" href="#">
                        <i className="bi bi-person me-2"></i>Olá, {userName || 'Cliente'}!
                    </a>
                    <div className="position-absolute start-50 translate-middle-x">
                        <a className="navbar-brand fw-bold text-primary m-0">
                            <i className="bi bi-basket me-2"></i>LOJAS LATINAS
                        </a>
                    </div>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a 
                                    className="nav-link" 
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        logout();
                                        router.push('./login');
                                    }}
                                >
                                    <i className="bi bi-door-open me-2"></i>Sair
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* CONTEÚDO PRINCIPAL (GRID DE PRODUTOS) */}
            <main className="container py-5">
                <h2 className="fw-bold text-dark mb-4 text-center text-sm-start">
                    Nossos Produtos
                </h2>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {products.map(item => (
                        <div className="col" key={item.id}>
                            <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden">
                                <div className="bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center" style={{ height: '180px' }}>
                                    <i className="bi bi-box-seam text-secondary text-opacity-50" style={{ fontSize: '3rem' }}></i>
                                </div>
                                
                                <div className="card-body d-flex flex-column p-4">
                                    <span className="badge bg-light text-secondary rounded-pill align-self-start mb-2 small px-3">
                                        {item.category_name || `Cat: ${item.category_id}`}
                                    </span>
                                    <h5 className="card-title fw-bold text-dark mb-1">{item.name}</h5>
                                    
                                    <p className="card-text text-muted small mb-1">
                                        Disponível: {item.stock > 0 ? `${item.stock} un` : 'Esgotado'}
                                    </p>

                                    {/* AVISO DE ÚLTIMAS UNIDADES: Aparece se o estoque for maior que 0 e menor que 10 */}
                                    {item.stock > 0 && item.stock < 10 ? (
                                        <div className="text-danger small fw-bold mb-3 d-flex align-items-center gap-1">
                                            <i className="bi bi-exclamation-triangle-fill"></i> Últimas unidades!
                                        </div>
                                    ) : (
                                        // Mantém o espaçamento igual nos cards que não têm o aviso
                                        <div className="mb-3" style={{ height: '19.5px' }}></div>
                                    )}
                                    
                                    <div className="mt-auto pt-2 d-flex align-items-center justify-content-between">
                                        <span className="fs-5 fw-bold text-dark">
                                            R$ {Number(item.price).toFixed(2)}
                                        </span>
                                        <button 
                                            className="btn btn-primary btn-sm rounded-pill px-3 fw-bold d-inline-flex align-items-center gap-1"
                                            disabled={item.stock <= 0}
                                            onClick={() => alert(`Adicionando ${item.name} ao carrinho`)}
                                        >
                                            <i className="bi bi-cart-plus-fill"></i> Comprar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="text-center py-5">
                        <i className="bi bi-emoji-neutral text-muted" style={{ fontSize: '3rem' }}></i>
                        <p className="text-muted mt-2">Nenhum produto disponível no momento.</p>
                    </div>
                )}
            </main>

            {/* BOTÃO FLUTUANTE DO CARRINHO */}
            <button 
                className="btn btn-primary position-fixed shadow-lg d-flex align-items-center justify-content-center rounded-circle"
                style={{ 
                    bottom: '30px', 
                    right: '30px', 
                    width: '60px', 
                    height: '60px', 
                    zIndex: 1050 
                }}
                onClick={() => alert('Carrinho em desenvolvimento!')}
                title="Carrinho de Compras"
            >
                <i className="bi bi-cart-fill fs-4 text-white"></i>
            </button>
        </>
    );
}