'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function MainPage() {



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
                                <Link href="/painel/admin/login" className="nav-link">
                                    <i className="bi bi-person-vcard me-2"></i>Acesso - Funcionários
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
