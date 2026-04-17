# Inventario CRUD con Node.js y JavaScript

Aplicación básica de inventario usando Node.js, Express y MySQL con interfaz en JavaScript del lado del cliente.

## Archivos principales

- `server.js` - Servidor principal con Express
- `config/db.js` - Configuración de conexión a MySQL
- `routes/productos.js` - Rutas API para operaciones CRUD
- `public/index.html` - Página principal con tabla de productos
- `public/js/app.js` - JavaScript del lado del cliente para interacciones
- `public/styles.css` - Estilos de la interfaz
- `db.sql` - Script para crear la base de datos y tabla
- `package.json` - Dependencias del proyecto

## Instrucciones de instalación

1. Asegúrate de tener Node.js instalado (versión 14 o superior)
2. Instala las dependencias: `npm install`
3. Abre el panel de XAMPP y asegúrate de iniciar **MySQL**.
4. Importa `db.sql` usando **phpMyAdmin** (http://localhost/phpmyadmin) o la línea de comandos de MySQL.
5. Inicia el servidor: `npm start` o `npm run dev` (con nodemon para desarrollo).
6. Abre en el navegador: `http://localhost:3000`

> Si tu XAMPP usa MySQL/MariaDB local, la aplicación ya está configurada para conectarse a `127.0.0.1:3306` con usuario `root` y contraseña vacía.

## Configuración de base de datos

La configuración de MySQL está en `config/db.js`. Si usas las credenciales por defecto de XAMPP:

- servidor: `localhost`
- usuario: `root`
- contraseña: `` (vacía)
- base de datos: `inventario`

Si cambias usuario/contraseña, actualiza `config/db.js`.

## API Endpoints

- `GET /api/productos` - Obtener todos los productos
- `GET /api/productos/:id` - Obtener un producto específico
- `POST /api/productos` - Crear un nuevo producto
- `PUT /api/productos/:id` - Actualizar un producto
- `DELETE /api/productos/:id` - Eliminar un producto

## Características

- Interfaz responsiva con JavaScript del lado del cliente
- Validación de formularios en frontend y backend
- Operaciones CRUD completas
- Mensajes de error y éxito
- Modal para crear/editar productos
- Confirmación antes de eliminar
- API RESTful

## Tecnologías utilizadas

- **Backend**: Node.js, Express.js
- **Base de datos**: MySQL
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Cliente MySQL**: mysql2

## Ramas colaborativas para compañeros

Se crearon dos ramas a partir de `main` para que los compañeros trabajen individualmente:

- `rama-compa1`
- `rama-compa2`

Cada compañero debe:

1. Clonar el repositorio.
2. Cambiar a su rama asignada: `git checkout rama-compa1` o `git checkout rama-compa2`.
3. Hacer sus cambios y commits.
4. Enviar los cambios con `git push origin rama-compa1` o `git push origin rama-compa2`.

Posteriormente, el dueño del repositorio podrá integrar los cambios a `main` mediante merge o Pull Request.

## Nota

Este proyecto usa MySQL como base de datos y está diseñado para funcionar junto con XAMPP para el servidor de base de datos. Asegúrate de que el puerto 3306 esté disponible y que MySQL esté ejecutándose.
