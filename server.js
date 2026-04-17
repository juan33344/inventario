const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const { initDatabase } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const productosRoutes = require('./routes/productos');
app.use('/api/productos', productosRoutes);

// Ruta principal - servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor sólo después de inicializar la DB
initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error inicializando la base de datos:', err);
  });
