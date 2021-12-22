const { check } = require('express-validator');

exports.newAccountValidation = [
    check('value', 'El monto es obligatorio y mayor a cero').not().isEmpty().isFloat({min:0 ,  max:2000000}),
    check('category', 'La categoria es obligatoria').not().isEmpty(),
    check('comment', 'El commentario es obligatorio').not().isEmpty().isLength({max:30 , min:3}),
    check('type', 'El tipo de ingreso obligatoria').not().isEmpty(),
];

exports.editAccountValidation= [
    check('value', 'El monto es obligatorio y mayor a cero').not().isEmpty().isFloat({min:0 ,  max:2000000}),
    check('category', 'La categoria es obligatoria').not().isEmpty(),
    check('comment', 'El commentario es obligatorio').not().isEmpty().isLength({max:30 , min:3}),
];

    