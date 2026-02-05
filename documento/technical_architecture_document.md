# Technical Architecture Document – Proyecto Biodiversidad

## 1. Descripción General

El proyecto **Biodiversidad** es una aplicación web desarrollada con Next.js orientada a la visualización, consulta y difusión de información relacionada con biodiversidad (especies, categorías, regiones y contenidos educativos).

A diferencia del proyecto original de tipo *SaaS Dashboard*, este sistema está pensado principalmente como una **plataforma pública, informativa y educativa**, con énfasis en la lectura de datos, el SEO y la accesibilidad.

Repositorio base: `nextjs-bio2`


## 2. Tech Stack

### 2.1. Frontend
- Framework: **Next.js** (App Router)
- Lenguaje: **TypeScript**
- Estilos: **Tailwind CSS**
- UI: componentes reutilizables propios
- Renderizado: **Server Components** por defecto, **Client Components** cuando se requiere interactividad

### 2.2. Backend / Datos
- Plataforma: **Supabase**
- Base de datos: **PostgreSQL**
- Autenticación: Supabase Auth (opcional, para futuras extensiones)
- API: consultas a Supabase desde Server Components
- Storage (opcional): imágenes de especies y recursos educativos

### 2.3. Deployment
- **Vercel** para frontend
- **Supabase** como backend (DB, Auth, Storage)


## 3. Estructura del Proyecto

/
├── src/
│ ├── app/
│ │ ├── layout.tsx                                      # Layout raíz
│ │ ├── page.tsx                                        # Página principal
│ │ ├── api/                                            # API Routes
│ │ │ ├── consultants/                                  # Gestión de consultores
│ │ │ ├── moderation/                                   # Moderación de contenido
│ │ │ ├── offers/                                       # Ofertas laborales
│ │ │ ├── products/                                     # Productos del marketplace
│ │ │ ├── subscriptions/                                # Gestión de suscripciones
│ │ │ ├── user/                                         # Gestión de usuarios
│ │ │ └── seed/                                         # Datos de prueba
│ │ ├── campanas/page.tsx                               # Campañas de apoyo
│ │ ├── consultores/page.tsx                            # Directorio de consultores
│ │ ├── educacion/page.tsx                              # Contenido educativo
│ │ ├── marketplace/page.tsx                            # Marketplace de productos
│ │ ├── membresias/page.tsx                             # Gestión de membresías
│ │ ├── perfil/page.tsx                                 # Perfil de usuario
│ │ ├── login/page.tsx                                  # Inicio de sesión
│ │ └── registro/page.tsx                               # Registro de usuarios
│ ├── components/
│ │ ├── ui/                                              # Componentes UI reutilizables
│ │ │ ├── AuthButtons.tsx
│ │ │ ├── Button.tsx
│ │ │ ├── Card.tsx
│ │ │ ├── Footer.tsx
│ │ │ ├── UserAvatar.tsx
│ │ │ └── ...
│ │ ├── slider/                                          # Componente slider
│ │ │ └── Slider.tsx
│ │ ├── AuthProvider.tsx                                 # Contexto de autenticación
│ │ ├── Navbar.tsx                                       # Navegación principal
│ │ ├── CampanasSection.tsx                              # Sección de campañas
│ │ ├── ConsultantGrid.tsx                               # Grid de consultores
│ │ ├── EducacionGrid.tsx                                # Grid educativo
│ │ ├── OfferGrid.tsx                                    # Grid de ofertas
│ │ ├── ProductForm.tsx                                  # Formulario de productos
│ │ ├── ProfileForm.tsx                                  # Formulario de perfil
│ │ └── ...                                              # Otros componentes específicos
│ ├── lib/
│ │ ├── auth-helper.ts                                   # Utilidades de autenticación
│ │ ├── db.ts                                            # Configuración de base de datos
│ │ ├── email.ts                                         # Utilidades de email
│ │ ├── supabase.ts                                      # Cliente Supabase
│ │ └── utils.ts                                         # Utilidades generales
│ └── middleware.ts                                      # Middleware de Next.js
├── public/
│ └── assets/                                            # Imágenes y recursos estáticos
│     ├── category/                                      # Imágenes de categorías
│     ├── featured/                                      # Imágenes destacadas
│     ├── slider/                                        # Imágenes del slider
│     └── ...                                            # Otros recursos
├── documento/
│ └── technical_architecture_document.md                 # Este documento
├── package.json                                         # Dependencias del proyecto
├── next.config.ts                                       # Configuración de Next.js
├── tsconfig.json                                        # Configuración de TypeScript
└── README.md                                            # Documentación del proyecto

## 4. Modelo de Datos (Propuesto)

### public.species
- id: uuid (PK)
- scientific_name: text
- common_name: text
- category: text (mamífero, ave, planta, etc.)
- conservation_status: text (LC, NT, VU, EN, CR)
- description: text
- image_url: text
- created_at: timestamptz

### public.categories
- id: uuid (PK)
- name: text
- description: text

### public.regions
- id: uuid (PK)
- name: text
- description: text

## 5. Flujos Principales

### 5.1. Navegación General
- Página principal con introducción a la biodiversidad
- Acceso público a secciones de especies, categorías y regiones
- No requiere autenticación para navegación básica

### 5.2. Listado y Detalle de Especies
- Listado filtrable por categoría, región o estado de conservación
- Página de detalle con información completa de cada especie
- Renderizado en servidor para optimizar SEO

### 5.3. Filtros y Búsqueda
- Búsqueda por nombre común o científico
- Filtros implementados con Client Components
- Consultas optimizadas a Supabase

## 6. Buenas Prácticas
- Priorizar **Server Components** para lectura de datos
- Usar Client Components solo cuando haya estado o interacción
- No exponer claves sensibles
- Uso consistente de Tailwind CSS
- Componentes desacoplados y reutilizables


## 7. Desarrollo Local

1. Instalar dependencias:
   ```bash
   npm install
