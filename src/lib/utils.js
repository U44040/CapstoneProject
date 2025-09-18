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

// Update mockData file with new issue (simulation for development)
export const updateMockDataWithNewIssue = async (newIssue) => {
  try {
    // In a real application, this would be an API call
    // For development, we'll simulate the update and log it
    console.log('🔄 Simulando actualización de mockData.js con nuevo issue:', {
      id: newIssue.id,
      title: newIssue.title,
      type: newIssue.type,
      priority: newIssue.priority,
      assigneeId: newIssue.assigneeId,
      projectId: newIssue.projectId,
      createdAt: newIssue.createdAt
    });

    // Store in localStorage as a temporary persistence solution
    const existingIssues = JSON.parse(localStorage.getItem('customIssues') || '[]');
    const updatedIssues = [newIssue, ...existingIssues];
    localStorage.setItem('customIssues', JSON.stringify(updatedIssues));

    console.log('✅ Issue guardado en localStorage para persistencia temporal');
    
    // In a real app, you would make an API call like:
    // const response = await fetch('/api/issues', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newIssue)
    // });
    // return response.json();

    return { success: true, issue: newIssue };
  } catch (error) {
    console.error('❌ Error al actualizar mockData:', error);
    throw error;
  }
};

// Get issues from localStorage and merge with mockData
export const getAllIssues = (mockIssues) => {
  try {
    const customIssues = JSON.parse(localStorage.getItem('customIssues') || '[]');
    // Merge custom issues with mock issues, with custom issues first
    return [...customIssues, ...mockIssues];
  } catch (error) {
    console.error('Error al cargar issues personalizados:', error);
    return mockIssues;
  }
};

// Clear custom issues from localStorage (utility function)
export const clearCustomIssues = () => {
  localStorage.removeItem('customIssues');
  console.log('🗑️ Issues personalizados eliminados del localStorage');
};

// Get only custom issues from localStorage
export const getCustomIssues = () => {
  try {
    return JSON.parse(localStorage.getItem('customIssues') || '[]');
  } catch (error) {
    console.error('Error al cargar issues personalizados:', error);
    return [];
  }
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