const express = require('express');
const bodyParser = require('Body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const aut = require('./routes/aut')
const consts = require('./utils/consts');

const produtos_controller = require('./controllers/produtos_controller');
const clientes_controller = require('./controllers/clientes_controller');
const aut_controller = require('./controllers/autenticacao_controller');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use('/aut', aut);

app.use(aut_controller.checkToken);
app.use('/livros', produtos_controller)
app.use('/clientes', clientes_controller)



app.use((req, res, next) => {
    res.status(404).send('Not found')
})

mongoose.connect(`mongodb+srv://${consts.BD_User}:${consts.DB_Pass}@person.vwrwo.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true })

app.listen(3000)