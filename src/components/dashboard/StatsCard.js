export default function StatsCard({ title, count, variant = 'primary', icon, trend }) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h6 className="card-subtitle mb-2 text-muted">{title}</h6>
            <h2 className={`card-title text-${variant} mb-0`}>{count}</h2>
          </div>
          {icon && (
            <div className={`bg-${variant} bg-opacity-10 p-3 rounded`}>
              <i className={`bi bi-${icon} text-${variant} fs-4`}></i>
            </div>
          )}
        </div>
        
        {trend && (
          <div className="mt-2">
            <span className={`badge bg-${trend.type === 'up' ? 'success' : 'danger'} bg-opacity-10 text-${trend.type === 'up' ? 'success' : 'danger'}`}>
              <i className={`bi bi-${trend.type === 'up' ? 'arrow-up' : 'arrow-down'} me-1`}></i>
              {trend.value}%
            </span>
            <small className="text-muted ms-2">vs. mes anterior</small>
          </div>
        )}
      </div>
    </div>
  );
}