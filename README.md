# 🧩 Arquitectura General del Proyecto

Este proyecto está compuesto por **dos sistemas independientes pero conectados**: un **sistema administrativo (Admin System)** orientado a la gestión interna, y un **sistema de tienda (Store System)** dirigido al cliente final. Ambos se desarrollan principalmente en **TypeScript**, con la excepción del frontend del *Store System*, que utiliza JavaScript con **Vite + React**.

---

## 🛒 Store System

Sistema orientado al consumidor, diseñado como tienda en línea, con las siguientes características:

### 1. Frontend

* Basado en **Vite** con **React**, utilizando **TailwindCSS** y **React-Bootstrap**.
* Migrado desde un proyecto anterior.
* Productos actualmente mockeados desde la **FakeStoreAPI de Platzi**, usando las mismas categorías definidas en `inventory_db` (solo temporalmente para disponer de imágenes y descripciones).
* Funcionalidades:

  * Página principal
  * Catálogo con barra de filtros
  * Modal de autenticación
  * Carrito de compras
  * Proceso de checkout que genera una orden real en el `sales-service` del sistema administrativo (en desarrollo).

### 2. API Gateway

* Similar al del *Admin System*, implementado con **NestJS** y comunicación por **gRPC**.

### 3. auth-service

* Encargado de la autenticación de clientes.
* Usa cookies para almacenar el *accessToken*.
* Realiza operaciones CRUD sobre los usuarios del store.
* Base de datos: **MongoDB** (`auth_db -> store_customers`), utilizando **Mongoose**.

---

## 🚀 Tecnologías Clave (Admin System, Store System)

* **Frontend**: React, Next.js, Vite, TailwindCSS, MUI, React-Bootstrap
* **Backend**: NestJS, gRPC, REST, Prisma, Mongoose
* **Bases de datos**: PostgreSQL, MongoDB, Redis
* **Infraestructura**: Docker, Docker Compose
* **Seguridad**: Cookies HttpOnly para tokens, rutas protegidas
* **Futuras mejoras**: Redis Pub/Sub, WebSockets, ELK Stack, datos en tiempo real
