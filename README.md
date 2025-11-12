# E-commerce Hermanos Jota - Sprints 5 & 6 (MERN)

Proyecto final para los Sprints 5 y 6 de la Escuela de Innovación ITBA. Este proyecto transforma una aplicación React con una API estática en una aplicación web MERN full-stack con persistencia de datos.

Se implementó una API CRUD completa con Express y MongoDB y se refactorizó el frontend de React para usar React Router DOM para navegación dinámica.

## 🚀 Enlaces de Despliegue

* **Frontend (React en Vercel):** `https://ecommerce-hermanos-jota-mern.vercel.app`
* **Backend (API en Render):** `https://ecommerce-hermanos-jota-api.onrender.com/api/productos`

#
---

## 📋 Funcionalidades Implementadas

### Backend (API)
* Conexión a una base de datos **MongoDB Atlas**.
* Variables de entorno (`.env`) para la cadena de conexión.
* Modelo de **Mongoose** (`Product.js`) para definir el esquema de datos.
* API RESTful con **CRUD completo** para productos:
    * `GET /api/productos` (Leer todos)
    * `GET /api/productos/:id` (Leer uno)
    * `POST /api/productos` (Crear uno)
    * `PUT /api/productos/:id` (Actualizar uno)
    * `DELETE /api/productos/:id` (Eliminar uno)
* **Límite de seguridad** en la ruta `POST` (máx. 11 productos) para proteger la base de datos de la entrega.

### Frontend (React)
* Integración de **React Router DOM** para la navegación.
* Archivo `vercel.json` para manejar correctamente las recargas en rutas de SPA.
* Página de Inicio (`/`) con *Hero Banner* y productos destacados.
* Página de Catálogo (`/productos`) que consume la API (`GET`).
* Página de Detalle Dinámica (`/productos/:id`) que usa `useParams`.
* Formulario de Creación de Producto (`/admin/crear-producto`) que hace `POST` a la API.
* Funcionalidad de "Eliminar" en la página de detalle que hace `DELETE` a la API.
* **Manejo de errores** específico de la API en los formularios.
* Componente `Loader` (spinner) para los estados de carga.
* Menú de navegación móvil que se cierra automáticamente al seleccionar una opción.

#
---

## 🛠️ Cómo ejecutar localmente

Puedes ejecutar el proyecto de dos maneras:

### 1. Con NPM (Estándar)

**Backend:**
```bash
# Desde la raíz del proyecto
cd backend
npm install

# Crea un archivo .env en /backend con la siguiente variable:
# MONGO_URL=tu_cadena_de_conexion_de_mongodb_atlas

npm start
```

**Frontend (en otra terminal):**
```bash
# Desde la raíz del proyecto
cd client
npm install

# Crea un archivo .env en /client con la siguiente variable:
# VITE_API_URL=http://localhost:3001

npm run dev
```

### 2. Con Docker (Híbrido: Backend en Docker)
Este método corre el backend dentro de un contenedor, asegurando un entorno consistente.

**Backend (con Docker):**

```bash
# Desde la raíz del proyecto
# 1. Asegúrate de tener tu archivo /backend/.env creado como en el método 1
# 2. Inicia docker-compose
docker-compose up --build
```

**Frontend (en otra terminal):**

```bash
# Desde la raíz del proyecto
cd client
npm install

# 1. Asegúrate de tener tu archivo /client/.env creado como en el método 1
# 2. Inicia el cliente
npm run dev
```
---

## 🧪 Datos de Prueba para Creación

Puedes usar la ruta `/admin/crear-producto` para añadir un nuevo ítem. Aquí tienes un ejemplo de los datos del `products.json` que puedes usar para poblar un campo:

* **Nombre del Producto:** `Escritorio Costa`
* **Precio (número):** `58000`
* **Ruta de Imagen (ej: images/Silla.png):** `images/Escritorio Costa.png`
* **Descripción:** `Escritorio compacto con cajón organizado y tapa pasacables integrada en bambú laminado. Ideal para espacios de trabajo en casa.`
* **Medidas:** `120 × 60 × 75 cm`
* **Materiales:** `Bambú laminado, herrajes ocultos`
* **Acabado:** `(Dejar vacío o poner N/A)`
* **Peso:** `(Dejar vacío o poner N/A)`