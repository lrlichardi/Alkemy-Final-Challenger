const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
          return res.status(401).json({ msg: 'No hay Token, permiso no valido' });     
    }
    
    try {
        const encryption = jwt.verify(token, process.env.SECRETA);
        req.user = encryption.user;
        return next();
    } catch (error) {
        res.status(401).send({ msg: 'Token no valido' });
    }
};