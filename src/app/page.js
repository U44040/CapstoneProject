import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center min-vh-75 align-items-center">
        <div className="col-lg-8 text-center">
          <div className="mb-5">
            <i className="bi bi-bug-fill text-primary mb-3" style={{ fontSize: '4rem' }}></i>
            <h1 className="display-4 fw-bold text-primary mb-3">
              Issue Tracker System
            </h1>
            <p className="lead text-muted mb-4">
              Sistema modular de seguimiento de problemas para equipos de desarrollo 2
            </p>
          </div>

          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <i className="bi bi-speedometer2 text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
                  <h5 className="card-title">Dashboard Intuitivo</h5>
                  <p className="card-text text-muted">
                    Visualiza el estado de todos tus proyectos de un vistazo
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <i className="bi bi-kanban text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
                  <h5 className="card-title">Gestión Modular</h5>
                  <p className="card-text text-muted">
                    Organiza issues por proyectos, prioridades y estados
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <i className="bi bi-graph-up text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
                  <h5 className="card-title">Reportes Detallados</h5>
                  <p className="card-text text-muted">
                    Analiza el rendimiento y progreso de tu equipo
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex gap-3 justify-content-center">
            <Link href="/dashboard" className="btn btn-primary btn-lg px-4">
              <i className="bi bi-speedometer2 me-2"></i>
              Ir al Dashboard
            </Link>
            <Link href="/issues" className="btn btn-outline-primary btn-lg px-4">
              <i className="bi bi-bug me-2"></i>
              Ver Issues
            </Link>
          </div>

          <div className="mt-5 pt-4 border-top">
            <p className="text-muted mb-0">
              <small>
                Desarrollado con 
                <i className="bi bi-heart-fill text-danger mx-1"></i>
                usando Next.js, React y Bootstrap
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}