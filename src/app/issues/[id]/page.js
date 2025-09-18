import { mockIssues, mockUsers, mockProjects, mockComments } from '../../../data/mockData';
import { getStatusColor, getPriorityColor, getTypeColor, formatDate, formatRelativeTime } from '../../../lib/utils';
import Image from 'next/image';
import UserAvatar from '../../../components/ui/UserAvatar';

// This would typically come from an API or database
function getIssue(id) {
  return mockIssues.find(issue => issue.id === parseInt(id));
}

function getIssueComments(issueId) {
  return mockComments.filter(comment => comment.issueId === parseInt(issueId));
}

export default function IssueDetailPage({ params }) {
  const issue = getIssue(params.id);
  const comments = getIssueComments(params.id);
  
  if (!issue) {
    return (
      <div className="container py-5 text-center">
        <h1>Issue no encontrado</h1>
        <p>El issue #{params.id} no existe o ha sido eliminado.</p>
        <a href="/issues" className="btn btn-primary">Volver a Issues</a>
      </div>
    );
  }

  const assignee = mockUsers.find(u => u.id === issue.assigneeId);
  const project = mockProjects.find(p => p.id === issue.projectId);
  const isOverdue = issue.dueDate && new Date(issue.dueDate) < new Date() && issue.status !== 'closed';

  return (
    <div className="container-fluid py-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/dashboard" className="text-decoration-none">
              <i className="bi bi-house me-1"></i>Dashboard
            </a>
          </li>
          <li className="breadcrumb-item">
            <a href="/issues" className="text-decoration-none">Issues</a>
          </li>
          <li className="breadcrumb-item active">#{issue.id}</li>
        </ol>
      </nav>

      <div className="row">
        {/* Main Content */}
        <div className="col-lg-8">
          {/* Issue Header */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center mb-2">
                    <span className="badge bg-secondary me-2 fs-6">#{issue.id}</span>
                    <span className={`badge bg-${getTypeColor(issue.type)} me-2`}>
                      {issue.type}
                    </span>
                    <span className={`badge bg-${getStatusColor(issue.status)} me-2`}>
                      {issue.status}
                    </span>
                    {isOverdue && (
                      <span className="badge bg-danger">
                        <i className="bi bi-clock me-1"></i>
                        Vencido
                      </span>
                    )}
                  </div>
                  <h2 className="h3 mb-3">{issue.title}</h2>
                  <p className="text-muted mb-0">{issue.description}</p>
                </div>
                <div className="dropdown">
                  <button 
                    className="btn btn-outline-secondary dropdown-toggle" 
                    type="button" 
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-three-dots"></i>
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#"><i className="bi bi-pencil me-2"></i>Editar</a></li>
                    <li><a className="dropdown-item" href="#"><i className="bi bi-files me-2"></i>Duplicar</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item text-danger" href="#"><i className="bi bi-trash me-2"></i>Eliminar</a></li>
                  </ul>
                </div>
              </div>

              {/* Tags */}
              {issue.tags && issue.tags.length > 0 && (
                <div className="mb-3">
                  <strong className="me-2">Tags:</strong>
                  {issue.tags.map((tag, index) => (
                    <span key={index} className="badge bg-light text-dark me-1">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Timestamps */}
              <div className="row text-muted">
                <div className="col-md-6">
                  <small>
                    <i className="bi bi-plus-circle me-1"></i>
                    Creado: {formatDate(issue.createdAt)}
                  </small>
                </div>
                <div className="col-md-6 text-md-end">
                  <small>
                    <i className="bi bi-pencil me-1"></i>
                    Actualizado: {formatRelativeTime(issue.updatedAt)}
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-chat me-2"></i>
                Comentarios ({comments.length})
              </h5>
            </div>
            <div className="card-body">
              {comments.length === 0 ? (
                <div className="text-center py-4">
                  <i className="bi bi-chat text-muted mb-2" style={{ fontSize: '2rem' }}></i>
                  <p className="text-muted mb-0">Aún no hay comentarios</p>
                  <small className="text-muted">Sé el primero en comentar este issue</small>
                </div>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment) => {
                    const commentUser = mockUsers.find(u => u.id === comment.userId);
                    return (
                      <div key={comment.id} className="border-bottom pb-3 mb-3">
                        <div className="d-flex align-items-start">
                          <UserAvatar
                            user={commentUser}
                            size="md"
                            className="me-3"
                          />
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <strong>{commentUser?.name}</strong>
                              <small className="text-muted">
                                {formatRelativeTime(comment.createdAt)}
                              </small>
                            </div>
                            <p className="mb-0">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Add Comment Form */}
              <div className="mt-4">
                <h6>Añadir comentario</h6>
                <div className="mb-3">
                  <textarea 
                    className="form-control" 
                    rows="3" 
                    placeholder="Escribe tu comentario aquí..."
                  ></textarea>
                </div>
                <button className="btn btn-primary">
                  <i className="bi bi-send me-2"></i>
                  Enviar comentario
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-lg-4">
          {/* Issue Details */}
          <div className="card mb-4">
            <div className="card-header">
              <h6 className="mb-0">Detalles del Issue</h6>
            </div>
            <div className="card-body">
              {/* Assignee */}
              <div className="mb-3">
                <label className="form-label fw-bold">Asignado a</label>
                {assignee ? (
                  <div className="d-flex align-items-center">
                    <UserAvatar
                      user={assignee}
                      size="sm"
                      className="me-2"
                    />
                    <div>
                      <div className="fw-medium">{assignee.name}</div>
                      <small className="text-muted">{assignee.email}</small>
                    </div>
                  </div>
                ) : (
                  <span className="text-muted">No asignado</span>
                )}
              </div>

              {/* Priority */}
              <div className="mb-3">
                <label className="form-label fw-bold">Prioridad</label>
                <div>
                  <span className={`badge bg-${getPriorityColor(issue.priority)}`}>
                    {issue.priority}
                  </span>
                </div>
              </div>

              {/* Project */}
              <div className="mb-3">
                <label className="form-label fw-bold">Proyecto</label>
                {project ? (
                  <div>
                    <span className={`badge bg-${project.color}`}>
                      <i className="bi bi-folder me-1"></i>
                      {project.name}
                    </span>
                  </div>
                ) : (
                  <span className="text-muted">Sin proyecto</span>
                )}
              </div>

              {/* Due Date */}
              {issue.dueDate && (
                <div className="mb-3">
                  <label className="form-label fw-bold">Fecha límite</label>
                  <div>
                    <span className={`badge ${isOverdue ? 'bg-danger' : 'bg-info'}`}>
                      <i className="bi bi-calendar me-1"></i>
                      {formatDate(issue.dueDate)}
                    </span>
                  </div>
                </div>
              )}

              <hr />

              {/* Quick Actions */}
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary">
                  <i className="bi bi-pencil me-2"></i>
                  Editar Issue
                </button>
                <button className="btn btn-outline-success">
                  <i className="bi bi-check-circle me-2"></i>
                  Marcar como Resuelto
                </button>
                <button className="btn btn-outline-warning">
                  <i className="bi bi-person-plus me-2"></i>
                  Reasignar
                </button>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="card">
            <div className="card-header">
              <h6 className="mb-0">Actividad Reciente</h6>
            </div>
            <div className="card-body">
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-marker bg-primary"></div>
                  <div className="timeline-content">
                    <small className="text-muted">{formatRelativeTime(issue.updatedAt)}</small>
                    <p className="mb-0">Issue actualizado</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker bg-success"></div>
                  <div className="timeline-content">
                    <small className="text-muted">{formatRelativeTime(issue.createdAt)}</small>
                    <p className="mb-0">Issue creado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}