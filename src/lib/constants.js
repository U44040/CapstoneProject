// Status constants
export const ISSUE_STATUS = {
  OPEN: 'open',
  IN_PROGRESS: 'in-progress',
  REVIEW: 'review',
  BLOCKED: 'blocked',
  CLOSED: 'closed',
  REOPENED: 'reopened'
};

// Priority constants
export const ISSUE_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

// Issue types
export const ISSUE_TYPE = {
  BUG: 'bug',
  FEATURE: 'feature',
  TASK: 'task',
  IMPROVEMENT: 'improvement'
};

// Status colors for Bootstrap
export const STATUS_COLORS = {
  [ISSUE_STATUS.OPEN]: 'primary',
  [ISSUE_STATUS.IN_PROGRESS]: 'warning',
  [ISSUE_STATUS.REVIEW]: 'info',
  [ISSUE_STATUS.BLOCKED]: 'danger',
  [ISSUE_STATUS.CLOSED]: 'success',
  [ISSUE_STATUS.REOPENED]: 'secondary'
};

// Priority colors for Bootstrap
export const PRIORITY_COLORS = {
  [ISSUE_PRIORITY.LOW]: 'success',
  [ISSUE_PRIORITY.MEDIUM]: 'warning',
  [ISSUE_PRIORITY.HIGH]: 'danger',
  [ISSUE_PRIORITY.CRITICAL]: 'dark'
};

// Type colors for Bootstrap
export const TYPE_COLORS = {
  [ISSUE_TYPE.BUG]: 'danger',
  [ISSUE_TYPE.FEATURE]: 'primary',
  [ISSUE_TYPE.TASK]: 'info',
  [ISSUE_TYPE.IMPROVEMENT]: 'warning'
};

// Navigation items
export const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: 'speedometer2' },
  { href: '/issues', label: 'Issues', icon: 'bug' },
  { href: '/projects', label: 'Projects', icon: 'folder' },
  { href: '/reports', label: 'Reports', icon: 'graph-up' }
];