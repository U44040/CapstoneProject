'use client';
import { useState } from 'react';
import { ISSUE_STATUS, ISSUE_PRIORITY } from '../../lib/constants';
import { mockUsers, mockProjects } from '../../data/mockData';

export default function IssueFilters({ onFilterChange, filters = {} }) {
  const [localFilters, setLocalFilters] = useState({
    status: 'all',
    priority: 'all',
    assignee: 'all',
    project: 'all',
    search: '',
    ...filters
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const clearFilters = () => {
    const resetFilters = {
      status: 'all',
      priority: 'all',
      assignee: 'all',
      project: 'all',
      search: ''
    };
    setLocalFilters(resetFilters);
    if (onFilterChange) {
      onFilterChange(resetFilters);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0">
            <i className="bi bi-funnel me-2"></i>
            Filtros
          </h6>
          <button 
            className="btn btn-sm btn-outline-secondary"
            onClick={clearFilters}
          >
            <i className="bi bi-x-circle me-1"></i>
            Limpiar
          </button>
        </div>
      </div>
      <div className="card-body">
        {/* Search */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-search me-1"></i>
            Buscar
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar en título o descripción..."
            value={localFilters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-circle me-1"></i>
            Estado
          </label>
          <select
            className="form-select"
            value={localFilters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="all">Todos los estados</option>
            <option value={ISSUE_STATUS.OPEN}>Abierto</option>
            <option value={ISSUE_STATUS.IN_PROGRESS}>En Progreso</option>
            <option value={ISSUE_STATUS.REVIEW}>En Revisión</option>
            <option value={ISSUE_STATUS.BLOCKED}>Bloqueado</option>
            <option value={ISSUE_STATUS.CLOSED}>Cerrado</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-exclamation-triangle me-1"></i>
            Prioridad
          </label>
          <select
            className="form-select"
            value={localFilters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
          >
            <option value="all">Todas las prioridades</option>
            <option value={ISSUE_PRIORITY.CRITICAL}>Crítica</option>
            <option value={ISSUE_PRIORITY.HIGH}>Alta</option>
            <option value={ISSUE_PRIORITY.MEDIUM}>Media</option>
            <option value={ISSUE_PRIORITY.LOW}>Baja</option>
          </select>
        </div>

        {/* Assignee Filter */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-person me-1"></i>
            Asignado a
          </label>
          <select
            className="form-select"
            value={localFilters.assignee}
            onChange={(e) => handleFilterChange('assignee', e.target.value)}
          >
            <option value="all">Todos los usuarios</option>
            {mockUsers.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {/* Project Filter */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-folder me-1"></i>
            Proyecto
          </label>
          <select
            className="form-select"
            value={localFilters.project}
            onChange={(e) => handleFilterChange('project', e.target.value)}
          >
            <option value="all">Todos los proyectos</option>
            {mockProjects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Filters */}
        <div className="mb-0">
          <label className="form-label">Filtros rápidos</label>
          <div className="d-grid gap-2">
            <button 
              className="btn btn-sm btn-outline-primary"
              onClick={() => handleFilterChange('status', ISSUE_STATUS.OPEN)}
            >
              <i className="bi bi-circle me-1"></i>
              Solo Abiertos
            </button>
            <button 
              className="btn btn-sm btn-outline-warning"
              onClick={() => handleFilterChange('priority', ISSUE_PRIORITY.HIGH)}
            >
              <i className="bi bi-exclamation-triangle me-1"></i>
              Alta Prioridad
            </button>
            <button 
              className="btn btn-sm btn-outline-info"
              onClick={() => handleFilterChange('assignee', 1)}
            >
              <i className="bi bi-person me-1"></i>
              Mis Issues
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}