// frontend/src/app/page.js

export default function Home() {
  return (
    <>
      {/* 1. Barra de Navegação (Navbar) */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary">
            <i className="bi bi-layer-forward me-2"></i>Lojas Latinas
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
                <a className="nav-link active" href="#">Início</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Login</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* 2. Seção Principal (Hero Section) */}
      <header className="bg-light py-5 border-bottom">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold text-dark mb-3">
                Seu app Next.js está pronto para o Back-end
              </h1>
              <p className="lead text-muted mb-4">
                O Front-end já está estilizado com Bootstrap e rodando isolado dentro do Docker. Pronto para consumir as rotas da sua API em Node.js.
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <button type="button" className="btn btn-primary btn-lg px-4 me-md-2 fw-bold">
                  Começar Agora
                </button>
                <button type="button" className="btn className btn-outline-secondary btn-lg px-4">
                  Ver Documentação
                </button>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              {/* Um card flutuante simulando um painel/dashboard de teste */}
              <div className="card shadow-lg p-4 bg-white rounded-3 border-0">
                <div className="card-body text-start">
                  <h5 className="card-title fw-bold text-secondary mb-3">Conexão com o Back-end</h5>
                  <div className="alert alert-warning d-flex align-items-center" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2fs-4 me-2"></i>
                    <div>
                      Status: Aguardando integração com a API Node...
                    </div>
                  </div>
                  <button className="btn btn-sm btn-outline-primary">Testar Ping</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Seção de Cards (Grid System) */}
      <section className="py-5">
        <div className="container my-5">
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="p-4 border rounded-3 bg-white shadow-sm h-100">
                <div className="text-primary fs-1 mb-2">
                  <i className="bi bi-box-seam"></i>
                </div>
                <h3 className="h5 fw-bold">Dockerizado</h3>
                <p className="text-muted">Ambiente isolado que roda igual na sua máquina e no servidor de produção.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded-3 bg-white shadow-sm h-100">
                <div className="text-success fs-1 mb-2">
                  <i className="bi bi-lightning-charge"></i>
                </div>
                <h3 className="h5 fw-bold">Next.js Fast Refresh</h3>
                <p className="text-muted">Altere o código no seu editor e veja o resultado no navegador instantaneamente.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded-3 bg-white shadow-sm h-100">
                <div className="text-danger fs-1 mb-2">
                  <i className="bi bi-braces"></i>
                </div>
                <h3 className="h5 fw-bold">Full Stack</h3>
                <p className="text-muted">Separação limpa entre a interface visual e as regras de negócio no Node.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Rodapé */}
      <footer className="py-4 bg-dark text-white-50 text-center mt-auto">
        <div className="container">
          <small>&copy; {new Date().getFullYear()} - Criado com Next.js, Bootstrap e Docker</small>
        </div>
      </footer>
    </>
  );
}