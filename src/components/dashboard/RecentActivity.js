import { mockActivity, mockUsers, mockIssues } from '../../data/mockData';
import { formatRelativeTime } from '../../lib/utils';

export default function RecentActivity() {
  // Combine activity with user and issue data
  const enrichedActivity = mockActivity.slice(0, 10).map(activity => {
    const user = mockUsers.find(u => u.id === activity.userId);
    const issue = mockIssues.find(i => i.id === activity.issueId);
    return { ...activity, user, issue };
  });

  const getActivityIcon = (type) => {
    switch (type) {
      case 'issue_created': return 'plus-circle-fill text-success';
      case 'issue_updated': return 'pencil-fill text-warning';
      case 'comment_added': return 'chat-fill text-info';
      case 'issue_assigned': return 'person-fill text-primary';
      case 'issue_closed': return 'check-circle-fill text-success';
      default: return 'circle-fill text-secondary';
    }
  };

  return (
    <div className="card h-100">
      <div className="card-header">
        <h5 className="card-title mb-0">
          <i className="bi bi-activity me-2"></i>
          Actividad Reciente
        </h5>
      </div>
      <div className="card-body p-0">
        <div className="list-group list-group-flush">
          {enrichedActivity.map((activity) => (
            <div key={activity.id} className="list-group-item">
              <div className="d-flex align-items-start">
                <div className="me-3">
                  <i className={`bi bi-${getActivityIcon(activity.type)}`}></i>
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <strong>{activity.user?.name}</strong> {activity.description}
                      {activity.issue && (
                        <div className="mt-1">
                          <span className="badge bg-light text-dark">
                            #{activity.issue.id} {activity.issue.title}
                          </span>
                        </div>
                      )}
                    </div>
                    <small className="text-muted text-nowrap ms-2">
                      {formatRelativeTime(activity.createdAt)}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card-footer text-center">
        <a href="/activity" className="btn btn-sm btn-outline-primary">
          Ver toda la actividad
        </a>
      </div>
    </div>
  );
}