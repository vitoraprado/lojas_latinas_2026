'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getUser, logout } from '../../../services/auth';

export default function MainPage() {
    const router = useRouter();
    const [message, setMessage] = useState('')

    const load = async () => {
        try {
        //setCategories(await request('/categories'))
        //setProducts(await request('/products'))
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

        load();
    }, []);


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
                <div className="container">
                    <a className="navbar-brand fw-bold text-primary">
                        <i className="bi bi-basket me-2" href="#"></i>LOJAS LATINAS
                    </a>
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
        </>
    );
}