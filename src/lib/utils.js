// Utility functions for the application
import { ISSUE_STATUS, STATUS_COLORS, PRIORITY_COLORS, TYPE_COLORS } from './constants';

// Format date to readable format
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Format relative time (e.g., "2 hours ago")
export const formatRelativeTime = (date) => {
  const now = new Date();
  const diffInMs = now - new Date(date);
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInHours < 1) return 'Hace menos de 1 hora';
  if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
  if (diffInDays < 30) return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
  
  return formatDate(date);
};

// Get Bootstrap color class for status
export const getStatusColor = (status) => {
  return STATUS_COLORS[status] || 'secondary';
};

// Get Bootstrap color class for priority
export const getPriorityColor = (priority) => {
  return PRIORITY_COLORS[priority] || 'secondary';
};

// Get Bootstrap color class for type
export const getTypeColor = (type) => {
  return TYPE_COLORS[type] || 'secondary';
};

// Filter issues by various criteria
export const filterIssues = (issues, filters) => {
  return issues.filter(issue => {
    // Filter by status
    if (filters.status && filters.status !== 'all' && issue.status !== filters.status) {
      return false;
    }

    // Filter by priority
    if (filters.priority && filters.priority !== 'all' && issue.priority !== filters.priority) {
      return false;
    }

    // Filter by assignee
    if (filters.assignee && filters.assignee !== 'all' && issue.assigneeId !== filters.assignee) {
      return false;
    }

    // Filter by project
    if (filters.project && filters.project !== 'all' && issue.projectId !== filters.project) {
      return false;
    }

    // Search in title and description
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return issue.title.toLowerCase().includes(searchLower) ||
             issue.description.toLowerCase().includes(searchLower);
    }

    return true;
  });
};

// Sort issues by various criteria
export const sortIssues = (issues, sortBy, sortOrder = 'desc') => {
  return [...issues].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'createdAt':
        comparison = new Date(a.createdAt) - new Date(b.createdAt);
        break;
      case 'updatedAt':
        comparison = new Date(a.updatedAt) - new Date(b.updatedAt);
        break;
      case 'priority':
        const priorityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      default:
        comparison = a.id - b.id;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
};

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Calculate issue statistics
export const calculateStats = (issues) => {
  const stats = {
    total: issues.length,
    open: 0,
    inProgress: 0,
    review: 0,
    blocked: 0,
    closed: 0,
    overdue: 0
  };

  const now = new Date();

  issues.forEach(issue => {
    switch (issue.status) {
      case ISSUE_STATUS.OPEN:
        stats.open++;
        break;
      case ISSUE_STATUS.IN_PROGRESS:
        stats.inProgress++;
        break;
      case ISSUE_STATUS.REVIEW:
        stats.review++;
        break;
      case ISSUE_STATUS.BLOCKED:
        stats.blocked++;
        break;
      case ISSUE_STATUS.CLOSED:
        stats.closed++;
        break;
    }

    // Check if overdue
    if (issue.dueDate && new Date(issue.dueDate) < now && issue.status !== ISSUE_STATUS.CLOSED) {
      stats.overdue++;
    }
  });

  return stats;
};