import React , {useState}from 'react'
import { Form, Button , Alert , InputGroup} from "react-bootstrap";
import axios from "axios";
require('../css/newOneAccount.css')

export default function NewOneAccount({getAccounts , balance , user}) {
  const [input , setInput] = useState([]);
  const [alertSuccess ,setAlertSuccess] = useState('')
  const [alert, setAlert] = useState();

  var d = new Date();

  const handleChange = (e) => {
    const {name , value} = e.target;
    const inputs = {...input , [name]:value.toUpperCase() , date:d.toISOString() , user_id:user.id };
    setInput(inputs)
      }
      
  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget;
    try{
      await axios.post(`/id=${user.id}`, input);
      setAlertSuccess(`NUEVO ${input.type}`)
      getAccounts()
      balance()
      form.reset()
    }catch (error) {
      console.log(error)
      setAlert(error.response.data.msg);
    }
    setTimeout(() => {
      setAlertSuccess("");
      setAlert("");
    }, 5000);

  }
    return (
        <>
        {alert && <Alert variant="danger">{alert}</Alert>}
        {alertSuccess && <Alert variant="success">{alertSuccess}</Alert>}
        <h2 className='conteiner-title text-center'>Nuevo Dato</h2>
          <Form className="mt-3" onSubmit={(event) => handleSubmit(event)}>
            <Form.Select name='type' aria-label="Default select example" onChange={(e) => handleChange(e)}>
              <option>Tipo</option>
              <option value="egreso">Egreso</option>
              <option value="ingreso">Ingreso</option>
            </Form.Select>

            <Form.Select name='category' aria-label="Default select example" className='mt-3' onChange={(e) => handleChange(e)}>
              <option required value=''>Categoria</option>
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

            <Form.Group className="mb-3 mt-3"  >
              <Form.Control name='comment' maxLength="30" minLength="3"  type="text" placeholder="Comentario" required onChange={(e) => handleChange(e)} />
            </Form.Group>
           
            <Form.Group className="mb-3" >
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control name='value' maxLength="30" minLength="3"  type="number" min='1' placeholder="Monto" required  onChange={(e) => handleChange(e)} />
              </InputGroup>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Crear
            </Button>
          </Form>
          </>
    )
}
