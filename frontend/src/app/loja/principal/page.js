'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { request } from '../../../../lib/api';
import { getUser, logout } from '../../../services/auth';

export default function MainPage() {
    const router = useRouter();
    const [message, setMessage] = useState('');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [userName, setUserName] = useState('');

    // Estados para os filtros
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // Carrega produtos aplicando os filtros na URL (Query Params)
    const loadProducts = async (searchTerm = '', categoryId = '') => {
        try {
            let url = '/products?';
            const params = new URLSearchParams();
            
            if (searchTerm) params.append('search', searchTerm);
            if (categoryId) params.append('category_id', categoryId);
            
            const response = await request(url + params.toString());
            setProducts(response?.data || []);
        } catch (error) {
            setMessage(error.message || 'Falha ao carregar produtos.');
        }
    };

    // Carrega a lista de categorias para preencher o SELECT do filtro
    const loadCategories = async () => {
        try {
            const response = await request('/categories');
            setCategories(response?.data || []);
        } catch (error) {
            console.error('Erro ao carregar categorias:', error);
        }
    };

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

        // Carga inicial dos dados
        loadCategories();
        loadProducts();
    }, []);

    // Escuta mudanças nos filtros e dispara a busca no banco de dados
    const handleFilterChange = (searchTerm, categoryId) => {
        setSearch(searchTerm);
        setSelectedCategory(categoryId);
        loadProducts(searchTerm, categoryId);
    };

    // Reseta todos os campos de busca de uma vez
    const handleClearFilters = () => {
        setSearch('');
        setSelectedCategory('');
        loadProducts('', '');
    };

    const addToCart = async (product) => {
        try {
            setMessage('');
            const user = getUser();
            
            if (!user || !user.id) {
                setMessage('Erro: Usuário não identificado ou ID ausente no login.');
                return;
            }

            await request('/cart_items', {
                method: 'POST',
                body: JSON.stringify({
                    user_id: Number(user.id),
                    product_id: Number(product.id),
                    quantity: 1
                })
            });

            alert(`"${product.name}" adicionado ao carrinho com sucesso!`);
        } catch (error) {
            alert(error.message || 'Falha ao adicionar item ao carrinho.');
        }
    };

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
                        <ul className="navbar-nav ms-auto align-items-center">
                            <li className="nav-item me-3">
                                <Link href="/loja/pedidos" className="nav-link d-flex align-items-center gap-1">
                                    <i className="bi bi-journal-text"></i> Meus Pedidos
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a 
                                    className="nav-link text-danger fw-semibold" 
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        logout();
                                        router.push('./login');
                                    }}
                                >
                                    <i className="bi bi-door-open me-1"></i>Sair
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* CONTEÚDO PRINCIPAL */}
            <main className="container py-5">
                
                {/* SEÇÃO DE FILTROS DINÂMICOS */}
                <div className="card border-0 shadow-sm rounded-3 p-4 mb-5 bg-light">
                    <div className="row g-3 align-items-end">
                        <div className="col-12 col-md-5">
                            <label className="form-label text-muted small fw-bold">Buscar Produto</label>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0 text-muted">
                                    <i className="bi bi-search"></i>
                                </span>
                                <input 
                                    type="text" 
                                    className="form-control border-start-0" 
                                    placeholder="Digite o nome do produto..."
                                    value={search}
                                    onChange={(e) => handleFilterChange(e.target.value, selectedCategory)}
                                />
                            </div>
                        </div>
                        
                        <div className="col-12 col-md-4">
                            <label className="form-label text-muted small fw-bold">Filtrar por Categoria</label>
                            <select 
                                className="form-select"
                                value={selectedCategory}
                                onChange={(e) => handleFilterChange(search, e.target.value)}
                            >
                                <option value="">Todas as categorias</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-12 col-md-3">
                            {(search || selectedCategory) && (
                                <button 
                                    className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2 rounded-3"
                                    type="button"
                                    onClick={handleClearFilters}
                                >
                                    <i className="bi bi-x-circle"></i> Limpar Filtros
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <h2 className="fw-bold text-dark mb-4 text-center text-sm-start">
                    Nossos Produtos
                </h2>

                {/* Feedback para o usuário */}
                {message && (
                  <div className="alert alert-primary alert-dismissible fade show border-0 shadow-sm rounded-3 mb-4" role="alert">
                     <i className="bi bi-info-circle-fill me-2"></i>{message}
                     <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
                  </div>
                )}

                {/* GRID DE PRODUTOS */}
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

                                    {/* AVISO DE ÚLTIMAS UNIDADES */}
                                    {item.stock > 0 && item.stock < 10 ? (
                                        <div className="text-danger small fw-bold mb-3 d-flex align-items-center gap-1">
                                            <i className="bi bi-exclamation-triangle-fill"></i> Últimas unidades!
                                        </div>
                                    ) : (
                                        <div className="mb-3" style={{ height: '19.5px' }}></div>
                                    )}
                                    
                                    <div className="mt-auto pt-2 d-flex align-items-center justify-content-between">
                                        <span className="fs-5 fw-bold text-dark">
                                            R$ {Number(item.price).toFixed(2)}
                                        </span>
                                        <button 
                                            className="btn btn-primary btn-sm rounded-pill px-3 fw-bold d-inline-flex align-items-center gap-1"
                                            disabled={item.stock <= 0}
                                            onClick={() => addToCart(item)}
                                        >
                                            <i className="bi bi-cart-plus-fill"></i> Comprar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FEEDBACK CASO CORRESPONDÊNCIAS SEJAM ZERADAS */}
                {products.length === 0 && (
                    <div className="text-center py-5">
                        <i className="bi bi-emoji-neutral text-muted" style={{ fontSize: '3rem' }}></i>
                        <p className="text-muted mt-2">Nenhum produto encontrado para os filtros selecionados.</p>
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
                onClick={() => router.push('/loja/carrinho')}
                title="Carrinho de Compras"
            >
                <i className="bi bi-cart-fill fs-4 text-white"></i>
            </button>
        </>
    );
}