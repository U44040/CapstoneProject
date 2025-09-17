import { mockIssues, mockProjects, mockUsers } from '../../data/mockData';
import { ISSUE_STATUS, ISSUE_PRIORITY } from '../../lib/constants';
import { calculateStats, formatDate } from '../../lib/utils';

export default function ReportsPage() {
  const stats = calculateStats(mockIssues);
  
  // Calculate trends (mock data for demo)
  const trends = {
    issuesCreatedThisMonth: 12,
    issuesClosedThisMonth: 8,
    averageResolutionTime: 3.2,
    mostActiveUser: mockUsers[0],
    mostActiveProject: mockProjects[0]
  };

  // Issues by status for pie chart
  const statusDistribution = Object.values(ISSUE_STATUS).map(status => {
    const count = mockIssues.filter(issue => issue.status === status).length;
    return { status, count };
  });

  // Issues by priority
  const priorityDistribution = Object.values(ISSUE_PRIORITY).map(priority => {
    const count = mockIssues.filter(issue => issue.priority === priority).length;
    return { priority, count };
  });

  // Issues by project
  const projectDistribution = mockProjects.map(project => {
    const projectIssues = mockIssues.filter(issue => issue.projectId === project.id);
    return { 
      project: project.name, 
      count: projectIssues.length,
      color: project.color
    };
  });

  // Recent resolutions (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const recentResolutions = mockIssues.filter(issue => 
    issue.status === ISSUE_STATUS.CLOSED && 
    new Date(issue.updatedAt) >= sevenDaysAgo
  );

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col">
          <h1 className="h2 mb-1">
            <i className="bi bi-graph-up me-2"></i>
            Reportes y Analytics
          </h1>
          <p className="text-muted mb-0">
            Análisis detallado del rendimiento y progreso del equipo
          </p>
        </div>
        <div className="col-auto">
          <div className="btn-group">
            <button className="btn btn-outline-primary">
              <i className="bi bi-download me-2"></i>
              Exportar PDF
            </button>
            <button className="btn btn-outline-secondary">
              <i className="bi bi-calendar me-2"></i>
              Cambiar Período
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body text-center">
              <i className="bi bi-plus-circle text-primary mb-2" style={{ fontSize: '2rem' }}></i>
              <h3 className="text-primary mb-1">{trends.issuesCreatedThisMonth}</h3>
              <p className="mb-0 text-muted">Issues Creados</p>
              <small className="text-muted">Este mes</small>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body text-center">
              <i className="bi bi-check-circle text-success mb-2" style={{ fontSize: '2rem' }}></i>
              <h3 className="text-success mb-1">{trends.issuesClosedThisMonth}</h3>
              <p className="mb-0 text-muted">Issues Resueltos</p>
              <small className="text-muted">Este mes</small>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body text-center">
              <i className="bi bi-clock text-warning mb-2" style={{ fontSize: '2rem' }}></i>
              <h3 className="text-warning mb-1">{trends.averageResolutionTime}d</h3>
              <p className="mb-0 text-muted">Tiempo Promedio</p>
              <small className="text-muted">Resolución</small>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body text-center">
              <i className="bi bi-exclamation-triangle text-danger mb-2" style={{ fontSize: '2rem' }}></i>
              <h3 className="text-danger mb-1">{stats.overdue}</h3>
              <p className="mb-0 text-muted">Issues Vencidos</p>
              <small className="text-muted">Requieren atención</small>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        {/* Status Distribution */}
        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-pie-chart me-2"></i>
                Distribución por Estado
              </h5>
            </div>
            <div className="card-body">
              {statusDistribution.map((item, index) => {
                const percentage = stats.total > 0 ? Math.round((item.count / stats.total) * 100) : 0;
                const colors = ['primary', 'warning', 'info', 'danger', 'success', 'secondary'];
                const color = colors[index] || 'secondary';
                
                return (
                  <div key={item.status} className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-medium">{item.status}</span>
                      <span className="badge bg-light text-dark">{item.count}</span>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <div 
                        className={`progress-bar bg-${color}`}
                        role="progressbar" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <small className="text-muted">{percentage}% del total</small>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-bar-chart me-2"></i>
                Distribución por Prioridad
              </h5>
            </div>
            <div className="card-body">
              {priorityDistribution.map((item, index) => {
                const percentage = stats.total > 0 ? Math.round((item.count / stats.total) * 100) : 0;
                const colors = ['success', 'warning', 'danger', 'dark'];
                const color = colors[index] || 'secondary';
                
                return (
                  <div key={item.priority} className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-medium">{item.priority}</span>
                      <span className="badge bg-light text-dark">{item.count}</span>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <div 
                        className={`progress-bar bg-${color}`}
                        role="progressbar" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <small className="text-muted">{percentage}% del total</small>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        {/* Project Performance */}
        <div className="col-lg-8">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-folder me-2"></i>
                Rendimiento por Proyecto
              </h5>
            </div>
            <div className="card-body">
              {projectDistribution.map((item) => {
                const percentage = stats.total > 0 ? Math.round((item.count / stats.total) * 100) : 0;
                
                return (
                  <div key={item.project} className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center">
                        <div 
                          className={`bg-${item.color} rounded-circle me-2`}
                          style={{ width: '12px', height: '12px' }}
                        ></div>
                        <span className="fw-medium">{item.project}</span>
                      </div>
                      <div className="text-end">
                        <span className="badge bg-light text-dark me-2">{item.count} issues</span>
                        <small className="text-muted">{percentage}%</small>
                      </div>
                    </div>
                    <div className="progress" style={{ height: '10px' }}>
                      <div 
                        className={`progress-bar bg-${item.color}`}
                        role="progressbar" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Team Performance */}
        <div className="col-lg-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-people me-2"></i>
                Rendimiento del Equipo
              </h5>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <h6>Usuario Más Activo</h6>
                <div className="d-flex align-items-center">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                    <i className="bi bi-person text-primary"></i>
                  </div>
                  <div>
                    <div className="fw-medium">{trends.mostActiveUser.name}</div>
                    <small className="text-muted">{trends.mostActiveUser.role}</small>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h6>Proyecto Más Activo</h6>
                <div className="d-flex align-items-center">
                  <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                    <i className="bi bi-folder text-success"></i>
                  </div>
                  <div>
                    <div className="fw-medium">{trends.mostActiveProject.name}</div>
                    <small className="text-muted">
                      {mockIssues.filter(i => i.projectId === trends.mostActiveProject.id).length} issues
                    </small>
                  </div>
                </div>
              </div>

              <div>
                <h6>Issues por Usuario</h6>
                {mockUsers.map(user => {
                  const userIssues = mockIssues.filter(issue => issue.assigneeId === user.id);
                  return (
                    <div key={user.id} className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-truncate">{user.name}</span>
                      <span className="badge bg-light text-dark">{userIssues.length}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Resolutions */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-check-circle me-2"></i>
                Resoluciones Recientes (Últimos 7 días)
              </h5>
            </div>
            <div className="card-body">
              {recentResolutions.length === 0 ? (
                <div className="text-center py-4">
                  <i className="bi bi-inbox text-muted mb-2" style={{ fontSize: '2rem' }}></i>
                  <p className="text-muted">No hay resoluciones recientes</p>
                </div>
              ) : (
                <div className="row">
                  {recentResolutions.map((issue) => {
                    const assignee = mockUsers.find(u => u.id === issue.assigneeId);
                    const project = mockProjects.find(p => p.id === issue.projectId);
                    
                    return (
                      <div key={issue.id} className="col-md-6 col-lg-4 mb-3">
                        <div className="card border-success">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <span className="badge bg-secondary">#{issue.id}</span>
                              <span className="badge bg-success">Resuelto</span>
                            </div>
                            <h6 className="card-title">{issue.title}</h6>
                            <div className="mb-2">
                              {project && (
                                <span className={`badge bg-${project.color} me-2`}>
                                  {project.name}
                                </span>
                              )}
                              <span className={`badge bg-${
                                issue.priority === 'critical' ? 'dark' :
                                issue.priority === 'high' ? 'danger' :
                                issue.priority === 'medium' ? 'warning' : 'success'
                              }`}>
                                {issue.priority}
                              </span>
                            </div>
                            {assignee && (
                              <small className="text-muted">
                                Resuelto por {assignee.name}
                              </small>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}