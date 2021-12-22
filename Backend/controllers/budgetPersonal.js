const { validationResult } = require("express-validator");
const pool = require("../dbConnection");

exports.getAccounts = async (req, res) => {
  if(req.params.id === undefined){
    return res.status(400).send({msg:'No hay id'})
  }
    const {rows} = await pool.query(
    "SELECT * FROM account WHERE user_id = $1" , [req.params.id]
  );
  res.status(200).json(rows);
};

exports.newAccount = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array()[0]);
  }
  const { category, comment, value, date, type, user_id } = req.body;
  try {
    const response = await pool.query(
      "INSERT INTO account (category , type , comment , value , date , user_id) VALUES ($1 ,$2 ,$3 ,$4 , $5 , $6)",
      [category, type, comment, value, date, user_id]
    );
    res.send({msg:`${type} Creado Exitosamente`});
  } catch (error) {
    res.status(400).send(error)
    console.log(error);
  }
};

exports.deleteAccount = async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query("DELETE FROM account WHERE id = $1", [id]);
    res.status(200).json("Eliminado");
  } catch (error) {
    console.log(error);
  }
};

exports.updateAccount = async (req, res) => {
  const id = req.params.id;
  const { category, comment, value } = req.body;
  await pool.query(
    "UPDATE account SET category= $1 , comment = $2 , value = $3 WHERE id = $4",
    [category, comment, value, id]
  );
  res.status(200).json("Editado Correctamente");
};

exports.getAccount = async (req, res) => {
  const id = req.params.id;
  const account = await pool.query("SELECT * FROM account WHERE id = $1", [id]);
  res.status(200).json(account.rows[0]);
};
