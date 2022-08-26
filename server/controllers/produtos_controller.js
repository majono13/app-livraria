const express = require('express')
const router = express.Router()

const Livros = require('../models/livro.model')


router.get('/', (req, res) => {
    Livros.find().exec((err, livros) => {
        if (err) res.status(500).send(err)

        else res.status(200).send(livros)
    })
})

//deletar
router.delete('/:id', (req, res) => {
    let id = req.params.id

    Livros.deleteOne({ _id: id }, (err) => {
        if (err) res.status(500).send(err)

        else res.status(200).send({})
    })


})

//adicionar novo produto
router.post('/', (req, res) => {

    let livro = new Livros({
        nome: req.body.nome,
        autor: req.body.autor,
        preco: req.body.preco,
        categoria: req.body.categoria,
        estoque: req.body.estoque
    })

    livro.save((err, livro) => {
        if (err) res.status(500).send(err)

        else res.status(200).send(livro)
    })
})

//editar produto
router.patch('/:id', (req, res) => {

    let id = req.params.id

    Livros.findById(id, (err, livro) => {
        if (err) res.status(500).send(err)

        else if (!livro) res.status(404).send({})

        else {
            livro.nome = req.body.nome;
            livro.autor = req.body.autor;
            livro.preco = req.body.preco;
            livro.categoria = req.body.categoria;
            livro.estoque = req.body.estoque

            livro.save()
                .then((d) => res.status(200).send(d))
                .catch((e) => res.status(500).send(e))
        }
    })

})




module.exports = router