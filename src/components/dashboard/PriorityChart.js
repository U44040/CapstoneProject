import { mockIssues } from '../../data/mockData';
import { ISSUE_PRIORITY } from '../../lib/constants';

export default function PriorityChart() {
  // Calculate priority distribution
  const priorityCount = mockIssues.reduce((acc, issue) => {
    if (issue.status !== 'closed') { // Only count open issues
      acc[issue.priority] = (acc[issue.priority] || 0) + 1;
    }
    return acc;
  }, {});

  const total = Object.values(priorityCount).reduce((sum, count) => sum + count, 0);

  const priorityData = [
    { 
      label: 'Crítica', 
      value: priorityCount[ISSUE_PRIORITY.CRITICAL] || 0, 
      color: 'danger',
      icon: 'exclamation-triangle-fill'
    },
    { 
      label: 'Alta', 
      value: priorityCount[ISSUE_PRIORITY.HIGH] || 0, 
      color: 'warning',
      icon: 'exclamation-circle-fill'
    },
    { 
      label: 'Media', 
      value: priorityCount[ISSUE_PRIORITY.MEDIUM] || 0, 
      color: 'info',
      icon: 'info-circle-fill'
    },
    { 
      label: 'Baja', 
      value: priorityCount[ISSUE_PRIORITY.LOW] || 0, 
      color: 'success',
      icon: 'check-circle-fill'
    }
  ];

  return (
    <div className="card h-100">
      <div className="card-header">
        <h5 className="card-title mb-0">
          <i className="bi bi-pie-chart me-2"></i>
          Issues por Prioridad
        </h5>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <div className="text-center">
            <h3 className="text-primary mb-0">{total}</h3>
            <small className="text-muted">Total de issues activos</small>
          </div>
        </div>

        <div className="space-y-3">
          {priorityData.map((priority, index) => {
            const percentage = total > 0 ? Math.round((priority.value / total) * 100) : 0;
            
            return (
              <div key={index} className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <div className="d-flex align-items-center">
                    <i className={`bi bi-${priority.icon} text-${priority.color} me-2`}></i>
                    <span className="fw-medium">{priority.label}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="badge bg-light text-dark me-2">{priority.value}</span>
                    <small className="text-muted">{percentage}%</small>
                  </div>
                </div>
                <div className="progress" style={{ height: '6px' }}>
                  <div 
                    className={`progress-bar bg-${priority.color}`}
                    role="progressbar" 
                    style={{ width: `${percentage}%` }}
                    aria-valuenow={percentage} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="card-footer">
        <small className="text-muted">
          <i className="bi bi-info-circle me-1"></i>
          Solo se muestran issues activos
        </small>
      </div>
    </div>
  );
}