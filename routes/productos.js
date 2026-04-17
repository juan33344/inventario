const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todos los productos
router.get('/', (req, res) => {
  db.query('SELECT * FROM productos ORDER BY id DESC', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener productos' });
    }
    res.json(results);
  });
});

// Obtener un producto por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM productos WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener producto' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(results[0]);
  });
});

// Crear un nuevo producto
router.post('/', (req, res) => {
  const { nombre, descripcion, precio, cantidad } = req.body;
  const errors = [];

  if (!nombre || nombre.trim() === '') {
    errors.push('El nombre es obligatorio.');
  }
  if (precio < 0) {
    errors.push('El precio no puede ser negativo.');
  }
  if (cantidad < 0) {
    errors.push('La cantidad no puede ser negativa.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  db.query(
    'INSERT INTO productos (nombre, descripcion, precio, cantidad) VALUES (?, ?, ?, ?)',
    [nombre.trim(), descripcion || '', precio, cantidad],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al crear producto' });
      }
      res.status(201).json({ id: result.insertId, message: 'Producto creado exitosamente' });
    }
  );
});

// Actualizar un producto
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, cantidad } = req.body;
  const errors = [];

  if (!nombre || nombre.trim() === '') {
    errors.push('El nombre es obligatorio.');
  }
  if (precio < 0) {
    errors.push('El precio no puede ser negativo.');
  }
  if (cantidad < 0) {
    errors.push('La cantidad no puede ser negativa.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  db.query(
    'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, cantidad = ? WHERE id = ?',
    [nombre.trim(), descripcion || '', precio, cantidad, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al actualizar producto' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json({ message: 'Producto actualizado exitosamente' });
    }
  );
});

// Eliminar un producto
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM productos WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al eliminar producto' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado exitosamente' });
  });
});

module.exports = router;