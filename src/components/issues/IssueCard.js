import Image from 'next/image';
import { getStatusColor, getPriorityColor, getTypeColor, formatRelativeTime } from '../../lib/utils';
import { mockUsers, mockProjects } from '../../data/mockData';

export default function IssueCard({ issue, onClick }) {
  const assignee = mockUsers.find(u => u.id === issue.assigneeId);
  const project = mockProjects.find(p => p.id === issue.projectId);
  
  const isOverdue = issue.dueDate && new Date(issue.dueDate) < new Date() && issue.status !== 'closed';

  return (
    <div 
      className={`card mb-3 ${onClick ? 'cursor-pointer' : ''} ${isOverdue ? 'border-danger' : ''}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="flex-grow-1">
            <div className="d-flex align-items-center mb-2">
              <span className="badge bg-secondary me-2">#{issue.id}</span>
              <span className={`badge bg-${getTypeColor(issue.type)} me-2`}>
                {issue.type}
              </span>
              {isOverdue && (
                <span className="badge bg-danger me-2">
                  <i className="bi bi-clock me-1"></i>
                  Vencido
                </span>
              )}
            </div>
            <h6 className="card-title mb-2">{issue.title}</h6>
            <p className="card-text text-muted mb-2">{issue.description}</p>
          </div>
          
          <div className="text-end ms-3">
            <span className={`badge bg-${getStatusColor(issue.status)} mb-2`}>
              {issue.status}
            </span>
            <br />
            <span className={`badge bg-${getPriorityColor(issue.priority)}`}>
              {issue.priority}
            </span>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="d-flex align-items-center">
              {assignee && (
                <>
                  <Image 
                    src={assignee.avatar} 
                    alt={assignee.name}
                    className="rounded-circle me-2"
                    width={24} 
                    height={24}
                  />
                  <small className="text-muted me-3">{assignee.name}</small>
                </>
              )}
              
              {project && (
                <span className={`badge bg-${project.color} bg-opacity-10 text-${project.color}`}>
                  <i className="bi bi-folder me-1"></i>
                  {project.name}
                </span>
              )}
            </div>
          </div>
          
          <div className="col-md-6 text-md-end">
            <div className="d-flex align-items-center justify-content-md-end">
              {issue.comments > 0 && (
                <span className="badge bg-light text-dark me-2">
                  <i className="bi bi-chat me-1"></i>
                  {issue.comments}
                </span>
              )}
              
              <small className="text-muted">
                <i className="bi bi-clock me-1"></i>
                {formatRelativeTime(issue.updatedAt)}
              </small>
            </div>
            
            {issue.dueDate && (
              <div className="mt-1">
                <small className={`text-${isOverdue ? 'danger' : 'muted'}`}>
                  <i className="bi bi-calendar me-1"></i>
                  Vence: {new Date(issue.dueDate).toLocaleDateString('es-ES')}
                </small>
              </div>
            )}
          </div>
        </div>

        {issue.tags && issue.tags.length > 0 && (
          <div className="mt-3">
            {issue.tags.map((tag, index) => (
              <span key={index} className="badge bg-light text-dark me-1">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}