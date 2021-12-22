const { check } = require('express-validator');

exports.newUserValidation = [
    check('name', 'El nombre es obligatorio').not().isEmpty().isLength({max:30 , min:3}),
    check('lastname', 'El apellido es obligatorio y contener un minimo de tres caracteres').not().isEmpty().isLength({max:30 , min:3}),
    check('password', 'La contrasena es obligatoria y debe contener 7 caracteres al menos').not().isEmpty().isLength({max:30  , min:7}),
    check('email', 'El email es obligatorio').not().isEmpty().isEmail().isLength({max:50  , min:5}),
];

exports.LogInUser = [
    check('email', 'El email es obligatorio').not().isEmpty().isLength({max:30 , min:3}),
    check('password', 'El password es obligatorio').not().isEmpty().isLength({max:30 , min:3}),

]