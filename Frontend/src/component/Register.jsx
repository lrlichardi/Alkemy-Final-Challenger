import React, { useState } from "react";
import axios from "axios";
import { useNavigate , Link} from "react-router-dom";
import { Button, Form, FloatingLabel, Alert } from "react-bootstrap";
require('../css/register.css')

export default function Register({setToken}) {
  const [input, setInput] = useState([]);
  const [alertSuccess, setAlertSuccess] = useState("");
  const [alert, setAlert] = useState();
  const navigate = useNavigate();

  var d = new Date();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const inputs = {
      ...input,
      [name]: value.toUpperCase(),
      datausercreate: d.toISOString(),
      rol:false,
    };
    setInput(inputs);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if(input.password === input.password2){
    try {
      const {data} = await axios.post("/register", input);
      setAlertSuccess(`NUEVO USUARIO CREADO AHORA SERA REDIRIGIDO!`);
      localStorage.setItem("token", JSON.stringify(data));
      setToken(data.token);
      form.reset();
      navigate("/");
    } catch (error) {
      setAlert(error.response?.data.msg);
    }}
    else{
        setAlert('Las contrasenas no coinciden!')
    }
    setTimeout(() => {
      setAlertSuccess("");
      setAlert("");
    }, 5000);
  };

  return (
    <div className="conteiner-register mx-auto my-auto mt-5 border border-dark p-4">
      {alert && <Alert variant="danger">{alert}</Alert>}
      {alertSuccess && <Alert variant="success">{alertSuccess}</Alert>}

      <h1 className="text-center mb-3">Registro</h1>
      <Form onSubmit={(event) => handleSubmit(event)}>
        <FloatingLabel
          controlId="floatingInput1"
          label="Nombre"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Nombre"
            required
            onChange={(e) => handleChange(e)}
            name="name"
            maxLength="30" minLength="3" 
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput2"
          label="Apellido"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Apellido"
            required
            name="lastname"
            onChange={(e) => handleChange(e)}
            maxLength="30" minLength="3" 
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput3"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            type="email"
            placeholder="algo@example.com"
            required
            name="email"
            onChange={(e) => handleChange(e)}
            maxLength="30" minLength="3" 
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingPassword"
          label="Password"
          className="mb-3"
        >
          <Form.Control
            type="password"
            placeholder="Password"
            required
            name="password"
            onChange={(e) => handleChange(e)}
            maxLength="30" minLength="7" 
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingPassword2"
          label="Confirmacion de Password"
          className="mb-3"
        >
          <Form.Control
            type="password"
            placeholder="repita Password"
            required
            name="password2"
            onChange={(e) => handleChange(e)}
            maxLength="30" minLength="7" 
          />
        </FloatingLabel>

        <div className="text-center">
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </div>
        <div className="text-center mt-2">
        <Link to="/">
            Si Ya Tenes Cuenta?Inicia Sesion
        </Link>
        </div>
      </Form>
    </div>
  );
}
