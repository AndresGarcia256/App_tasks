# App_tasks

App_tasks es una aplicación orientada a la gestión de tareas, desarrollada utilizando TypeScript, HTML, JavaScript y CSS. Este repositorio contiene todo el código fuente necesario para ejecutar, mantener y extender la aplicación.

## Características principales

- **Gestión de tareas:** Crea, edita y elimina tareas fácilmente.
- **Interfaz intuitiva:** Diseño amigable para el usuario, adaptable a distintos dispositivos.
- **Tecnologías modernas:** Uso de TypeScript para una mejor mantenibilidad y escalabilidad del código.
- **Persistencia de datos:** (Describe aquí cómo se almacenan las tareas, por ejemplo, localStorage, backend, etc.)
- **Organización y filtros:** (Si existen, describe la posibilidad de organizar, filtrar o categorizar tareas.)

## Tecnologías utilizadas

- **TypeScript** (29%)
- **HTML** (26.2%)
- **JavaScript** (23.6%)
- **CSS** (21.2%)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/AndresGarcia256/App_tasks.git
   cd App_tasks
   ```
   En la carpeta backend tendrás que configurar el archivo env.local con las siguientes variables:
   ```
   PASSWORD= contraseña del usuario admin
   USER= nombre del usuario admin
   HOST=localhost
   MONGODB_URI= dirección de mongo
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret_key
   ```
   Si se está corriendo de manera local con tu propio host de MongoDB Atlas tendrás que apuntar tu IP hacia tu instancia local, para permitir el tráfico desde tu dispositivo hacia Atlas.

2. Instala las dependencias (si aplica):

   ```bash
   cd frontend
   npm install
   ng serve
   ```

   En otra consola:
   ```bash
   cd App_tasks
   cd backend
   npm install
   npm run dev
   ```

3. Ejecuta la aplicación:
   ```bash
   npm start
   ```

## Uso

1. Abre la aplicación en tu navegador.
2. Podrás iniciar sesión y registrarte.
3. Podrás crear tableros donde almacenar las tareas de hogar, trabajo, pendientes, etc.
4. Crea o marca las tareas como completadas o elimínalas según sea necesario.
5. Si tienes muchas tareas podrás buscar entre todas por medio de un buscador.

## Endpoints CRUD y Funcionalidad Backend

La API de App_tasks está organizada en tres grandes módulos: autenticación, tableros y tareas. Cada subcarpeta contiene un archivo `routes.js` que define los endpoints REST correspondientes.

### 1. Autenticación (`/api/auth`)
- **POST `/api/auth/Login`**  
  Inicia sesión en la aplicación. Recibe credenciales y retorna un token o sesión.
- **POST `/api/auth/Register`**  
  Registra un nuevo usuario en el sistema.
- **GET `/api/auth/sesion`**  
  Verifica o retorna el estado de la sesión actual.
- **POST `/api/auth/signout`**  
  Cierra la sesión del usuario autenticado.

### 2. Tableros (`/api/Tablero`)
- **DELETE `/api/Tablero/borrartablero`**  
  Elimina un tablero específico del usuario.
- **POST `/api/Tablero/CreateBoard`**  
  Crea un nuevo tablero para organizar tareas.
- **GET `/api/Tablero/Getpersonalboards`**  
  Devuelve todos los tableros personales del usuario autenticado.

### 3. Tareas (`/api/Tarea`)
- **DELETE `/api/Tarea/borrartarea`**  
  Elimina una tarea específica.
- **POST `/api/Tarea/CreateTask`**  
  Crea una nueva tarea asociada a un tablero.
- **PUT `/api/Tarea/edittask`**  
  Edita/actualiza una tarea existente.
- **GET `/api/Tarea/FindTasks`**  
  Realiza una búsqueda de tareas, permitiendo filtrar por distintos criterios.
- **GET `/api/Tarea/Gettasks`**  
  Devuelve todas las tareas del usuario o tablero especificado.

> Cada endpoint está definido en un archivo `routes.js` correspondiente a su entidad, lo que facilita el mantenimiento y la escalabilidad del backend.

---
