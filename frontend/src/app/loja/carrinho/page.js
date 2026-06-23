'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { request } from '../../../../lib/api';
import { getUser } from '../../../services/auth';

export default function CartPage() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState([]);
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState(null);

    const loadCart = async (id) => {
        try {
            const response = await request(`/cart_items/user/${id}`);
            setCartItems(response?.data || []);
        } catch (error) {
            setMessage(error.message || 'Erro ao carregar o carrinho.');
        }
    };

    useEffect(() => {
        const user = getUser();
        if (!user) {
            router.push('/loja/login');
            return;
        }
        setUserId(user.id);
        loadCart(user.id);
    }, []);

    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);
    };

    const handleUpdateQuantity = async (item, newQuantity) => {
        if (newQuantity <= 0) {
            handleRemoveItem(item.id, true);
            return;
        }

        try {
            await request(`/cart_items/${item.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    user_id: userId,
                    product_id: item.product_id,
                    quantity: newQuantity
                })
            });
            
            setCartItems(prev => prev.map(i => i.id === item.id ? { ...i, quantity: newQuantity } : i));
        } catch (error) {
            setMessage(error.message || 'Erro ao atualizar a quantidade.');
        }
    };

    const handleRemoveItem = async (cartItemId, skipConfirm = false) => {
        if (!skipConfirm && !confirm('Deseja remover este item do carrinho?')) return;

        try {
            await request(`/cart_items/${cartItemId}`, { method: 'DELETE' });
            setMessage('Item removido com sucesso!');
            loadCart(userId);
        } catch (error) {
            setMessage(error.message || 'Erro ao remover item.');
        }
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) return;

        try {
            const payload = {
                user_id: userId,
                order_date: new Date().toISOString(),
                status: 1, // 1 - Pendente
                items: cartItems.map(item => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price: item.price
                }))
            };

            await request('/orders', {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            alert('Pedido realizado com sucesso!');
            router.push('/loja/pedidos');
        } catch (error) {
            setMessage(error.message || 'Erro ao finalizar pedido.');
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
                <div className="container">
                    <Link href="/loja/principal" className="btn btn-outline-light btn-sm d-flex align-items-center gap-2">
                        <i className="bi bi-arrow-left"></i> Voltar para a Loja
                    </Link>
                    <span className="navbar-brand fw-bold text-primary m-0 mx-auto">
                        Meu Carrinho
                    </span>
                </div>
            </nav>

            <main className="container py-5">
                {message && (
                    <div className="alert alert-info alert-dismissible fade show" role="alert">
                        {message}
                        <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
                    </div>
                )}

                {cartItems.length === 0 ? (
                    <div className="text-center py-5">
                        <i className="bi bi-cart-x text-muted" style={{ fontSize: '4rem' }}></i>
                        <h4 className="mt-3 text-muted">Seu carrinho está vazio</h4>
                        <Link href="/loja/principal" className="btn btn-primary mt-3 rounded-pill px-4">
                            Ir às compras
                        </Link>
                    </div>
                ) : (
                    <div className="row g-4">
                        {/* TABELA DE ITENS */}
                        <div className="col-lg-8">
                            <div className="card border-0 shadow-sm rounded-3 p-4">
                                <div className="table-responsive">
                                    <table className="table align-middle">
                                        <thead>
                                            <tr className="text-muted">
                                                <th>Produto</th>
                                                <th className="text-center" style={{ width: '140px' }}>Qtd</th>
                                                <th className="text-end">Preço</th>
                                                <th className="text-end">Subtotal</th>
                                                <th className="text-center">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map(item => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-3">
                                                            <div className="bg-light rounded p-2 text-secondary">
                                                                <i className="bi bi-box-seam fs-4"></i>
                                                            </div>
                                                            <span className="fw-bold text-dark">{item.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="text-center">
                                                        {/* SELETOR DE QUANTIDADE COMPACTO */}
                                                        <div className="input-group input-group-sm justify-content-center">
                                                            <button 
                                                                className="btn btn-outline-secondary px-2"
                                                                type="button"
                                                                onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                                                            >
                                                                <i className="bi bi-minus"></i>
                                                            </button>
                                                            <span className="input-group-text bg-white px-3 fw-bold text-dark">
                                                                {item.quantity}
                                                            </span>
                                                            <button 
                                                                className="btn btn-outline-secondary px-2"
                                                                type="button"
                                                                onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                                                            >
                                                                <i className="bi bi-plus"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="text-end text-dark">
                                                        R$ {Number(item.price).toFixed(2)}
                                                    </td>
                                                    <td className="text-end fw-bold text-dark">
                                                        R$ {(Number(item.price) * item.quantity).toFixed(2)}
                                                    </td>
                                                    <td className="text-center">
                                                        <button 
                                                            className="btn btn-outline-danger btn-sm border-0 rounded-circle"
                                                            onClick={() => handleRemoveItem(item.id)}
                                                            title="Remover produto"
                                                        >
                                                            <i className="bi bi-trash3-fill"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* CARD DE RESUMO FINANCEIRO */}
                        <div className="col-lg-4">
                            <div className="card border-0 shadow-sm rounded-3 p-4 bg-light">
                                <h5 className="fw-bold text-dark mb-4">Resumo do Pedido</h5>
                                <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
                                    <span className="text-muted">Subtotal de itens:</span>
                                    <span className="text-dark fw-semibold">{cartItems.length}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <span className="fs-5 fw-bold text-dark">Total:</span>
                                    <span className="fs-4 fw-bold text-primary">
                                        R$ {calculateTotal().toFixed(2)}
                                    </span>
                                </div>
                                <button 
                                    className="btn btn-primary w-100 rounded-pill py-2 fw-bold fs-5 shadow"
                                    onClick={handleCheckout}
                                >
                                    <i className="bi bi-credit-card-2-back-fill me-2"></i> Fechar Pedido
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}