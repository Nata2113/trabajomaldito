const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const clientesRoutes = require('./routes/clientes');
const productosRoutes = require('./routes/productos');
const pedidosRoutes = require('./routes/pedidos');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas
app.use('/api/clientes', clientesRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/pedidos', pedidosRoutes);

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en puerto ${PORT}`);
    });
}).catch(err => {
    console.error('Error al conectar a MongoDB:', err.message);
});
