const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');
const Cliente = require('../models/Cliente');


router.post('/', async (req, res) => {
    try {
        const clienteExiste = await Cliente.findById(req.body.cliente);
        if (!clienteExiste) {
            return res.status(404).json({ error: 'Cliente no encontrado para asignar el pedido' });
        }

        const nuevoPedido = new Pedido(req.body);
        await nuevoPedido.save();
        res.status(201).json(nuevoPedido);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get('/', async (req, res) => {
    const pedidos = await Pedido.find().populate('cliente');
    res.json(pedidos);
});


router.get('/cliente/:clienteId', async (req, res) => {
    try {
        const pedidos = await Pedido.find({ cliente: req.params.clienteId }).populate('cliente');
        if (pedidos.length === 0) {
            return res.status(404).json({ mensaje: 'Este cliente no tiene pedidos registrados' });
        }
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const pedido = await Pedido.findById(req.params.id);
        if (!pedido) {
            return res.status(404).json({
                error: 'Pedido no encontrado',
                sugerencia: 'Verifica que el ID sea correcto o que el pedido aún exista'
            });
        }

        const actualizado = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const pedido = await Pedido.findById(req.params.id);
        if (!pedido) {
            return res.status(404).json({
                error: 'Pedido no encontrado',
                sugerencia: 'Verifica que el ID sea correcto o que el pedido aún exista'
            });
        }

        await Pedido.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Pedido eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
