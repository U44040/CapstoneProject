'use client';
import { useState } from 'react';
import Modal from '../ui/Modal';
import { ISSUE_STATUS, ISSUE_PRIORITY, ISSUE_TYPE } from '../../lib/constants';
import { mockUsers, mockProjects } from '../../data/mockData';
import { updateMockDataWithNewIssue } from '../../lib/utils';

export default function NewIssueModal({ show, onHide, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: ISSUE_TYPE.BUG,
    priority: ISSUE_PRIORITY.MEDIUM,
    assigneeId: '',
    projectId: '',
    dueDate: '',
    tags: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    }

    if (!formData.projectId) {
      newErrors.projectId = 'Debes seleccionar un proyecto';
    }

    if (!formData.assigneeId) {
      newErrors.assigneeId = 'Debes asignar el issue a alguien';
    }

    if (formData.dueDate && new Date(formData.dueDate) < new Date()) {
      newErrors.dueDate = 'La fecha de vencimiento no puede ser en el pasado';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Process tags
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      // Create new issue object
      const newIssue = {
        id: Date.now(), // Simple ID generation for demo
        title: formData.title,
        description: formData.description,
        status: ISSUE_STATUS.OPEN,
        priority: formData.priority,
        type: formData.type,
        assigneeId: parseInt(formData.assigneeId),
        projectId: parseInt(formData.projectId),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
        tags: tags,
        comments: 0
      };

      // Update mockData simulation
      await updateMockDataWithNewIssue(newIssue);
      
      // Call parent save handler
      await onSave(newIssue);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        type: ISSUE_TYPE.BUG,
        priority: ISSUE_PRIORITY.MEDIUM,
        assigneeId: '',
        projectId: '',
        dueDate: '',
        tags: ''
      });
      
      onHide();
    } catch (error) {
      console.error('Error creating issue:', error);
      // You could add a toast notification here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      title: '',
      description: '',
      type: ISSUE_TYPE.BUG,
      priority: ISSUE_PRIORITY.MEDIUM,
      assigneeId: '',
      projectId: '',
      dueDate: '',
      tags: ''
    });
    setErrors({});
    onHide();
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case ISSUE_TYPE.BUG:
        return 'bi-bug';
      case ISSUE_TYPE.FEATURE:
        return 'bi-star';
      case ISSUE_TYPE.TASK:
        return 'bi-check-square';
      case ISSUE_TYPE.IMPROVEMENT:
        return 'bi-arrow-up-circle';
      default:
        return 'bi-circle';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case ISSUE_PRIORITY.LOW:
        return 'bi-arrow-down';
      case ISSUE_PRIORITY.MEDIUM:
        return 'bi-dash';
      case ISSUE_PRIORITY.HIGH:
        return 'bi-arrow-up';
      case ISSUE_PRIORITY.CRITICAL:
        return 'bi-exclamation-triangle';
      default:
        return 'bi-dash';
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleCancel}
      title="Crear Nuevo Issue"
      size="lg"
      onSave={handleSave}
      onCancel={handleCancel}
      saveText={isSubmitting ? "Creando..." : "Crear Issue"}
      saveVariant="primary"
    >
      <form>
        <div className="row">
          {/* Title */}
          <div className="col-12 mb-3">
            <label htmlFor="title" className="form-label">
              <i className="bi bi-type me-2"></i>
              Título *
            </label>
            <input
              type="text"
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Describe brevemente el issue"
              disabled={isSubmitting}
            />
            {errors.title && (
              <div className="invalid-feedback">
                {errors.title}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="col-12 mb-3">
            <label htmlFor="description" className="form-label">
              <i className="bi bi-text-paragraph me-2"></i>
              Descripción *
            </label>
            <textarea
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Proporciona una descripción detallada del issue"
              disabled={isSubmitting}
            ></textarea>
            {errors.description && (
              <div className="invalid-feedback">
                {errors.description}
              </div>
            )}
          </div>

          {/* Type and Priority */}
          <div className="col-md-6 mb-3">
            <label htmlFor="type" className="form-label">
              <i className={`${getTypeIcon(formData.type)} me-2`}></i>
              Tipo
            </label>
            <select
              className="form-select"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              disabled={isSubmitting}
            >
              <option value={ISSUE_TYPE.BUG}>
                🐛 Bug
              </option>
              <option value={ISSUE_TYPE.FEATURE}>
                ⭐ Feature
              </option>
              <option value={ISSUE_TYPE.TASK}>
                ☑️ Task
              </option>
              <option value={ISSUE_TYPE.IMPROVEMENT}>
                ⬆️ Improvement
              </option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="priority" className="form-label">
              <i className={`${getPriorityIcon(formData.priority)} me-2`}></i>
              Prioridad
            </label>
            <select
              className="form-select"
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              disabled={isSubmitting}
            >
              <option value={ISSUE_PRIORITY.LOW}>
                🟢 Baja
              </option>
              <option value={ISSUE_PRIORITY.MEDIUM}>
                🟡 Media
              </option>
              <option value={ISSUE_PRIORITY.HIGH}>
                🔴 Alta
              </option>
              <option value={ISSUE_PRIORITY.CRITICAL}>
                ⚫ Crítica
              </option>
            </select>
          </div>

          {/* Project and Assignee */}
          <div className="col-md-6 mb-3">
            <label htmlFor="projectId" className="form-label">
              <i className="bi bi-folder me-2"></i>
              Proyecto *
            </label>
            <select
              className={`form-select ${errors.projectId ? 'is-invalid' : ''}`}
              id="projectId"
              name="projectId"
              value={formData.projectId}
              onChange={handleInputChange}
              disabled={isSubmitting}
            >
              <option value="">Seleccionar proyecto...</option>
              {mockProjects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
            {errors.projectId && (
              <div className="invalid-feedback">
                {errors.projectId}
              </div>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="assigneeId" className="form-label">
              <i className="bi bi-person me-2"></i>
              Asignado a *
            </label>
            <select
              className={`form-select ${errors.assigneeId ? 'is-invalid' : ''}`}
              id="assigneeId"
              name="assigneeId"
              value={formData.assigneeId}
              onChange={handleInputChange}
              disabled={isSubmitting}
            >
              <option value="">Seleccionar persona...</option>
              {mockUsers.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.role})
                </option>
              ))}
            </select>
            {errors.assigneeId && (
              <div className="invalid-feedback">
                {errors.assigneeId}
              </div>
            )}
          </div>

          {/* Due Date */}
          <div className="col-md-6 mb-3">
            <label htmlFor="dueDate" className="form-label">
              <i className="bi bi-calendar me-2"></i>
              Fecha de vencimiento
            </label>
            <input
              type="date"
              className={`form-control ${errors.dueDate ? 'is-invalid' : ''}`}
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              disabled={isSubmitting}
            />
            {errors.dueDate && (
              <div className="invalid-feedback">
                {errors.dueDate}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="col-md-6 mb-3">
            <label htmlFor="tags" className="form-label">
              <i className="bi bi-tags me-2"></i>
              Tags
            </label>
            <input
              type="text"
              className="form-control"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="authentication, ui, bug (separar con comas)"
              disabled={isSubmitting}
            />
            <small className="form-text text-muted">
              Separa los tags con comas. Ej: authentication, ui, bug
            </small>
          </div>
        </div>
      </form>
    </Modal>
  );
}