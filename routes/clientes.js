const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');


router.post('/', async (req, res) => {
    try {
        const existente = await Cliente.findOne({
            nombre: req.body.nombre,
            apellidos: req.body.apellidos
        });
        if (existente) {
            return res.status(400).json({ error: 'Ya existe un cliente con ese nombre y apellidos' });
        }

        const nuevoCliente = new Cliente(req.body);
        await nuevoCliente.save();
        res.status(201).json(nuevoCliente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get('/', async (req, res) => {
    const clientes = await Cliente.find();
    res.json(clientes);
});


router.get('/ciudad/:ciudad', async (req, res) => {
    const clientes = await Cliente.find({ "direccion.ciudad": req.params.ciudad });
    res.json(clientes);
});


router.get('/fecha/:fecha', async (req, res) => {
    const fecha = new Date(req.params.fecha);
    const clientes = await Cliente.find({ fechaRegistro: fecha });
    res.json(clientes);
});


router.put('/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            return res.status(404).json({
                error: 'Cliente no encontrado',
                sugerencia: 'Verifica que el ID sea correcto o que el cliente aún exista'
            });
        }

        const actualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            return res.status(404).json({
                error: 'Cliente no encontrado',
                sugerencia: 'Verifica que el ID sea correcto o que el cliente aún exista'
            });
        }

        await Cliente.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Cliente eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
