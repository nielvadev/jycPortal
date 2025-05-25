# 🚛 JyC Mercancías Portal

**JyC Mercancías Portal** es una aplicación web desarrollada en **Angular 19** que permite gestionar eficientemente el flujo de pedidos, entregas y clientes de JyC Mercancías. Diseñada para ser rápida, intuitiva y escalable.

---

## ✅ Proyecto de Test desarrollado para Misión Empresarial

Este proyecto fue desarrollado como prueba técnica para demostrar habilidades en Angular moderno, buenas prácticas de arquitectura, rendimiento y experiencia de usuario.

---

## Características

-   Gestión completa de pedidos
-   Gestión CRUD de clientes
-   Gestión CRUD de Pedidos
-   Control de entregas y fechas estimadas
-   Dashboards interactivos (gráficas y KPIs)
-   Validaciones reactivas y formularios dinámicos
-   Interfaz moderna con PrimeNG + PrimeFlex
-   Servicio de Manejo de Estados (States Store)
-   Comunicación entre componentes
-   Signals
-   Consumo de API's

---

## Stack Tecnológico

| Tecnología                | Descripción               |
| ------------------------- | ------------------------- |
| **Angular 19**            | Framework principal       |
| **TypeScript**            | Lenguaje tipado           |
| **PrimeNG**               | Componentes UI            |
| **PrimeFlex**             | Utilidades CSS            |
| **Sakai-ng**              | Layout moderno responsivo |
| **RxJS & Signals**        | Programación reactiva     |
| **Formularios Reactivos** | Validaciones dinámicas    |
| **Standalone Components** | Modularidad avanzada      |

---

## Instalación Rápida

```bash
# 1. Clonar el repositorio
git clone https://github.com/nielvadev/jycPortal.git

# 2. Ir al proyecto
cd jycPortal

# 3. Instalar dependencias
npm install

# 4. Ejecutar el servidor de desarrollo
ng serve -o
```

El servidor se abrirá automáticamente en http://localhost:4200

## Configuración del Entorno

Si necesitas configurar entornos personalizados (environment.ts, environment.prod.ts, etc.), asegúrate de modificar las URLs de las APIs en:

```bash
src/environments/environment.ts
```

## Estructura del Proyecto

El proyecto se estructura de la siguiente manera:

```bash
public/                     # Archivos estáticos
src/
│
├── app/
│   ├── shared/             # Componentes y pipes compartidos
│   │   ├── components/     # Componentes reusables
│   │   ├── modules/        # Módulos utilidad (primeNG)
│   │   └── services/       # Servicios reusables
│   │
│   ├── layouts/            # Estructura visual (layout Sakai-ng)
│   │   ├── components/     # Componentes de layout
│   │   └── service/        # Servicios de layout
│   │
│   ├── environments/       # Archivos de entorno
│   └── dashboard-modules/  # Módulos de servicios y helpers
│       ├── clients/        # Módulo de Clientes
│       │   ├── components/ # Módulo de Componentes
│       │   ├── interfaces/ # Módulo de interfaces
│       │   ├── services/   # Módulo de Servicios
│       │   └── views/      # Módulo de Vistas
│       │
│       ├── delivery/       # Módulo de Entregas
│       │   ├── components/ # Módulo de Componentes
│       │   ├── interfaces/ # Módulo de interfaces
│       │   ├── services/   # Módulo de Servicios
│       │   └── views/      # Módulo de Vistas
│       │
│       ├── orders/         # Módulo de Entregas
│       │   ├── components/ # Módulo de Componentes
│       │   ├── interfaces/ # Módulo de interfaces
│       │   ├── services/   # Módulo de Servicios
│       │   └── views/      # Módulo de Vistas
│       │
│       └── products/       # Módulo de Productos
│           ├── components/ # Módulo de Componentes
│           ├── interfaces/ # Módulo de interfaces
│           ├── services/   # Módulo de Servicios
│           └── views/      # Módulo de Vistas
│
├── assets/                 # Hojas de estilo para Layout
└── main.ts                 # Punto de entrada de la app

```

## Scripts Disponibles

```bash
npm run start        # Ejecuta la app en desarrollo
npm run build        # Compila la app para producción
npm run lint         # Revisa errores de estilo
```

## ✅ Validaciones
- Requerido
- Longitud mínima/máxima
- Validación de correo electrónico
- Validación condicional

___

Desarrollado por [@nielvadev](https://github.com/nielvadev) | Juan Daniel Valencia - 2025
