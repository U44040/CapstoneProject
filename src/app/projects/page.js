import { mockProjects, mockIssues } from '../../data/mockData';
import { calculateStats } from '../../lib/utils';

export default function ProjectsPage() {
  // Calculate stats for each project
  const projectsWithStats = mockProjects.map(project => {
    const projectIssues = mockIssues.filter(issue => issue.projectId === project.id);
    const stats = calculateStats(projectIssues);
    return { ...project, ...stats, issues: projectIssues };
  });

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col">
          <h1 className="h2 mb-1">
            <i className="bi bi-folder me-2"></i>
            Proyectos
          </h1>
          <p className="text-muted mb-0">
            Gestiona todos los proyectos y sus issues asociados
          </p>
        </div>
        <div className="col-auto">
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>
            Nuevo Proyecto
          </button>
        </div>
      </div>

      {/* Project Stats Summary */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-primary mb-1">{projectsWithStats.length}</h3>
              <small className="text-muted">Proyectos Totales</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-success mb-1">
                {projectsWithStats.filter(p => p.status === 'active').length}
              </h3>
              <small className="text-muted">Activos</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-warning mb-1">
                {projectsWithStats.filter(p => p.status === 'planning').length}
              </h3>
              <small className="text-muted">En Planificación</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-info mb-1">
                {projectsWithStats.reduce((sum, p) => sum + p.total, 0)}
              </h3>
              <small className="text-muted">Issues Totales</small>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="row g-4">
        {projectsWithStats.map((project) => (
          <div key={project.id} className="col-lg-6">
            <div className="card h-100">
              <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div 
                      className={`bg-${project.color} rounded-circle me-3`}
                      style={{ width: '12px', height: '12px' }}
                    ></div>
                    <h5 className="card-title mb-0">{project.name}</h5>
                  </div>
                  <div className="dropdown">
                    <button 
                      className="btn btn-sm btn-outline-secondary dropdown-toggle" 
                      type="button" 
                      data-bs-toggle="dropdown"
                    >
                      <i className="bi bi-three-dots"></i>
                    </button>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#"><i className="bi bi-pencil me-2"></i>Editar</a></li>
                      <li><a className="dropdown-item" href="#"><i className="bi bi-gear me-2"></i>Configurar</a></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><a className="dropdown-item text-danger" href="#"><i className="bi bi-trash me-2"></i>Eliminar</a></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <p className="text-muted mb-3">{project.description}</p>

                {/* Project Status */}
                <div className="mb-3">
                  <span className={`badge bg-${project.status === 'active' ? 'success' : 'warning'}`}>
                    <i className={`bi bi-${project.status === 'active' ? 'check-circle' : 'clock'} me-1`}></i>
                    {project.status === 'active' ? 'Activo' : 'En Planificación'}
                  </span>
                </div>

                {/* Issue Stats */}
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <div className="text-center p-2 bg-light rounded">
                      <div className="fw-bold text-primary">{project.open}</div>
                      <small className="text-muted">Abiertos</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center p-2 bg-light rounded">
                      <div className="fw-bold text-warning">{project.inProgress}</div>
                      <small className="text-muted">En Progreso</small>
                    </div>
                  </div>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <div className="text-center p-2 bg-light rounded">
                      <div className="fw-bold text-success">{project.closed}</div>
                      <small className="text-muted">Resueltos</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center p-2 bg-light rounded">
                      <div className="fw-bold text-danger">{project.overdue}</div>
                      <small className="text-muted">Vencidos</small>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <small className="text-muted">Progreso</small>
                    <small className="text-muted">
                      {project.total > 0 ? Math.round((project.closed / project.total) * 100) : 0}%
                    </small>
                  </div>
                  <div className="progress" style={{ height: '6px' }}>
                    <div 
                      className="progress-bar bg-success" 
                      role="progressbar" 
                      style={{ 
                        width: `${project.total > 0 ? (project.closed / project.total) * 100 : 0}%` 
                      }}
                    ></div>
                  </div>
                </div>

                {/* Recent Issues */}
                {project.issues.length > 0 && (
                  <div className="mb-3">
                    <h6 className="mb-2">Issues Recientes</h6>
                    <div className="list-group list-group-flush">
                      {project.issues.slice(0, 3).map((issue) => (
                        <div key={issue.id} className="list-group-item px-0 py-2">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <span className="badge bg-secondary me-2">#{issue.id}</span>
                              <span className="text-truncate" style={{ maxWidth: '200px' }}>
                                {issue.title}
                              </span>
                            </div>
                            <span className={`badge bg-${
                              issue.status === 'open' ? 'primary' :
                              issue.status === 'in-progress' ? 'warning' :
                              issue.status === 'closed' ? 'success' : 'secondary'
                            }`}>
                              {issue.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {project.issues.length > 3 && (
                      <small className="text-muted">
                        y {project.issues.length - 3} issues más...
                      </small>
                    )}
                  </div>
                )}
              </div>

              <div className="card-footer">
                <div className="d-flex gap-2">
                  <a 
                    href={`/issues?project=${project.id}`} 
                    className="btn btn-sm btn-outline-primary flex-grow-1"
                  >
                    <i className="bi bi-list-ul me-1"></i>
                    Ver Issues
                  </a>
                  <button className="btn btn-sm btn-outline-secondary">
                    <i className="bi bi-plus me-1"></i>
                    Nuevo Issue
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {projectsWithStats.length === 0 && (
        <div className="text-center py-5">
          <i className="bi bi-folder2-open text-muted mb-3" style={{ fontSize: '3rem' }}></i>
          <h5>No hay proyectos</h5>
          <p className="text-muted">Crea tu primer proyecto para comenzar a organizar tus issues</p>
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>
            Crear Primer Proyecto
          </button>
        </div>
      )}
    </div>
  );
}