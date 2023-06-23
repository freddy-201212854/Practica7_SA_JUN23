const express = require('express');
const mongoose = require('mongoose');

// Conectar a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/goDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch(error => console.error('Error al conectar a MongoDB:', error));
// Definir el esquema de Vehiculo
const VehiculoSchema = new mongoose.Schema({
  placa: String,
  marca: String,
  modelo: String,
  serie: String,
  color: String
});

// Crear el modelo Vehiculo basado en el esquema
const Vehiculo = mongoose.model('Vehiculo', VehiculoSchema);

// Crear una instancia de Express
const app = express();

// Configurar middleware para parsear JSON
app.use(express.json());

// Endpoint para listar los vehículos
app.get('/', async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find();
    res.json(vehiculos);
  } catch (error) {
    console.error('Error al obtener los vehículos:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los vehículos' });
  }
});

// Iniciar el servidor en el puerto 80
app.listen(80, () => {
  console.log('Servidor web iniciado en el puerto 80');
});
