const mongoose = require('mongoose')
const Schema = mongoose.Schema;


var ClienteSchema = new Schema({
    nome: String,
    sobrenome: String,
    aniversario: String,
    email: String,
    telefone: String,
    favoritos: Boolean

}, { versionKey: false })

module.exports = mongoose.model("Cliente", ClienteSchema)