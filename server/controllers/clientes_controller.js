const express = require('express')
const router = express.Router()

const Clientes = require('../models/cliente.model')


router.get('/', (req, res) => {
    Clientes.find().exec((err, clientes) => {
        if (err) res.status(500).send(err);

        else res.status(200).send(clientes);
    })
})

router.delete('/:id', (req, res) => {
    let id = req.params.id;

    Clientes.deleteOne({ _id: id }, (err) => {
        if (err) res.status(500).send(err);

        else res.status(200).send({});
    });
});

router.post('/', (req, res) => {
    let cliente = new Clientes({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        aniversario: req.body.aniversario,
        email: req.body.email,
        telefone: req.body.telefone,
        favoritos: req.body.favoritos
    });

    cliente.save((err, cliente) => {
        if (err) res.status(500).send(err);

        else res.status(200).send(cliente);
    });
});

router.patch('/:id', (req, res) => {
    let id = req.params.id;

    Clientes.findById(id, (err, cliente) => {
        if (err) res.status(500).send(err);

        else if (!cliente) res.status(404).send('Cliente not found');

        else {
            cliente.nome = req.body.nome,
                cliente.sobrenome = req.body.sobrenome,
                cliente.aniversario = req.body.aniversario,
                cliente.email = req.body.email,
                cliente.telefone = req.body.telefone,
                cliente.favoritos = req.body.favoritos

            cliente.save()
                .then((c) => res.status(200).send(c))
                .catch((e) => res.status(500).send(e))
        }
    })
})

module.exports = router