import React, { useState, useEffect } from "react";
import { Table, Button, Alert, Modal, Form } from "react-bootstrap";
import axios from "axios";
import EditAccount from "./EditAccount";
require('../css/tableAccount.css');
export default function TableAccount({
  accounts,
  setAccounts,
  getAccounts,
  balance,
  expenses,
  income,
}) {
  const [alertSuccess, setAlertSuccess] = useState("");
  const [account, setGetAccount] = useState();
  const [filterTypeState, SetFilterTypeState] = useState();

  useEffect(() => {
    balance();
  });

  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getAccountForId = async (id) => {
    const { data } = await axios.get(`/account=${id}`);
    setGetAccount(data);
    handleShow();
  };

  const deleteAccount = async (id) => {
    if (window.confirm(`Estas seguro que deseas eliminar al ID:${id}?`)) {
      await axios.delete(`/account=${id}`);
      setAlertSuccess(`El ID:${id} a sido eliminado exitosamente`);
      getAccounts();
      balance();
    }
    setTimeout(() => {
      setAlertSuccess("");
    }, 3000);
  };

  const filterType = (e) => {
    SetFilterTypeState();
    const typeValue = e.target.value;
    if (typeValue !== "null") {
      const filterTypeArray = accounts.filter((account) => {
        return account.type === `${typeValue}`;
      });
      SetFilterTypeState(filterTypeArray);
    } else {
      SetFilterTypeState();
    }}
 

  const filterCategory = (e) => {
    SetFilterTypeState();
    const categoryValue = e.target.value;
    if (categoryValue !== "null") {
      const filterTypeArray = accounts.filter((account) => {
        return account.category === `${categoryValue.toUpperCase()}`;
      });
      if(filterTypeArray.length === 0 ){
        return alert(`No hay nada en la categoria: ${categoryValue}`);
      }
      
      SetFilterTypeState(filterTypeArray);
    } else {
      SetFilterTypeState();
    }}
  
 
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <EditAccount
          handleClose={handleClose}
          account={account}
          setAlertSuccess={setAlertSuccess}
          getAccounts={getAccounts}
        />
      </Modal>

      {alertSuccess && (
        <Alert variant="success" className="w-50">
          {alertSuccess}
        </Alert>
      )}
      <div className="Conteiner-title-table">
      <h2 className="title-table">Tabla de Gastos</h2>
      </div>
      <div>
        <div className="d-flex">
          <Form.Select
            name="filter"
            aria-label="Default select example"
            className="mt-3 me-2 mb-2"
            onChange={(e) => {
              filterType(e);
            }}
          >
            <option required value="null">
              Filtrar por tipo
            </option>
            <option value="EGRESO">Egreso</option>
            <option value="INGRESO">Ingreso</option>
          </Form.Select>

          <Form.Select
            name="filter"
            aria-label="Default select example"
            className="mt-3 mb-2"
            onChange={(e) => {
              filterCategory(e);
            }}
          >
            <option required value="null">
              Filtrar por categoria
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
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Tipo</th>
              <th>Categoria</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Comentario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filterTypeState
              ? filterTypeState.map?.((account) => (
                  <tr key={account.id}>
                    <td data-titulo='#'>{account.id}</td>
                    {account.type === "EGRESO" ? (
                      <td data-titulo='Tipo:' style={{ color: "red" }}>
                        {account.type}{" "}
                      </td>
                    ) : (
                      <td data-titulo='Tipo:'>
                        {account.type}
                      </td>
                    )}
                    <td data-titulo='Categoria: '>{account.category}</td>
                    <td data-titulo='Monto: '>${account.value}</td>
                    <td data-titulo='Fecha: '>{account.date.substr(0, 10)}</td>
                    <td data-titulo='Comentario: '>{account.comment}</td>
                    <td data-titulo='' className="d-flex justify-content-center">
                      <Button
                        variant="primary"
                        className="button-edit"
                        onClick={() => getAccountForId(account.id)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          deleteAccount(account.id);
                        }}
                      >
                        Eliminar
                      </Button>{" "}
                    </td>
                  </tr>
                ))
              : accounts.map?.((account) => (
                  <tr key={account.id}>
                    <td data-titulo='#'>{account.id}</td>
                    {account.type === "EGRESO" ? (
                      <td data-titulo='Tipo: ' style={{ color: "red" }}>
                        {account.type}{" "}
                      </td>
                    ) : (
                      <td data-titulo='Tipo: '>
                        {account.type}
                      </td>
                    )}
                    <td data-titulo='Categoria: '>{account.category}</td>
                    <td data-titulo='Monto: '>${account.value}</td>
                    <td data-titulo='Fecha: '>{account.date.substr(0, 10)}</td>
                    <td data-titulo='Comentario: '>{account.comment}</td>
                    <td data-titulo='' className="d-flex justify-content-center">
                      <Button
                        variant="primary"
                        className="button-edit"
                        onClick={() => getAccountForId(account.id)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          deleteAccount(account.id);
                        }}
                      >
                        Eliminar
                      </Button>{" "}
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>
      </div>
      <h2>Balance</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="income" >
              Ingreso
            </th>
            <th className="expenses" style={{ color: "red" }}>
              Egreso
            </th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td data-titulo='Ingreso:' className="income">${income}</td>
          <td data-titulo='Egreso:' className="expenses">${expenses}</td>
          {income - expenses > 0 ? <td data-titulo='Total:'>
            ${income - expenses}</td> : <td data-titulo='Total:' style={{ color: "red" }}>
            ${income - expenses}
          </td>}
          </tr>
        </tbody>
      </Table>
    </>
  );
}

