# E-commerce Hermanos Jota - Sprints 7 & 8 (Entrega Final)

Proyecto final para los Sprints 7 y 8 de la Escuela de Innovación ITBA. Este proyecto completa la aplicación MERN implementando un flujo de autenticación de usuarios full-stack, gestión de estado global con Context API y un flujo de creación de pedidos protegido.

## 🚀 Enlaces de Despliegue

* **Frontend (React en Vercel):** `https://ecommerce-hermanos-jota-final.vercel.app`
* **Backend (API en Render):** `https://ecommerce-hermanos-jota-api-final.onrender.com`

---

## 📋 Funcionalidades Implementadas

### Backend (API)
* **Autenticación de Usuarios:**
    * Modelo `User.js` con hasheo de contraseñas (`bcryptjs`).
    * Rutas `POST /api/users/register` y `POST /api/users/login`.
    * Generación de `JSON Web Tokens (JWT)` guardados en cookies `httpOnly` y `sameSite: 'none'` para autenticación cross-domain.
    * Ruta `POST /api/users/logout` para limpiar la cookie de sesión.
* **Middleware de Autorización:**
    * Middleware `protect` para verificar que un usuario esté logueado.
    * Middleware `admin` para verificar que un usuario sea administrador.
* **Rutas Protegidas:**
    * Las rutas `POST`, `PUT`, y `DELETE` de `/api/productos` ahora requieren permisos de administrador.
    * La ruta `POST /api/orders` (crear pedido) requiere que el usuario esté logueado.
* **Modelo de Pedidos:**
    * Modelo `Order.js` que relaciona los pedidos con un `User` y los productos comprados.

### Frontend (React)
* **Gestión de Estado Global (Context API):**
    * `AuthContext`: Provee el estado `userInfo` e `isAuthenticated` a toda la aplicación.
    * `CartContext`: Provee `cartItems` (persistido en `localStorage`) y funciones (`addToCart`, `removeFromCart`, `clearCart`).
* **Flujo de Autenticación:**
    * Páginas de `/login` y `/registro` que llaman a la API y actualizan el `AuthContext`.
    * Lógica de `logout` en la Navbar que limpia el contexto, el `localStorage` y la cookie de la API.
* **Rutas Protegidas y UI Condicional:**
    * Componente `<ProtectedRoute>` que redirige a `/login` si se intenta acceder a rutas de admin.
    * La `Navbar` y `ProductDetail` ahora ocultan los enlaces/botones de "Crear Producto" y "Eliminar Producto" si el usuario no es `isAdmin`.
* **Flujo de Carrito y Pedido:**
    * Página `/cart` que lee del `CartContext`.
    * Lógica de `+/-` para modificar la cantidad en el carrito.
    * Botón "Finalizar Compra" que verifica si el usuario está logueado (`isAuthenticated`) antes de llamar a la API de pedidos.
    * Todas las peticiones `fetch` seguras incluyen `credentials: 'include'` para enviar la cookie `jwt` al backend.

---

## 🛠️ Cómo ejecutar localmente

Puedes ejecutar el proyecto de dos maneras:

### 1. Con NPM (Estándar)

**Backend:**
```bash
# Desde la raíz del proyecto
cd backend
npm install

# Crea un archivo .env en /backend con las siguientes variables:
# MONGO_URL=tu_cadena_de_conexion_de_mongodb_atlas
# JWT_SECRET=tu_secreto_largo_y_aleatorio_para_jwt

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

## 👨‍🏫 Cómo probar (Rol de Administrador)

Por defecto, todos los usuarios nuevos se registran como clientes normales. Para probar la funcionalidad de Administrador (crear/eliminar productos):

1.  Regístrate en el sitio (`/registro`) con tu cuenta.
2.  Accede a la base de datos en **MongoDB Atlas**.
3.  Navega a la colección `users` dentro de la base de datos `muebleriaJotaDB`.
4.  Busca tu documento de usuario por tu email.
5.  Edita el documento y cambia el valor de `"isAdmin": false` a `"isAdmin": true`.
6.  Guarda el cambio.
7.  Vuelve al sitio y **vuelve a iniciar sesión**. Ahora tendrás acceso a los enlaces y botones de administrador.
---

## 🧪 Datos de Prueba para Creación

Una vez que tengas el rol de Administrador (ver la sección 'Cómo probar'), aparecerá un enlace "Crear Producto" en la barra de navegación. Al hacer clic, te llevará a la ruta `/admin/crear-producto`, donde puedes usar estos datos de ejemplo para poblar un campo:

* **Nombre del Producto:** `Escritorio Costa`
* **Precio (número):** `58000`
* **Ruta de Imagen (ej: images/Silla.png):** `images/Escritorio Costa.png`
* **Descripción:** `Escritorio compacto con cajón organizado y tapa pasacables integrada en bambú laminado. Ideal para espacios de trabajo en casa.`
* **Medidas:** `120 × 60 × 75 cm`
* **Materiales:** `Bambú laminado, herrajes ocultos`
* **Acabado:** `(Dejar vacío o poner N/A)`
* **Peso:** `(Dejar vacío o poner N/A)`
