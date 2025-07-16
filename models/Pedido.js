const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    codigo: { type: String, required: true, unique: true },
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
    fechaPedido: { type: Date, default: Date.now },
    productos: [{
        codigo: String,
        nombre: String,
        cantidad: Number,
        precioUnitario: Number,
        totalComprado: Number
    }],
    totalCompra: Number,
    metodoPago: String
});

module.exports = mongoose.model('Pedido', pedidoSchema);
