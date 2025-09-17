export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h6>
              <i className="bi bi-bug-fill me-2"></i>
              Issue Tracker System
            </h6>
            <p className="mb-0 text-muted">
              Sistema modular de seguimiento de problemas
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex justify-content-md-end align-items-center">
              <span className="text-muted me-3">
                &copy; 2025 Capstone Project
              </span>
              <div>
                <a href="#" className="text-light me-2" title="Ayuda">
                  <i className="bi bi-question-circle"></i>
                </a>
                <a href="#" className="text-light me-2" title="Documentación">
                  <i className="bi bi-book"></i>
                </a>
                <a href="#" className="text-light" title="GitHub">
                  <i className="bi bi-github"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}