const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db'); // Importar la conexión a la base de datos
const Joi = require('joi'); // Importar Joi para validación
const jwt = require('jsonwebtoken'); // Importar JWT para autenticación

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Probar conexión a la base de datos
pool.getConnection()
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch((err) => console.error('Error al conectar con la base de datos:', err));

// Middleware para validar datos de entrada
const validarCarta = (req, res, next) => {
  const schema = Joi.object({
    nombre: Joi.string().required(),
    descripcion: Joi.string().required(),
    imagen_url: Joi.string().uri().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// Middleware para verificar autenticación
const verificarToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado, token no proporcionado' });
  }

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = verificado;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Token inválido' });
  }
};

// Rutas de prueba
app.get('/api/test', (req, res) => {
  res.json({ message: 'Conexión exitosa con el backend' });
});

// Ruta para obtener todas las cartas
app.get('/api/cartas', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM cartas');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener las cartas:', error);
    res.status(500).json({ error: 'Error al obtener las cartas' });
  }
});

// Ruta para insertar una nueva carta con validación
app.post('/api/cartas', validarCarta, async (req, res) => {
  const { nombre, descripcion, imagen_url } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO cartas (nombre, descripcion, imagen_url) VALUES (?, ?, ?)',
      [nombre, descripcion, imagen_url]
    );
    res.status(201).json({ id: result.insertId, nombre, descripcion, imagen_url });
  } catch (error) {
    console.error('Error al insertar la carta:', error);
    res.status(500).json({ error: 'Error al insertar la carta' });
  }
});

// Ejemplo de ruta protegida
app.get('/api/protegido', verificarToken, (req, res) => {
  res.json({ mensaje: 'Acceso autorizado', usuario: req.usuario });
});

// Middleware para manejar errores globalmente
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
