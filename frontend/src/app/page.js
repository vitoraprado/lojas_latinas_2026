// frontend/src/app/page.js
import Link from 'next/link';

export default function Home() {
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
                <Link href="/admin/login" className="nav-link">
                <i className="bi bi-person-vcard me-2"></i>Acesso - Funcionários
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="bg-light py-5 border-bottom">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold text-dark mb-3">
                Sua próxima compra é conosco!
              </h1>
              <p className="lead text-muted mb-4">
                Prezamos pela qualidade e pela sua satisfação.
              </p>
              
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <Link href="/loja/login" className="btn btn-primary btn-lg px-4 me-md-2 fw-bold d-inline-flex align-items-center justify-content-center">
                  <i className="bi bi-person-fill me-2"></i>
                  Login
                </Link>
                
               {/*<button type="button" className="btn btn-outline-secondary btn-lg px-4 d-inline-flex align-items-center justify-content-center">
                  <i className="bi bi-person-fill-add me-2"></i>
                  Cadastre-se
                </button>*/}
              </div>
            </div>

            <div className="col-lg-6 text-center">
              <img 
                src="/logo_ll.png" 
                alt="Logo Lojas Latinas" 
                width="450" 
                height="450" 
                className="img-fluid drop-shadow" 
                style={{ maxHeight: '350px', objectFit: 'contain' }}
              />
            </div>

          </div>
        </div>
      </header>

      <section className="py-5">
        <div className="container my-5">
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="p-4 border rounded-3 bg-white shadow-sm h-100">
                <div className="text-primary fs-1 mb-2">
                  <i className="bi bi-box-seam"></i>
                </div>
                <h3 className="h5 fw-bold">Entregas Rápidas</h3>
                <p className="text-muted">Previsões de entrega curtas com atualizações de rota até chegar a você.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded-3 bg-white shadow-sm h-100">
                <div className="text-primary fs-1 mb-2">
                  <i className="bi bi-basket2"></i>
                </div>
                <h3 className="h5 fw-bold">Recomendações Relevantes</h3>
                <p className="text-muted">Produtos selecionados de acordo com os seus gostos e preferências.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded-3 bg-white shadow-sm h-100">
                <div className="text-primary fs-1 mb-2">
                  <i className="bi bi-cash-coin"></i>
                </div>
                <h3 className="h5 fw-bold">Melhores Ofertas</h3>
                <p className="text-muted">Cadastre-se para receber os descontos mais quentes do mercado.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-4 bg-dark text-white-50 text-center mt-auto">
        <div className="container">
          <small>&copy; {new Date().getFullYear()} - Lojas Latinas<br/></small>
          <small>Projeto - Linguagem de Programação para Internet</small>
        </div>
      </footer>
    </>
  );
}