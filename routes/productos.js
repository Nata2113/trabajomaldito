const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');


router.post('/', async (req, res) => {
    try {
        const existente = await Producto.findOne({ codigo: req.body.codigo });
        if (existente) {
            return res.status(400).json({ error: 'Ya existe un producto con ese código' });
        }

        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get('/', async (req, res) => {
    const productos = await Producto.find();
    res.json(productos);
});


router.get('/codigo/:codigo', async (req, res) => {
    const producto = await Producto.findOne({ codigo: req.params.codigo });
    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado con ese código' });
    }
    res.json(producto);
});


router.put('/:id', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({
                error: 'Producto no encontrado',
                sugerencia: 'Verifica que el ID sea correcto o que el producto aún exista'
            });
        }

        const actualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({
                error: 'Producto no encontrado',
                sugerencia: 'Verifica que el ID sea correcto o que el producto aún exista'
            });
        }

        await Producto.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
