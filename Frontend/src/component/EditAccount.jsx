import React, { useState } from "react";
import { Modal, Button, Form, InputGroup , Alert} from "react-bootstrap";
import axios from "axios";

export default function EditAccount({ handleClose, account , setAlertSuccess , getAccounts}) {
  const [input, setInput] = useState(account);
  const [alert , setAlert] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target;
    const inputs = { ...input, [name]: value.toUpperCase() };
    setInput(inputs);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/account=${account.id}`, input);
      setAlertSuccess(`${account.type} EDITADO`);
      getAccounts()
    } catch (error) {
      console.log(error);
      setAlert(error.response.data.msg);
    }
    setTimeout(() => {
      setAlertSuccess("");
    }, 5000);
  };

  return (
    <>
      <Form className="mt-3" onSubmit={(event) => handleSubmit(event)}>
        <Modal.Header closeButton>
          <Modal.Title>EDITAR {account.type}</Modal.Title>
        </Modal.Header>
        {alert && <Alert variant="success" className='w-50'>{alert}</Alert>}
        <Modal.Body>
          <Form.Group className="">
            <Form.Label>Categoria</Form.Label>
            <Form.Select
              name="category"
              aria-label="Default select example"
              className="mt-1"
              onChange={(e) => handleChange(e)}
            >
              <option required defaultValue={account.category}>
                {account.category}
              </option>
              <option value="Comida">Comida</option>
              <option value="Alquiler">Alquiler</option>
              <option value="Pasatiempo">Pasatiempo</option>
              <option value="Combustible">Combustible</option>
              <option value="Seguro">Seguro</option>
              <option value="sueldo">Sueldo</option>
              <option value="ingreso">Ingreso</option>
              <option value="Tarjeta de credito">Tarjeta de Credito</option>
              <option value="Servicios">Servicios</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Comentario</Form.Label>
            <Form.Control
              name="comment"
              type="text"
              placeholder="Comentario"
              required
              onChange={(e) => handleChange(e)}
              defaultValue={account.comment}
            />
          </Form.Group>

          <Form.Group className="mb-3 mt-3">
            <Form.Label>Monto</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                name="value"
                type="number"
                placeholder="Monto"
                required
                onChange={(e) => handleChange(e)}
                defaultValue={account.value}
              />
            </InputGroup>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleClose} type='submit'> 
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
}
