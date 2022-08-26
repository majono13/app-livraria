const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const consts = require('../utils/consts');
const jwt = require('jsonwebtoken');


module.exports = {
    registro: async (req, res) => {

        try {
            let u = await User.findOne({ email: req.body.email }); //retorna o u usuário para a constante caso ele seja encontrado

            if (!u) {
                const user = new User(req.body);

                user.senha = bcrypt.hashSync(req.body.senha, consts.bcryptSalts); //criptografa a senha antes de salvar no banco de dados
                await user.save();
                delete user.senha;
                res.status(200).json(user);
            } else {
                res.status(403).json({ message: 'E-mail já cadastrado!' });
            }
        }
        catch (err) {
            res.status(500).json({ message: 'Erro ao salvar o usuário', error: err });
        };

    },

    login: (req, res) => {
        const senha = req.body.senha;
        const email = req.body.email;

        User.findOne({ email: email }).lean().exec((err, user) => {
            if (err) return res.status(500).json({ message: 'Falha no servidor', error: err });

            const autErr = (senha == '' || senha == null || !user);


            if (!autErr) {
                if (bcrypt.compareSync(senha, user.senha)) {
                    let token = jwt.sign({ _id: user._id }, consts.keyJWT, { expiresIn: consts.expiresJWT });

                    delete user.senha;
                    return res.json({ ...user, token: token });
                }
            }

            return res.status(404).json({ message: 'E-mail ou senha inválidos!' });
        });
    },

    checkToken: (req, res, next) => {
        const token = req.get('Authorization');

        if (!token) {
            return res.status(401).json({ message: 'Token não encontrado!' });
        };

        jwt.verify(token, consts.keyJWT,
            (err, decoded) => {
                if (err || !decoded) {
                    return res.status(401).json({ message: 'Erro de autenticação' });
                };

                next();
            });
    },

    user: (req, res) => {
        const token = req.get('Authorization');

        jwt.verify(token, consts.keyJWT, (err, decoded) => {
            const id = decoded._id;

            User.findById(id).lean().exec((err, user) => {
                if (err || !user) return res.status(500).json({ message: 'Erro ao buscar o usuário', error: err });

                let token = jwt.sign({ _id: user._id }, consts.keyJWT, { expiresIn: consts.expiresJWT });
                delete user.senha;
                return res.json({ ...user, token: token });
            })
        })
    }
}