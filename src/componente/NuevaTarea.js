import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/Form.css";

function Tarea() {
  let { idElement = "" } = useParams();

  let pDescripcion = "";
  let pFechaTerminacion = "";
  let pEstado = "";
  let pEtiqueta = "";
  var ElementeInArray = [];
  let listaElementos;
  let etiquetas = JSON.parse(localStorage.getItem("etiquetas"));

  if (idElement != "") {
    listaElementos = JSON.parse(localStorage.getItem("tareas"));
    ElementeInArray = listaElementos.filter(
      (element) => element.id === idElement
    );

    pDescripcion = ElementeInArray[0].descripcion;
    pEstado = ElementeInArray[0].estado;
    pEtiqueta = ElementeInArray[0].etiqueta;
    pFechaTerminacion = ElementeInArray[0].fechaTerminacion;

    console.log("prueba="+pEstado);

    console.log(idElement);
  }

  
  const navigate = useNavigate();
  const location = useLocation();

  const [id, setIdTarea] = useState(idElement);
  const [descripcion, setDescripcion] = useState(pDescripcion);
  const [fechaTerminacion, setFeTerminacion] = useState(pFechaTerminacion);
  const [estado, setEstado] = useState(pEstado);
  const [listaEtiqueta, setEtiqueta] = useState(pEtiqueta);  

  const options = [
    {
      label: "Terminado",
      value: "Terminado",
    },
    {
      label: "Pendiente",
      value: "Pendiente",
    },
  ];

  function guardarTarea() {

    if (idElement != "") {

      ElementeInArray[0].descripcion      = descripcion;
      ElementeInArray[0].estado           = estado;
      ElementeInArray[0].etiqueta         = listaEtiqueta;
      ElementeInArray[0].fechaTerminacion = fechaTerminacion;

      localStorage.setItem("tareas", JSON.stringify(listaElementos));

      console.log(listaElementos); 


    }else{

      var tareas = JSON.parse(localStorage.getItem("tareas") || "[]");
      var tarea = {
        id: id,
        descripcion: descripcion,
        fechaTerminacion: fechaTerminacion,
        estado: estado,
        etiqueta: listaEtiqueta,
      };
      tareas.push(tarea);
      localStorage.setItem("tareas", JSON.stringify(tareas));

    }
   

    navigate("/");
  }

  return (
    <div className="contenedor-form">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            name="id"
            value={id}
            onChange={(event) => setIdTarea(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            type="text"
            name="descripcion"
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Fecha Terminacion</Form.Label>
          <Form.Control
            type="text"
            name="fechaTerminacion"
            value={fechaTerminacion}
            onChange={(event) => setFeTerminacion(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Estado</Form.Label>

          <Form.Select
            aria-label="Default select example"
            onChange={(event) => setEstado(event.target.value)}
          >
            <option value="">...</option>
            {options.map((option) => {
                 return (option.value == estado)?<option value={option.value} selected>{option.label}</option> : <option value={option.value}>{option.label}</option>
            }    
            )}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Etiqueta</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={(event) => setEtiqueta(event.target.value)}
          >
            <option value="">...</option>
            {etiquetas.map((option) => {
                 return (option.value == listaEtiqueta)?<option value={option.value} selected>{option.label}</option> : <option value={option.value}>{option.label}</option>
            }    
            )}
          </Form.Select>
          </Form.Group>
        <button className="btn btn-primary" onClick={guardarTarea}>
          Guardar Tarea
        </button>
      </Form>
    </div>
  );
}

export default Tarea;
