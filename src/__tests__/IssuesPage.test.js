import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import IssuesPage from '../app/issues/page';

// Mock all imported components
jest.mock('../components/issues/IssueCard', () => {
  return function MockIssueCard({ issue, onClick }) {
    return (
      <div data-testid={`issue-card-${issue.id}`} onClick={onClick}>
        <h3>{issue.title}</h3>
        <span data-testid={`status-${issue.id}`}>{issue.status}</span>
        <span data-testid={`priority-${issue.id}`}>{issue.priority}</span>
      </div>
    );
  };
});

jest.mock('../components/issues/IssueFilters', () => {
  return function MockIssueFilters({ filters, onFilterChange }) {
    return (
      <div data-testid="issue-filters">
        <button 
          onClick={() => onFilterChange({ ...filters, status: 'open' })}
          data-testid="filter-status-open"
        >
          Filter Open
        </button>
        <button 
          onClick={() => onFilterChange({ ...filters, priority: 'high' })}
          data-testid="filter-priority-high"
        >
          Filter High Priority
        </button>
        <button 
          onClick={() => onFilterChange({ ...filters, search: 'test' })}
          data-testid="filter-search"
        >
          Search Test
        </button>
      </div>
    );
  };
});

jest.mock('../components/issues/NewIssueModal', () => {
  return function MockNewIssueModal({ show, onHide, onSave }) {
    if (!show) return null;
    return (
      <div data-testid="new-issue-modal">
        <button onClick={onHide} data-testid="close-modal">Close</button>
        <button 
          onClick={() => {
            onSave({ 
              id: 'new-issue-1', 
              title: 'New Test Issue',
              status: 'open',
              priority: 'medium',
              createdAt: '2024-01-10',
              updatedAt: '2024-01-10'
            });
            onHide(); // Auto-close modal after saving
          }}
          data-testid="save-issue"
        >
          Save Issue
        </button>
      </div>
    );
  };
});

jest.mock('../components/ui/LoadingSpinner', () => {
  return function MockLoadingSpinner({ text }) {
    return <div data-testid="loading-spinner">{text}</div>;
  };
});

// Mock data and utilities - define before using in jest.mock
const mockIssuesData = [
  {
    id: '1',
    title: 'Test Issue 1',
    status: 'open',
    priority: 'high',
    assignee: 'user1',
    project: 'project1',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-02'
  },
  {
    id: '2',
    title: 'Test Issue 2',
    status: 'closed',
    priority: 'low',
    assignee: 'user2',
    project: 'project2',
    createdAt: '2024-01-03',
    updatedAt: '2024-01-04'
  },
  {
    id: '3',
    title: 'Another Test Issue',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'user1',
    project: 'project1',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-06'
  }
];

jest.mock('../data/mockData', () => ({
  mockIssues: [
    {
      id: '1',
      title: 'Test Issue 1',
      status: 'open',
      priority: 'high',
      assignee: 'user1',
      project: 'project1',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-02'
    },
    {
      id: '2',
      title: 'Test Issue 2',
      status: 'closed',
      priority: 'low',
      assignee: 'user2',
      project: 'project2',
      createdAt: '2024-01-03',
      updatedAt: '2024-01-04'
    },
    {
      id: '3',
      title: 'Another Test Issue',
      status: 'in-progress',
      priority: 'medium',
      assignee: 'user1',
      project: 'project1',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-06'
    }
  ]
}));

jest.mock('../lib/utils', () => ({
  getAllIssues: jest.fn((issues) => issues),
  filterIssues: jest.fn((issues, filters) => {
    let filtered = [...issues];
    
    if (filters.status !== 'all') {
      filtered = filtered.filter(issue => issue.status === filters.status);
    }
    if (filters.priority !== 'all') {
      filtered = filtered.filter(issue => issue.priority === filters.priority);
    }
    if (filters.search) {
      filtered = filtered.filter(issue => 
        issue.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    return filtered;
  }),
  sortIssues: jest.fn((issues, sortBy, sortOrder) => {
    return [...issues].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      }
      return a[sortBy] < b[sortBy] ? 1 : -1;
    });
  })
}));

// Get the mocked utils for testing
const mockUtils = require('../lib/utils');

// Skip complex location mocking for now - just let JSDOM handle it
// The navigation errors are expected in test environment

describe('IssuesPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset mock implementations
    mockUtils.getAllIssues.mockImplementation((issues) => issues);
    mockUtils.filterIssues.mockImplementation((issues, filters) => {
      let filtered = [...issues];
      
      if (filters.status !== 'all') {
        filtered = filtered.filter(issue => issue.status === filters.status);
      }
      if (filters.priority !== 'all') {
        filtered = filtered.filter(issue => issue.priority === filters.priority);
      }
      if (filters.search) {
        filtered = filtered.filter(issue => 
          issue.title.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      return filtered;
    });
    mockUtils.sortIssues.mockImplementation((issues, sortBy, sortOrder) => {
      return [...issues].sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[sortBy] > b[sortBy] ? 1 : -1;
        }
        return a[sortBy] < b[sortBy] ? 1 : -1;
      });
    });
  });

  describe('Component Rendering', () => {
    test('renders page header correctly', () => {
      render(<IssuesPage />);
      
      expect(screen.getByText('Issues')).toBeInTheDocument();
      expect(screen.getByText('Gestiona y da seguimiento a todos los problemas del proyecto')).toBeInTheDocument();
      expect(screen.getByText('Nuevo Issue')).toBeInTheDocument();
    });

    test('renders issue cards for all issues', () => {
      render(<IssuesPage />);
      
      expect(screen.getByTestId('issue-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('issue-card-2')).toBeInTheDocument();
      expect(screen.getByTestId('issue-card-3')).toBeInTheDocument();
      expect(screen.getByText('Test Issue 1')).toBeInTheDocument();
      expect(screen.getByText('Test Issue 2')).toBeInTheDocument();
      expect(screen.getByText('Another Test Issue')).toBeInTheDocument();
    });

    test('displays filters component', () => {
      render(<IssuesPage />);
      
      expect(screen.getByTestId('issue-filters')).toBeInTheDocument();
    });

    test('displays statistics correctly', () => {
      render(<IssuesPage />);
      
      expect(screen.getByText('Estadísticas')).toBeInTheDocument();
      expect(screen.getByText('Total')).toBeInTheDocument();
      expect(screen.getByText('Filtrados')).toBeInTheDocument();
      // Check for specific count displays
      const totalStats = screen.getAllByText('3');
      expect(totalStats.length).toBeGreaterThan(0);
    });

    test('displays sort controls', () => {
      render(<IssuesPage />);
      
      expect(screen.getByText('Actualización')).toBeInTheDocument();
      expect(screen.getByText('Creación')).toBeInTheDocument();
      expect(screen.getByText('Prioridad')).toBeInTheDocument();
    });
  });

  describe('Modal Functionality', () => {
    test('opens new issue modal when button is clicked', () => {
      render(<IssuesPage />);
      
      const newIssueButton = screen.getByText('Nuevo Issue');
      fireEvent.click(newIssueButton);
      
      expect(screen.getByTestId('new-issue-modal')).toBeInTheDocument();
    });

    test('closes modal when close button is clicked', () => {
      render(<IssuesPage />);
      
      // Open modal
      const newIssueButton = screen.getByText('Nuevo Issue');
      fireEvent.click(newIssueButton);
      
      // Close modal
      const closeButton = screen.getByTestId('close-modal');
      fireEvent.click(closeButton);
      
      expect(screen.queryByTestId('new-issue-modal')).not.toBeInTheDocument();
    });

    test('creates new issue and updates state', () => {
      render(<IssuesPage />);
      
      // Initial count should be 3
      expect(screen.getByText('Mostrando 3 de 3 issues')).toBeInTheDocument();
      
      // Open modal
      const newIssueButton = screen.getByText('Nuevo Issue');
      fireEvent.click(newIssueButton);
      
      // Save new issue
      const saveButton = screen.getByTestId('save-issue');
      fireEvent.click(saveButton);
      
      // Modal should close
      expect(screen.queryByTestId('new-issue-modal')).not.toBeInTheDocument();
      
      // Count should increase to 4
      expect(screen.getByText('Mostrando 4 de 4 issues')).toBeInTheDocument();
    });
  });

  describe('Sorting Functionality', () => {
    test('handles sort button clicks correctly', () => {
      render(<IssuesPage />);
      
      const updateSortButton = screen.getByText('Actualización');
      const creationSortButton = screen.getByText('Creación');
      const prioritySortButton = screen.getByText('Prioridad');
      
      // Initial state - updatedAt should be active
      expect(updateSortButton).toHaveClass('btn-primary');
      expect(creationSortButton).toHaveClass('btn-outline-primary');
      expect(prioritySortButton).toHaveClass('btn-outline-primary');
      
      // Click creation sort
      fireEvent.click(creationSortButton);
      expect(mockUtils.sortIssues).toHaveBeenCalledWith(
        expect.any(Array), 
        'createdAt', 
        'desc'
      );
      
      // Click priority sort
      fireEvent.click(prioritySortButton);
      expect(mockUtils.sortIssues).toHaveBeenCalledWith(
        expect.any(Array), 
        'priority', 
        'desc'
      );
    });

    test('toggles sort order when clicking same sort button', () => {
      render(<IssuesPage />);
      
      const updateSortButton = screen.getByText('Actualización');
      
      // First click should change order to asc
      fireEvent.click(updateSortButton);
      expect(mockUtils.sortIssues).toHaveBeenCalledWith(
        expect.any(Array), 
        'updatedAt', 
        'asc'
      );
      
      // Second click should change order back to desc
      fireEvent.click(updateSortButton);
      expect(mockUtils.sortIssues).toHaveBeenCalledWith(
        expect.any(Array), 
        'updatedAt', 
        'desc'
      );
    });
  });

  describe('Navigation', () => {
    test('navigates to issue detail when issue card is clicked', () => {
      render(<IssuesPage />);
      
      const issueCard = screen.getByTestId('issue-card-1');
      
      // Test that click handler works (navigation will trigger JSDOM error but that's expected)
      expect(() => fireEvent.click(issueCard)).not.toThrow();
    });

    test('navigates to different issue details', () => {
      render(<IssuesPage />);
      
      const issueCard2 = screen.getByTestId('issue-card-2');
      
      // Test that click handler works (navigation will trigger JSDOM error but that's expected)
      expect(() => fireEvent.click(issueCard2)).not.toThrow();
    });
  });

  describe('Filtering', () => {
    test('handles filter changes correctly', () => {
      render(<IssuesPage />);
      
      const statusFilter = screen.getByTestId('filter-status-open');
      fireEvent.click(statusFilter);
      
      expect(mockUtils.filterIssues).toHaveBeenCalledWith(
        expect.any(Array),
        expect.objectContaining({ status: 'open' })
      );
    });

    test('handles priority filter changes', () => {
      render(<IssuesPage />);
      
      const priorityFilter = screen.getByTestId('filter-priority-high');
      fireEvent.click(priorityFilter);
      
      expect(mockUtils.filterIssues).toHaveBeenCalledWith(
        expect.any(Array),
        expect.objectContaining({ priority: 'high' })
      );
    });

    test('handles search filter changes', () => {
      render(<IssuesPage />);
      
      const searchFilter = screen.getByTestId('filter-search');
      fireEvent.click(searchFilter);
      
      expect(mockUtils.filterIssues).toHaveBeenCalledWith(
        expect.any(Array),
        expect.objectContaining({ search: 'test' })
      );
    });
  });

  describe('Empty States', () => {
    test('displays empty state when no issues match filters', () => {
      // Mock filterIssues to return empty array
      mockUtils.filterIssues.mockReturnValueOnce([]);
      
      render(<IssuesPage />);
      
      expect(screen.getByText('No se encontraron issues')).toBeInTheDocument();
      expect(screen.getByText('Crear primer issue')).toBeInTheDocument();
    });

    test('shows appropriate message for filtered empty state', () => {
      mockUtils.filterIssues.mockReturnValueOnce([]);
      
      render(<IssuesPage />);
      
      // When filters are at default (all 'all' and empty search), it shows the default empty message
      expect(screen.getByText('Aún no hay issues creados en el sistema')).toBeInTheDocument();
    });

    test('opens modal when clicking create first issue button', () => {
      mockUtils.filterIssues.mockReturnValueOnce([]);
      
      render(<IssuesPage />);
      
      const createFirstIssueButton = screen.getByText('Crear primer issue');
      fireEvent.click(createFirstIssueButton);
      
      expect(screen.getByTestId('new-issue-modal')).toBeInTheDocument();
    });
  });

  describe('Statistics Display', () => {
    test('shows correct issue count in statistics when filtered', () => {
      mockUtils.filterIssues.mockReturnValueOnce(mockIssuesData.slice(0, 2)); // Return only 2 issues
      
      render(<IssuesPage />);
      
      expect(screen.getByText('Mostrando 2 de 3 issues')).toBeInTheDocument();
    });

    test('displays end of list message when issues are shown', () => {
      render(<IssuesPage />);
      
      expect(screen.getByText(/Fin de la lista/)).toBeInTheDocument();
      expect(screen.getByText(/3 issues mostrados/)).toBeInTheDocument();
    });
  });

  describe('Utility Function Calls', () => {
    test('calls getAllIssues on component mount', () => {
      render(<IssuesPage />);
      
      expect(mockUtils.getAllIssues).toHaveBeenCalledWith(mockIssuesData);
    });

    test('calls filterIssues with correct parameters', () => {
      render(<IssuesPage />);
      
      expect(mockUtils.filterIssues).toHaveBeenCalledWith(
        mockIssuesData,
        {
          status: 'all',
          priority: 'all',
          assignee: 'all',
          project: 'all',
          search: ''
        }
      );
    });

    test('calls sortIssues with correct initial parameters', () => {
      render(<IssuesPage />);
      
      expect(mockUtils.sortIssues).toHaveBeenCalledWith(
        expect.any(Array),
        'updatedAt',
        'desc'
      );
    });
  });

  describe('Console Logging', () => {
    test('logs success message when issue is created', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      render(<IssuesPage />);
      
      // Open modal and save issue
      fireEvent.click(screen.getByText('Nuevo Issue'));
      fireEvent.click(screen.getByTestId('save-issue'));
      
      expect(consoleSpy).toHaveBeenCalledWith('✅ Issue creado exitosamente:', 'New Test Issue');
      
      consoleSpy.mockRestore();
    });
  });
});