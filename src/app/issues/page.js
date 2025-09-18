'use client';
import { useState, useEffect } from 'react';
import IssueCard from '../../components/issues/IssueCard';
import IssueFilters from '../../components/issues/IssueFilters';
import NewIssueModal from '../../components/issues/NewIssueModal';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { mockIssues } from '../../data/mockData';
import { filterIssues, sortIssues, getAllIssues } from '../../lib/utils';

export default function IssuesPage() {
  const [issues, setIssues] = useState(() => getAllIssues(mockIssues));
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    assignee: 'all',
    project: 'all',
    search: ''
  });
  const [sortBy, setSortBy] = useState('updatedAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [loading] = useState(false);
  const [showNewIssueModal, setShowNewIssueModal] = useState(false);

  // Reload issues on component mount to get latest data
  useEffect(() => {
    setIssues(getAllIssues(mockIssues));
  }, []);

  // Apply filters and sorting
  const filteredIssues = filterIssues(issues, filters);
  const sortedIssues = sortIssues(filteredIssues, sortBy, sortOrder);

  const handleSort = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return 'bi-arrow-down-up';
    return sortOrder === 'asc' ? 'bi-arrow-up' : 'bi-arrow-down';
  };

  const handleCreateIssue = (newIssue) => {
    // Add to local state immediately
    setIssues(prevIssues => [newIssue, ...prevIssues]);
    
    // Show success message
    console.log('✅ Issue creado exitosamente:', newIssue.title);
  };

  const handleOpenNewIssueModal = () => {
    setShowNewIssueModal(true);
  };

  const handleCloseNewIssueModal = () => {
    setShowNewIssueModal(false);
  };

  if (loading) {
    return <LoadingSpinner text="Cargando issues..." />;
  }

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col">
          <h1 className="h2 mb-1">
            <i className="bi bi-bug me-2"></i>
            Issues
          </h1>
          <p className="text-muted mb-0">
            Gestiona y da seguimiento a todos los problemas del proyecto
          </p>
        </div>
        <div className="col-auto">
          <button 
            className="btn btn-primary"
            onClick={handleOpenNewIssueModal}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Nuevo Issue
          </button>
        </div>
      </div>

      <div className="row">
        {/* Filters Sidebar */}
        <div className="col-lg-3 mb-4">
          <IssueFilters 
            filters={filters}
            onFilterChange={setFilters}
          />
          
          {/* Statistics */}
          <div className="card mt-4">
            <div className="card-header">
              <h6 className="mb-0">
                <i className="bi bi-bar-chart me-2"></i>
                Estadísticas
              </h6>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-6">
                  <div className="border-end">
                    <h4 className="text-primary mb-0">{filteredIssues.length}</h4>
                    <small className="text-muted">Filtrados</small>
                  </div>
                </div>
                <div className="col-6">
                  <h4 className="text-secondary mb-0">{issues.length}</h4>
                  <small className="text-muted">Total</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Issues List */}
        <div className="col-lg-9">
          {/* Sort Controls */}
          <div className="card mb-4">
            <div className="card-body py-2">
              <div className="row align-items-center">
                <div className="col">
                  <small className="text-muted">
                    Mostrando {sortedIssues.length} de {issues.length} issues
                  </small>
                </div>
                <div className="col-auto">
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className={`btn btn-sm ${sortBy === 'updatedAt' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => handleSort('updatedAt')}
                    >
                      <i className={`bi ${getSortIcon('updatedAt')} me-1`}></i>
                      Actualización
                    </button>
                    <button
                      type="button"
                      className={`btn btn-sm ${sortBy === 'createdAt' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => handleSort('createdAt')}
                    >
                      <i className={`bi ${getSortIcon('createdAt')} me-1`}></i>
                      Creación
                    </button>
                    <button
                      type="button"
                      className={`btn btn-sm ${sortBy === 'priority' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => handleSort('priority')}
                    >
                      <i className={`bi ${getSortIcon('priority')} me-1`}></i>
                      Prioridad
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Issues */}
          {sortedIssues.length === 0 ? (
            <div className="card">
              <div className="card-body text-center py-5">
                <i className="bi bi-search text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                <h5>No se encontraron issues</h5>
                <p className="text-muted">
                  {filters.search || filters.status !== 'all' || filters.priority !== 'all' || filters.assignee !== 'all' || filters.project !== 'all'
                    ? 'Intenta ajustar los filtros para ver más resultados'
                    : 'Aún no hay issues creados en el sistema'
                  }
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={handleOpenNewIssueModal}
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Crear primer issue
                </button>
              </div>
            </div>
          ) : (
            <div>
              {sortedIssues.map((issue) => (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  onClick={() => {
                    // Navigate to issue detail
                    window.location.href = `/issues/${issue.id}`;
                  }}
                />
              ))}
            </div>
          )}

          {/* Load More / Pagination could go here */}
          {sortedIssues.length > 0 && (
            <div className="text-center mt-4">
              <small className="text-muted">
                Fin de la lista • {sortedIssues.length} issues mostrados
              </small>
            </div>
          )}
        </div>
      </div>

      {/* New Issue Modal */}
      <NewIssueModal
        show={showNewIssueModal}
        onHide={handleCloseNewIssueModal}
        onSave={handleCreateIssue}
      />
    </div>
  );
}