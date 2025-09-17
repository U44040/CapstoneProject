'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '../../lib/constants';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <i className="bi bi-bug-fill me-2"></i>
          <span>Issue Tracker</span>
        </Link>

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
          <ul className="navbar-nav me-auto">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="nav-item">
                <Link 
                  href={item.href} 
                  className={`nav-link d-flex align-items-center ${
                    pathname === item.href ? 'active' : ''
                  }`}
                >
                  <i className={`bi bi-${item.icon} me-1`}></i>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="navbar-nav">
            <div className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle d-flex align-items-center" 
                href="#" 
                id="userDropdown" 
                role="button" 
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-person-circle me-1"></i>
                Usuario
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#"><i className="bi bi-person me-2"></i>Perfil</a></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-gear me-2"></i>Configuración</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}