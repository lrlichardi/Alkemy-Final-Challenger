const { validationResult } = require("express-validator");
const pool = require("../dbConnection");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.newUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array()[0]);
  }
  var { name, lastname, password, email, rol, datausercreate } = req.body;
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (rows.length === 0) {
      //encrypted password
      const salt = await bcryptjs.genSalt(10);
      password = await bcryptjs.hash(password, salt);
      // save database
      const response = await pool.query(
        "INSERT INTO users (name, lastname, password , email , rol , datausercreate) VALUES ($1 ,$2 ,$3 ,$4 , $5 , $6)",
        [name, lastname, password, email, rol, datausercreate]
      );

      // creation and signature of jwt
      const payload = {
        users: {
          id: response.id,
        },
      };

      jwt.sign(
        payload,
        process.env.SECRETA,
        {
          expiresIn: "1h",
        },
        (error, token) => {
          if (error) throw error;
          res.status(200).json({ token });
        }
      );
    } else {
      res.status(400).send({ msg: "Email ya registrado" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Hubo Un Error Al Crear El Usuario" });
  }
};

exports.getUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    dataUser = rows[0];
    if (rows.length > 0) {
      const passCorrect = await bcryptjs.compare(password, rows[0].password);
      if (!passCorrect) {
        return res.status(400).json({ msg: "Password incorrecto" });
      }
      // creation and signature of jwt
      const payload = {
        users: {
          email: email,
        },
      };
     
      jwt.sign(
        payload,
        process.env.SECRETA,
        {
          expiresIn: "1h",
        },
        (error, token) => {
          if (error) throw error;
          res.status(200).send({token , dataUser});
        }
      );
      
    } else {
      res
        .status(400)
        .send({ msg: "El Correo o La Contrasena No Existen o Estan Mal" });
    }
  } catch (error) {
    console.log(error);
  }
};
