export default function AboutPage() {
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">Capstone Project</a>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/about">About</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="main">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h1 className="display-5 fw-bold mb-4">About This Project</h1>
              <p className="lead">
                This is a capstone project built with modern web technologies including Next.js, React, and Bootstrap.
              </p>
              
              <div className="row mt-5">
                <div className="col-md-6">
                  <h3>Technologies Used</h3>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Next.js 14+ - React Framework</li>
                    <li className="list-group-item">React 18+ - UI Library</li>
                    <li className="list-group-item">Bootstrap 5 - CSS Framework</li>
                    <li className="list-group-item">ESLint - Code Linting</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h3>Features</h3>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Server-Side Rendering</li>
                    <li className="list-group-item">Responsive Design</li>
                    <li className="list-group-item">Modern JavaScript</li>
                    <li className="list-group-item">Component-Based Architecture</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-dark text-light py-4 mt-5">
        <div className="container text-center">
          <p>&copy; 2025 Capstone Project. Built with Next.js, React, and Bootstrap.</p>
        </div>
      </footer>
    </div>
  )
}