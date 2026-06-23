'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { request } from '../../../../lib/api';
import { getUser } from '../../../services/auth';

export default function OrdersPage() {
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState(null);

    const loadOrders = async (id) => {
        try {
            const response = await request(`/orders/user/${id}`);
            setOrders(response?.data || []);
        } catch (error) {
            setMessage(error.message || 'Erro ao carregar histórico de pedidos.');
        }
    };

    useEffect(() => {
        const user = getUser();
        if (!user) {
            router.push('/loja/login');
            return;
        }
        setUserId(user.id);
        loadOrders(user.id);
    }, []);

    const getStatusBadge = (statusNum) => {
        const status = Number(statusNum);
        switch (status) {
            case 1:
                return <span className="badge bg-warning text-dark rounded-pill px-3 py-2"><i className="bi bi-clock-history me-1"></i> Pendente</span>;
            case 2:
                return <span className="badge bg-info text-dark rounded-pill px-3 py-2"><i className="bi bi-truck me-1"></i> Enviado</span>;
            case 3:
                return <span className="badge bg-success text-white rounded-pill px-3 py-2"><i className="bi bi-check-circle-fill me-1"></i> Entregue</span>;
            case 4:
                return <span className="badge bg-danger text-white rounded-pill px-3 py-2"><i className="bi bi-x-circle-fill me-1"></i> Cancelado</span>;
            default:
                return <span className="badge bg-secondary text-white rounded-pill px-3 py-2">Desconhecido</span>;
        }
    };

    const handleViewDetails = async (orderId) => {
        try {
            const response = await request(`/orders/${orderId}`);
            setSelectedOrder(response?.data || null);
        } catch (error) {
            alert(error.message || 'Erro ao buscar itens do pedido.');
        }
    };

    const handleCancelOrder = async (orderId) => {
        if (!confirm('Tem certeza de que deseja cancelar este pedido? O estoque dos produtos será devolvido.')) return;

        try {
            await request(`/orders/${orderId}`, { method: 'DELETE' });
            setMessage('Pedido cancelado com sucesso!');
            
            if (selectedOrder?.id === orderId) setSelectedOrder(null);
            loadOrders(userId);
        } catch (error) {
            setMessage(error.message || 'Erro ao cancelar pedido.');
        }
    };

    const calculateOrderTotal = (items) => {
        if (!items) return 0;
        return items.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
                <div className="container">
                    <Link href="/loja/principal" className="btn btn-outline-light btn-sm d-flex align-items-center gap-2">
                        <i className="bi bi-house-door-fill"></i> Voltar para a Loja
                    </Link>
                    <span className="navbar-brand fw-bold text-primary m-0 mx-auto">
                        Meus Pedidos
                    </span>
                </div>
            </nav>

            <main className="container py-5">
                {message && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        {message}
                        <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
                    </div>
                )}

                <div className="row g-4">
                    <div className={selectedOrder ? "col-lg-7" : "col-12"}>
                        <div className="card border-0 shadow-sm rounded-3 p-4">
                            <h5 className="fw-bold text-dark mb-4"><i className="bi bi-receipt me-2 text-primary"></i>Histórico de Compras</h5>
                            
                            {orders.length === 0 ? (
                                <div className="text-center py-5">
                                    <i className="bi bi-emoji-neutral text-muted fs-1"></i>
                                    <p className="text-muted mt-2">Você ainda não realizou nenhuma compra.</p>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle">
                                        <thead>
                                            <tr className="text-muted small text-uppercase">
                                                <th>Nº Pedido</th>
                                                <th>Data</th>
                                                <th className="text-center">Status</th>
                                                <th className="text-center">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map(order => (
                                                <tr key={order.id} className={selectedOrder?.id === order.id ? "table-primary" : ""}>
                                                    <td className="fw-bold text-dark">#{order.id}</td>
                                                    <td className="text-muted">
                                                        {new Date(order.order_date).toLocaleDateString('pt-BR')}
                                                    </td>
                                                    <td className="text-center">
                                                        {getStatusBadge(order.status)}
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="d-inline-flex gap-2">
                                                            <button 
                                                                className="btn btn-primary btn-sm rounded-pill px-3"
                                                                onClick={() => handleViewDetails(order.id)}
                                                            >
                                                                Ver Itens
                                                            </button>
                                                            {Number(order.status) === 1 && (
                                                                <button 
                                                                    className="btn btn-outline-danger btn-sm rounded-circle"
                                                                    onClick={() => handleCancelOrder(order.id)}
                                                                    title="Cancelar pedido"
                                                                >
                                                                    <i className="bi bi-x-lg"></i>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                    {selectedOrder && (
                        <div className="col-lg-5">
                            <div className="card border-0 shadow-sm rounded-3 p-4 bg-light position-sticky" style={{ top: '20px' }}>
                                <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                                    <h5 className="fw-bold text-dark m-0">Itens do Pedido #{selectedOrder.id}</h5>
                                    <button type="button" className="btn-close" onClick={() => setSelectedOrder(null)}></button>
                                </div>

                                <div className="list-group list-group-flush mb-4 bg-transparent">
                                    {selectedOrder.items?.map(item => (
                                        <div key={item.id} className="list-group-item d-flex justify-content-between align-items-start px-0 bg-transparent border-0 mb-2">
                                            <div className="me-auto">
                                                <div className="fw-bold text-dark">{item.name || `Produto #${item.product_id}`}</div>
                                                <small className="text-muted">Qtd: {item.quantity} x R$ {Number(item.price).toFixed(2)}</small>
                                            </div>
                                            <span className="fw-bold text-dark">
                                                R$ {(Number(item.price) * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="d-flex justify-content-between align-items-center border-top pt-3">
                                    <span className="fs-5 fw-bold text-dark">Valor Pago:</span>
                                    <span className="fs-4 fw-bold text-primary">
                                        R$ {calculateOrderTotal(selectedOrder.items).toFixed(2)}
                                    </span>
                                </div>

                                {Number(selectedOrder.status) === 1 && (
                                    <button 
                                        className="btn btn-danger w-100 rounded-pill mt-4 fw-bold shadow-sm"
                                        onClick={() => handleCancelOrder(selectedOrder.id)}
                                    >
                                        <i className="bi bi-trash3-fill me-2"></i> Cancelar Pedido Total
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}