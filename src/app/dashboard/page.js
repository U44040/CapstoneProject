import StatsCard from '../../components/dashboard/StatsCard';
import RecentActivity from '../../components/dashboard/RecentActivity';
import PriorityChart from '../../components/dashboard/PriorityChart';
import { mockIssues } from '../../data/mockData';
import { calculateStats } from '../../lib/utils';

export default function DashboardPage() {
  const stats = calculateStats(mockIssues);

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col">
          <h1 className="h2 mb-1">Dashboard</h1>
          <p className="text-muted mb-0">
            Resumen del estado actual del sistema
          </p>
        </div>
        <div className="col-auto">
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>
            Nuevo Issue
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-3">
          <StatsCard 
            title="Issues Abiertos" 
            count={stats.open}
            variant="primary"
            icon="circle"
            trend={{ type: 'up', value: 12 }}
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <StatsCard 
            title="En Progreso" 
            count={stats.inProgress}
            variant="warning"
            icon="clock"
            trend={{ type: 'up', value: 8 }}
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <StatsCard 
            title="Resueltos" 
            count={stats.closed}
            variant="success"
            icon="check-circle"
            trend={{ type: 'up', value: 23 }}
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <StatsCard 
            title="Vencidos" 
            count={stats.overdue}
            variant="danger"
            icon="exclamation-triangle"
            trend={{ type: 'down', value: 5 }}
          />
        </div>
      </div>

      {/* Charts and Activity */}
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <RecentActivity />
        </div>
        <div className="col-lg-4">
          <PriorityChart />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-lightning me-2"></i>
                Acciones Rápidas
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <a href="/issues" className="btn btn-outline-primary w-100">
                    <i className="bi bi-list-ul me-2"></i>
                    Ver Todos los Issues
                  </a>
                </div>
                <div className="col-md-3">
                  <a href="/issues?status=overdue" className="btn btn-outline-danger w-100">
                    <i className="bi bi-clock-history me-2"></i>
                    Issues Vencidos
                  </a>
                </div>
                <div className="col-md-3">
                  <a href="/projects" className="btn btn-outline-info w-100">
                    <i className="bi bi-folder me-2"></i>
                    Gestionar Proyectos
                  </a>
                </div>
                <div className="col-md-3">
                  <a href="/reports" className="btn btn-outline-secondary w-100">
                    <i className="bi bi-graph-up me-2"></i>
                    Ver Reportes
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}