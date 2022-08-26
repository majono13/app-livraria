const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nome: String,
    sobrenome: String,
    email: String,
    senha: String
}, { versionKey: false });

module.exports = mongoose.model("Usuario", userSchema);