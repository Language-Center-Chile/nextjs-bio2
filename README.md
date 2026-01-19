
# Projecto Biodiversidad 🍃

Plataforma web para la gestión y visualización de información relacionada con biodiversidad, desarrollada con Next.js y Supabase.

## Estado del proyecto

🚧 Proyecto en desarrollo activo.  
Algunas tecnologías pueden cambiar y no todas las funcionalidades están finalizadas.

Puede acceder al proyecto online con:
https://consultores.biodiversidad.cl/

## Stack Tecnológico

### Core
- Node.js
- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript

### UI
- Tailwind

### Backend / Servicios
- Supabase (PostgreSQL, Auth)
- Nodemailer (envío de correos)

### Tooling
- ESLint (configuración Next.js)

## Instalación

Instala el proyecto en tu terminal.

```bash
git clone https://github.com/Language-Center-Chile/nextjs-bio2.git

cd nextjs-bio2
```
## Desplegar servidor local.

Primero, corre el servidor de desarrollo:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Abre [http://localhost:3000](http://localhost:3000) con tu navegador para ver el resultado.
## Base de datos

Este proyecto utiliza **Supabase** como plataforma de base de datos y backend (PostgreSQL gestionado).

La base de datos se usa para:
- Almacenamiento persistente de datos
- Autenticación y manejo de usuarios (si aplica)
- Funcionalidades backend relacionadas

No es necesario configurar manualmente la base de datos para desarrollo básico.
Solo debes definir las variables de entorno correspondientes en el archivo `.env`.

Más información sobre Supabase:
👉 https://supabase.com/docs

## Despliegue en Vercel

La forma más sencilla de desplegar la aplicación Next.js que encontramos es utilizar la [plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), creada por los desarrolladores de Next.js.

Puedes consultar la [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para obtener más detalles.


