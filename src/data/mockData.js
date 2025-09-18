// Mock data for development and testing
import { ISSUE_STATUS, ISSUE_PRIORITY, ISSUE_TYPE } from '../lib/constants';

// Mock users
export const mockUsers = [
  {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan.perez@company.com',
    initials: 'JP',
    color: 'primary',
    role: 'developer'
  },
  {
    id: 2,
    name: 'María García',
    email: 'maria.garcia@company.com',
    initials: 'MG',
    color: 'success',
    role: 'designer'
  },
  {
    id: 3,
    name: 'Carlos López',
    email: 'carlos.lopez@company.com',
    initials: 'CL',
    color: 'warning',
    role: 'manager'
  },
  {
    id: 4,
    name: 'Ana Martínez',
    email: 'ana.martinez@company.com',
    initials: 'AM',
    color: 'info',
    role: 'qa'
  }
];

// Mock projects
export const mockProjects = [
  {
    id: 1,
    name: 'Sistema Web Principal',
    description: 'Desarrollo del sistema web principal de la empresa',
    color: 'primary',
    status: 'active'
  },
  {
    id: 2,
    name: 'App Mobile',
    description: 'Aplicación móvil para clientes',
    color: 'success',
    status: 'active'
  },
  {
    id: 3,
    name: 'API Backend',
    description: 'API REST para servicios internos',
    color: 'warning',
    status: 'active'
  },
  {
    id: 4,
    name: 'Dashboard Admin',
    description: 'Panel de administración interno',
    color: 'info',
    status: 'planning'
  }
];

// Mock issues
export const mockIssues = [
  {
    id: 1,
    title: 'Error en login con usuarios especiales',
    description: 'Los usuarios con caracteres especiales en el nombre no pueden hacer login correctamente.',
    status: ISSUE_STATUS.OPEN,
    priority: ISSUE_PRIORITY.HIGH,
    type: ISSUE_TYPE.BUG,
    assigneeId: 1,
    projectId: 1,
    createdAt: '2025-09-15T10:30:00Z',
    updatedAt: '2025-09-16T14:20:00Z',
    dueDate: '2025-09-20T23:59:59Z',
    tags: ['authentication', 'urgent'],
    comments: 3
  },
  {
    id: 2,
    title: 'Implementar notificaciones push',
    description: 'Añadir sistema de notificaciones push para la aplicación móvil.',
    status: ISSUE_STATUS.IN_PROGRESS,
    priority: ISSUE_PRIORITY.MEDIUM,
    type: ISSUE_TYPE.FEATURE,
    assigneeId: 2,
    projectId: 2,
    createdAt: '2025-09-14T09:15:00Z',
    updatedAt: '2025-09-17T11:45:00Z',
    dueDate: '2025-09-25T23:59:59Z',
    tags: ['notifications', 'mobile'],
    comments: 1
  },
  {
    id: 3,
    title: 'Optimizar consultas de base de datos',
    description: 'Las consultas de reportes están tardando demasiado tiempo en ejecutarse.',
    status: ISSUE_STATUS.REVIEW,
    priority: ISSUE_PRIORITY.MEDIUM,
    type: ISSUE_TYPE.IMPROVEMENT,
    assigneeId: 1,
    projectId: 3,
    createdAt: '2025-09-12T16:00:00Z',
    updatedAt: '2025-09-16T18:30:00Z',
    dueDate: '2025-09-22T23:59:59Z',
    tags: ['performance', 'database'],
    comments: 5
  },
  {
    id: 4,
    title: 'Crear documentación de API',
    description: 'Generar documentación completa de todos los endpoints de la API.',
    status: ISSUE_STATUS.BLOCKED,
    priority: ISSUE_PRIORITY.LOW,
    type: ISSUE_TYPE.TASK,
    assigneeId: 3,
    projectId: 3,
    createdAt: '2025-09-10T14:20:00Z',
    updatedAt: '2025-09-15T10:10:00Z',
    dueDate: '2025-09-30T23:59:59Z',
    tags: ['documentation', 'api'],
    comments: 2
  },
  {
    id: 5,
    title: 'Corregir diseño responsive en tablets',
    description: 'El diseño no se ve correctamente en dispositivos tablet.',
    status: ISSUE_STATUS.CLOSED,
    priority: ISSUE_PRIORITY.MEDIUM,
    type: ISSUE_TYPE.BUG,
    assigneeId: 2,
    projectId: 1,
    createdAt: '2025-09-08T11:30:00Z',
    updatedAt: '2025-09-14T16:45:00Z',
    dueDate: '2025-09-18T23:59:59Z',
    tags: ['responsive', 'ui'],
    comments: 4
  },
  {
    id: 6,
    title: 'Integrar sistema de pagos',
    description: 'Implementar integración con gateway de pagos para procesar transacciones.',
    status: ISSUE_STATUS.OPEN,
    priority: ISSUE_PRIORITY.CRITICAL,
    type: ISSUE_TYPE.FEATURE,
    assigneeId: 1,
    projectId: 2,
    createdAt: '2025-09-16T08:00:00Z',
    updatedAt: '2025-09-17T09:20:00Z',
    dueDate: '2025-09-19T23:59:59Z',
    tags: ['payments', 'integration', 'critical'],
    comments: 0
  },
  {
    id: 7,
    title: 'Actualizar dependencias del proyecto',
    description: 'Revisar y actualizar todas las dependencias a sus versiones más recientes.',
    status: ISSUE_STATUS.IN_PROGRESS,
    priority: ISSUE_PRIORITY.LOW,
    type: ISSUE_TYPE.TASK,
    assigneeId: 4,
    projectId: 1,
    createdAt: '2025-09-13T13:45:00Z',
    updatedAt: '2025-09-17T10:15:00Z',
    dueDate: '2025-09-28T23:59:59Z',
    tags: ['maintenance', 'dependencies'],
    comments: 1
  },
  {
    id: 8,
    title: 'Error de memoria en procesamiento masivo',
    description: 'La aplicación consume demasiada memoria al procesar archivos grandes.',
    status: ISSUE_STATUS.OPEN,
    priority: ISSUE_PRIORITY.HIGH,
    type: ISSUE_TYPE.BUG,
    assigneeId: 1,
    projectId: 3,
    createdAt: '2025-09-17T07:30:00Z',
    updatedAt: '2025-09-17T07:30:00Z',
    dueDate: '2025-09-21T23:59:59Z',
    tags: ['performance', 'memory'],
    comments: 0
  }
];

// Mock comments for issues
export const mockComments = [
  {
    id: 1,
    issueId: 1,
    userId: 2,
    content: 'He reproducido el error con usuarios que tienen acentos en el nombre.',
    createdAt: '2025-09-16T10:15:00Z'
  },
  {
    id: 2,
    issueId: 1,
    userId: 3,
    content: 'Prioridad alta por afectar a varios usuarios.',
    createdAt: '2025-09-16T14:20:00Z'
  },
  {
    id: 3,
    issueId: 1,
    userId: 1,
    content: 'Trabajando en una solución, debería estar listo mañana.',
    createdAt: '2025-09-16T16:30:00Z'
  },
  {
    id: 4,
    issueId: 2,
    userId: 2,
    content: 'Ya tengo configurado Firebase para las notificaciones.',
    createdAt: '2025-09-17T11:45:00Z'
  },
  {
    id: 5,
    issueId: 3,
    userId: 4,
    content: 'Los tests de performance muestran mejora del 40%.',
    createdAt: '2025-09-16T18:30:00Z'
  }
];

// Mock activity log
export const mockActivity = [
  {
    id: 1,
    type: 'issue_created',
    userId: 1,
    issueId: 8,
    description: 'creó el issue "Error de memoria en procesamiento masivo"',
    createdAt: '2025-09-17T07:30:00Z'
  },
  {
    id: 2,
    type: 'issue_updated',
    userId: 2,
    issueId: 2,
    description: 'actualizó el estado a "En Progreso"',
    createdAt: '2025-09-17T11:45:00Z'
  },
  {
    id: 3,
    type: 'comment_added',
    userId: 2,
    issueId: 2,
    description: 'añadió un comentario',
    createdAt: '2025-09-17T11:45:00Z'
  },
  {
    id: 4,
    type: 'issue_assigned',
    userId: 3,
    issueId: 6,
    description: 'asignó el issue a Juan Pérez',
    createdAt: '2025-09-17T09:20:00Z'
  },
  {
    id: 5,
    type: 'issue_closed',
    userId: 2,
    issueId: 5,
    description: 'cerró el issue "Corregir diseño responsive en tablets"',
    createdAt: '2025-09-14T16:45:00Z'
  }
];