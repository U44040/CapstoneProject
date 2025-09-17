# Issue Tracker System - Sistema de Seguimiento de Problemas

Un sistema modular completo de seguimiento de problemas (issue tracking) desarrollado con Next.js, React y Bootstrap. Diseñado para equipos de desarrollo que necesitan gestionar y dar seguimiento eficiente a bugs, tareas y mejoras.

## 🎯 Características Principales

### 📊 Dashboard Completo
- Vista general del estado de todos los proyectos
- Estadísticas en tiempo real de issues
- Métricas de rendimiento del equipo
- Actividad reciente del sistema

### 🐛 Gestión de Issues
- Creación, edición y eliminación de issues
- Estados: Abierto, En Progreso, Revisión, Bloqueado, Cerrado
- Prioridades: Baja, Media, Alta, Crítica
- Tipos: Bug, Feature, Tarea, Mejora
- Sistema de asignación de usuarios
- Fechas límite y notificaciones de vencimiento

### 📁 Módulo de Proyectos
- Organización de issues por proyectos
- Estadísticas por proyecto
- Seguimiento del progreso
- Estados de proyecto (Activo, En Planificación)

### 🔍 Sistema de Filtros Avanzado
- Filtros por estado, prioridad, asignado, proyecto
- Búsqueda en tiempo real
- Filtros rápidos predefinidos
- Ordenamiento múltiple

### 📈 Reportes y Analytics
- Distribución de issues por estado y prioridad
- Rendimiento por proyecto y usuario
- Métricas de tiempo de resolución
- Exportación de reportes

### 💬 Sistema de Comentarios
- Comentarios en tiempo real
- Historial de actividad
- Notificaciones de cambios

## 🏗️ Arquitectura del Proyecto

```
src/
├── app/                          # Next.js App Router
│   ├── dashboard/                # Dashboard principal
│   ├── issues/                   # Módulo de issues
│   │   ├── [id]/                # Detalles del issue
│   │   └── page.js              # Lista de issues
│   ├── projects/                 # Gestión de proyectos
│   ├── reports/                  # Reportes y analytics
│   ├── layout.js                # Layout principal
│   └── page.js                  # Página de inicio
├── components/                   # Componentes reutilizables
│   ├── common/                  # Navbar, Footer
│   ├── dashboard/               # Componentes del dashboard
│   ├── issues/                  # Componentes de issues
│   └── ui/                      # Componentes UI básicos
├── lib/                         # Utilidades y constantes
│   ├── constants.js             # Constantes del sistema
│   └── utils.js                 # Funciones utilitarias
└── data/                        # Datos mock para desarrollo
    └── mockData.js              # Datos de prueba
```

## 🛠️ Stack Tecnológico

- **Next.js 14+** - Framework de React para aplicaciones de producción
- **React 18+** - Biblioteca para interfaces de usuario
- **Bootstrap 5** - Framework CSS para diseño responsivo
- **Bootstrap Icons** - Iconografía completa
- **ESLint** - Linting y calidad del código

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js 18 o superior
- npm, yarn, pnpm o bun

### Pasos de Instalación

1. **Clonar el repositorio:**
```bash
git clone [repository-url]
cd CapstoneProject
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo:**
```bash
npm run dev
```

4. **Abrir en el navegador:**
   - Ir a [http://localhost:3000](http://localhost:3000) (o el puerto que se asigne automáticamente)

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construir para producción
npm run start    # Servidor de producción
npm run lint     # Ejecutar ESLint
```

## 📱 Características de la Interfaz

### Dashboard
- **Cards de Estadísticas**: Issues abiertos, en progreso, resueltos, vencidos
- **Actividad Reciente**: Timeline de acciones del equipo
- **Gráfico de Prioridades**: Distribución visual de issues por prioridad
- **Acciones Rápidas**: Enlaces directos a funciones importantes

### Gestión de Issues
- **Lista Inteligente**: Filtros dinámicos y búsqueda en tiempo real
- **Vista Detallada**: Información completa, comentarios y actividad
- **Estados Visuales**: Colores y badges para identificación rápida
- **Asignación**: Sistema de usuarios con avatares

### Proyectos
- **Vista de Cards**: Información resumida de cada proyecto
- **Progreso Visual**: Barras de progreso y estadísticas
- **Issues Recientes**: Vista rápida de issues por proyecto
- **Estados de Proyecto**: Seguimiento del ciclo de vida

### Reportes
- **Métricas Clave**: KPIs principales del sistema
- **Distribuciones**: Gráficos de estado, prioridad y proyecto
- **Rendimiento**: Análisis por usuario y proyecto
- **Resoluciones**: Tracking de issues completados

## 🎨 Diseño y UX

### Principios de Diseño
- **Responsive First**: Diseño móvil y desktop
- **Accesibilidad**: Cumple estándares WCAG
- **Consistencia**: Sistema de design tokens
- **Usabilidad**: Navegación intuitiva y clara

### Componentes UI
- **Modal**: Ventanas modales reutilizables
- **Toast**: Notificaciones temporales
- **LoadingSpinner**: Indicadores de carga
- **Cards**: Contenedores de información consistentes

## 📊 Datos y Estructura

### Modelo de Datos
```javascript
// Issue
{
  id, title, description, status, priority, type,
  assigneeId, projectId, createdAt, updatedAt, 
  dueDate, tags, comments
}

// User
{
  id, name, email, avatar, role
}

// Project
{
  id, name, description, color, status
}
```

### Estados del Sistema
- **Issues**: open, in-progress, review, blocked, closed, reopened
- **Prioridades**: low, medium, high, critical
- **Tipos**: bug, feature, task, improvement

## 🔧 Configuración Avanzada

### Personalización
1. **Colores**: Modificar variables CSS en `globals.css`
2. **Constantes**: Ajustar valores en `lib/constants.js`
3. **Datos Mock**: Personalizar en `data/mockData.js`

### Extensiones Futuras
- Integración con APIs reales
- Sistema de autenticación
- Notificaciones push
- Exportación avanzada
- Integración con Git
- Webhooks y automatización

## 📈 Métricas y Monitoreo

El sistema incluye tracking de:
- Tiempo de resolución promedio
- Issues creados vs cerrados
- Rendimiento por usuario
- Carga de trabajo por proyecto
- Tendencias temporales

## 🛡️ Mejores Prácticas Implementadas

- **Componentes Funcionales**: Hooks de React
- **Separación de Responsabilidades**: Arquitectura modular
- **Reutilización**: Componentes DRY
- **Performance**: Optimización de renders
- **SEO**: Meta tags y estructura semántica
- **Accesibilidad**: ARIA labels y navegación por teclado

## 📝 Roadmap

### Fase 2 (Próximamente)
- [ ] Sistema de autenticación
- [ ] API REST completa
- [ ] Base de datos persistente
- [ ] Notificaciones en tiempo real
- [ ] Integración con GitHub/GitLab
- [ ] Aplicación móvil

### Fase 3 (Futuro)
- [ ] Inteligencia artificial para clasificación
- [ ] Métricas avanzadas
- [ ] Integración con herramientas de CI/CD
- [ ] Multi-tenancy
- [ ] Aplicación offline

## 🤝 Contribución

Este es un proyecto académico desarrollado como parte del Capstone Project. Las contribuciones son bienvenidas a través de:

1. Fork del proyecto
2. Crear rama para feature
3. Commit de cambios
4. Push a la rama
5. Crear Pull Request

## 📄 Licencia

Proyecto académico - Capstone Project 2025

## 🔗 Enlaces Útiles

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)

---

**Desarrollado con ❤️ para el Capstone Project 2025**