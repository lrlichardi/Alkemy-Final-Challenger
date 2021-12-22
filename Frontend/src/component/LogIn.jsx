import React, { useState } from "react";
import axios from "axios";
import { useNavigate , Link} from "react-router-dom";
import { Button, Form, FloatingLabel, Alert } from "react-bootstrap";
require('../css/logIn.css');

export default function LogIn({setUser , setToken}) {
  const [input, setInput] = useState([]);
  const [alertSuccess, setAlertSuccess] = useState("");
  const [alert, setAlert] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const inputs = {
      ...input,
      [name]: value.toUpperCase(),
    };
    setInput(inputs);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const {data}= await axios.post("/login", input);
        localStorage.setItem("token", JSON.stringify(data.token)); 
        setToken(data.token);
        setUser(data.dataUser)
        axios.defaults.headers = { "x-auth-token": data.token};
        navigate(`/id=${data.dataUser.id}/index`);
      } catch (error) {
        console.log(error);
        setAlert(error.response?.data.msg);
      }
      
      setTimeout(() => {
        setAlertSuccess("");
        setAlert("");
      }, 5000);
    } 
  return (
    <>
    <h1 className="text-center mt-2">Bienvenido a Control de Gastos Personales!</h1>
    <h4 className="text-center mt-3">Inicie Sesion Para Continuar</h4>
    <div className="conteiner-log mx-auto my-auto mt-3 border border-dark p-4">
      
      {alert && <Alert variant="danger">{alert}</Alert>}
      {alertSuccess && <Alert variant="success">{alertSuccess}</Alert>}
      <Form onSubmit={(event) => handleSubmit(event)}>
        <h1 className="text-center mb-3">Log In</h1>
        <FloatingLabel
          controlId="floatingInput"
          label="Email"
          className="mb-3"
        >
          <Form.Control required maxLength="30" minLength="3" type="email" placeholder="name@example.com" name="email" onChange={(e) => handleChange(e)}/>
        </FloatingLabel>

        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control required maxLength="30" minLength="7" type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
        </FloatingLabel>

        <div className="text-center mt-3">
          <Button variant="primary" type="submit">
           Iniciar Sesion
          </Button>
        </div>
        <div className="text-center mt-2">
        <Link to="/register">
            ¿No tienes una cuenta? Registrate!
        </Link>
        </div>
      </Form>
    </div>
    </>
  );
}
