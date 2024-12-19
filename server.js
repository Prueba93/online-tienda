const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuración del motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Datos de los productos
const productos = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    nombre: `Objeto ${i + 1}`,
    descripcion: `Hermoso Producto a buen precio ${i + 1}`,
    precio: Math.floor(Math.random() * 50) + 20,
    imagen: `/images/producto${i + 1}.jpg`,
}));

// Rutas
app.get('/', (req, res) => {
    res.render('index', { productos });
});

app.post('/confirmar-compra', (req, res) => {
    const { productosSeleccionados } = req.body;
    console.log('Productos seleccionados:', productosSeleccionados);
    res.send('¡Gracias por tu compra!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
