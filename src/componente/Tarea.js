import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/Table.css";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";

function Tarea() {
  var listaElementos = JSON.parse(localStorage.getItem("tareas"));
  if (!listaElementos) listaElementos = [];
  const [busqueda, setBusqueda] = useState("");
  const [result, setResult] = useState(listaElementos);
  const navigate = useNavigate();
  function newTask() {
    navigate("/new");
  }
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  function buscarTarea(text) {
    console.log("buscarTarea");
    if (text.length > 0) {
      let data = listaElementos.filter(
        (element) =>
          element.id.includes(text) || element.descripcion.includes(text)
      );
      setResult(data);
    } else {
      setResult(listaElementos);
      console.log("result vacio");
    }

    console.log(result);
  }

  function onChange(item) {
    setBusqueda(item.value);
    buscarTarea(item.value);
  }

  function deleteElement(id) {
    const tareas = localStorage.getItem("tareas");
    let listaElementos = JSON.parse(localStorage.getItem("tareas"));
    const IndexElementeInArray = listaElementos.findIndex(
      (element) => element.id === id
    );
    listaElementos.splice(IndexElementeInArray, 1);
    localStorage.setItem("tareas", JSON.stringify(listaElementos));
    setResult(listaElementos);

    navigate("/");
  }

  function editElement(id) {
    navigate("/new/" + id);
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            <button className="btn btn-primary" onClick={() => newTask()}>
              Nueva Tarea
            </button>
          </th>
          <th>
            <Form.Group className="mb-6" controlId="busqueda">
              <Form.Label>Busqueda</Form.Label>
              <Form.Control
                type="text"
                name="buscar"
                onChange={(event) => onChange(event.target)}
              />
            </Form.Group>
          </th>
          <th></th>
        </tr>
        <tr>
          <th>ID</th>
          <th>Descripcion</th>
          <th>Fecha Terminacion</th>
          <th>Estado</th>
          <th>Etiqueta</th>
        </tr>
      </thead>
      <tbody>
        {result.map((item) => {
          return (
            <tr>
              <td>
                <p>{item.id}</p>
              </td>
              <td>
                <p>{item.descripcion}</p>
              </td>
              <td>
                <p>{item.fechaTerminacion}</p>
              </td>
              <td>
                <p>{item.estado}</p>
              </td>
              <td>
                <p>{item.etiqueta}</p>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => editElement(item.id)}
                >
                  Editar
                </button>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => deleteElement(item.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default Tarea;
