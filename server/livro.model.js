const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var livroSchema = new Schema({
    nome: String,
    autor: String,
    preco: Number,
    categoria: String,
    estoque: Number
}, { versionKey: false })

module.exports = mongoose.model("Livro", livroSchema)