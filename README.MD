# SIGO (Sistema de Gestión Occidente)

**SIGO** es una aplicación para la gestión eficiente de tareas, desarrollada con TypeScript, HTML, JavaScript y CSS. Este repositorio contiene todo lo necesario para que puedas ejecutar, mantener y extender la aplicación.

---

## 🚀 Características principales

- **Gestión de tareas:** Crea, edita, marca como completadas o elimina tareas fácilmente.
- **Tableros personalizados:** Organiza las tareas en tableros temáticos (hogar, trabajo, pendientes, etc.).
- **Interfaz intuitiva:** Diseño adaptable y fácil de usar desde cualquier dispositivo.
- **Búsqueda y filtros:** Encuentra rápidamente tareas usando el buscador y filtros disponibles.
- **Tecnologías modernas:** Uso de TypeScript para código robusto y escalable.
- **Persistencia de datos:** Las tareas y usuarios se almacenan en una base de datos MongoDB mediante un backend Node.js.
- **Autenticación segura:** Registro, inicio/cierre de sesión y validación de sesiones.

---

## 🛠️ Tecnologías utilizadas

- **TypeScript** (29%)
- **HTML** (26.2%)
- **JavaScript** (23.6%)
- **CSS** (21.2%)
- **Node.js** y **MongoDB** en backend
- **Angular**, **tailwindcss** y **CSS** en frontend

---

## ⚙️ Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/AndresGarcia256/App_tasks.git
   cd App_tasks
   ```

2. **Configura las variables de entorno para el backend:**

   Crea un archivo `env.local` en la carpeta `backend` con este contenido:
   ```
   PASSWORD=contraseña_del_usuario_admin
   USER=nombre_del_usuario_admin
   HOST=localhost
   MONGODB_URI=tu_uri_de_mongodb
   ```
   > Si usas MongoDB Atlas, asegúrate de autorizar tu IP para acceder a la base de datos desde tu equipo.

3. **Instala las dependencias de ambos proyectos:**

   - En el frontend:
     ```bash
     cd frontend
     npm install
     ng serve
     ```

   - En otra terminal, inicia el backend:
     ```bash
     cd ../backend
     npm install
     npm run dev
     ```

---

## ▶️ Ejecución

- Accede a la aplicación desde tu navegador en `http://localhost:4200` (Angular frontend).
- El backend corre por defecto en `http://localhost:3000`.

> **Nota importante:**  
> La primera vez que inicies el servidor backend, cada endpoint puede tardar algunos segundos en responder, ya que el servidor estará cargando los módulos y realizando la compilación inicial. Ten paciencia, este proceso solo ocurre en el primer arranque.
> Para esta prueba tecnica se proporcionara el archivo env.local. para facilitar el servicio de mongodb atlas en el cual se maneja la base de datos

---

## 💡 Uso básico

1. Ingresa a la aplicación y crea una cuenta o inicia sesión.
2. Crea tableros para organizar tus tareas según proyecto o categoría.
3. Añade, edita, marca como completadas o elimina tus tareas.
4. Utiliza el buscador para encontrar tareas específicas rápidamente.

---

## 🗂️ Estructura del Frontend

**Principales carpetas y su propósito:**

- **src/app/auth/**  
  Módulo de autenticación. Incluye:
  - **login/**: Componentes y lógica para el inicio de sesión.
  - **register/**: Componentes y lógica para el registro de usuarios.

- **src/app/business/**  
  Módulo de lógica de negocio. Incluye:
  - **dashboard/**: Panel principal del usuario.
  - **profile/**: Gestión del perfil de usuario.
  - **tables/**: Gestión de tableros (boards).
  - **tasks/**: Gestión de tareas.

- **src/core/services/**  
  Servicios principales de la aplicación, implementados como inyectables de Angular:
  - **auth/**: Servicio de autenticación (login, registro, logout, manejo de sesión).
  - **AuthGuard/**: Guard para proteger rutas que requieren autenticación.
  - **board/**: Servicio para operaciones sobre tableros.
  - **tasks/**: Servicio para operaciones sobre tareas.

- **src/shared/components/**  
  Componentes reutilizables y elementos de interfaz:
  - **footer/**: Pie de página.
  - **header/**: Encabezado/principal barra de navegación.
  - **layout/**: Estructura y disposición general de la aplicación.
  - **sidebar/**: Menú lateral.

> Cada carpeta contiene los módulos, componentes, servicios y vistas necesarios para aislar funcionalidades y facilitar la escalabilidad del frontend.

---

## 🖇️ Endpoints principales del backend

La API RESTful está organizada en tres módulos: autenticación, tableros y tareas. Cada uno tiene su archivo `routes.js` correspondiente.

### 1. Autenticación (`/api/auth`)
- **POST `/api/auth/Login`**: Iniciar sesión.
- **POST `/api/auth/Register`**: Registrar nuevo usuario.
- **GET `/api/auth/sesion`**: Verificar sesión actual.
- **POST `/api/auth/signout`**: Cerrar sesión.

### 2. Tableros (`/api/Tablero`)
- **DELETE `/api/Tablero/borrartablero`**: Eliminar tablero.
- **POST `/api/Tablero/CreateBoard`**: Crear nuevo tablero.
- **GET `/api/Tablero/Getpersonalboards`**: Listar tableros personales.

### 3. Tareas (`/api/Tarea`)
- **DELETE `/api/Tarea/borrartarea`**: Eliminar tarea.
- **POST `/api/Tarea/CreateTask`**: Crear tarea asociada a un tablero.
- **PUT `/api/Tarea/edittask`**: Editar/actualizar tarea.
- **GET `/api/Tarea/FindTasks`**: Buscar tareas con filtros.
- **GET `/api/Tarea/Gettasks`**: Obtener tareas de un usuario o tablero.

> Todos los endpoints están definidos en archivos `routes.js` específicos para cada módulo, lo que facilita el mantenimiento y la escalabilidad.
