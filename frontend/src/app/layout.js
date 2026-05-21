// src/app/layout.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ícones do Bootstrap

import BootstrapClient from '../components/BootstrapClient';

export const metadata = {
  title: 'Meu Projeto Next.js',
  description: 'Rodando com Bootstrap no Docker',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <BootstrapClient /> {/* Ativa os componentes JS do Bootstrap */}
      </body>
    </html>
  );
}