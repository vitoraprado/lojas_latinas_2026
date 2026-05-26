// src/app/layout.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ícones do Bootstrap

import BootstrapClient from '../../../components/BootstrapClient';

// src/app/painel/admin/layout.js (CORRETO)
export default function AdminLayout({ children }) {
  return (
    // Remova o <html> e o <body>. Deixe apenas uma div ou a estrutura do painel.
    <div className="admin-panel-wrapper">
      {/* Se o seu painel tiver um menu lateral fixo do Bootstrap, ele entra aqui */}
      <main className="p-4">
        {children}
      </main>
    </div>
  );
}