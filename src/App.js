import './App.css';
import React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';


function App() {
  const server = "http://localhost:3001/";
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState();
  const [id, setId] = useState();
  const [editar, setEditar] = useState(false);

  const [empleadosList, setEmpleados] = useState([]);

  const add = () => {
    Axios.post(server + "create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      mensaje("¡Registro exitoso!", "fue registrado con éxito", nombre);
      getEmpleados();
      limpiarCampos();
    }).catch(function (error) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "No se logró agregar al empleado",
        footer: JSON.parse(JSON.stringify(error)).message == "Network Error" ? "Intente más Tarde" : JSON.parse(JSON.stringify(error)).message
      });
    });;
  }

  const update = () => {
    Axios.put(server + "update", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      mensaje("¡Registro exitoso!", "fue actualizado con éxito", nombre);
      getEmpleados();
    }).catch(function (error) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "No se logró actualizar al empleado",
        footer: JSON.parse(JSON.stringify(error)).message == "Network Error" ? "Intente más Tarde" : JSON.parse(JSON.stringify(error)).message
      });
    });;
  }

  const deleteEmpleado = (val) => {
    mensajeEliminar(val);
    getEmpleados();
  }

  const mensaje = (mensaje1, mensaje2, nombre) => {
    Swal.fire({
      title: "<strong>" + mensaje1 + "</strong>",
      html: "<i>El empleado<strong> " + nombre + " </strong>" + mensaje2 + "</i>",
      icon: "success",
      timer: 3000
    });
  }

  const mensajeEliminar = (val) => {
    Swal.fire({
      title: "<strong>Eliminar</strong>",
      html: "<i>¿Realmente desea eliminar a <strong>" + val.nombre + "?</strong></i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
      timer: 10000
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(server + "delete/" + val.Id, {

        }).then(() => {
          Swal.fire({
            title: "¡Empleado eliminado!",
            html: "La información del empleado <strong>" + val.nombre + "</strong> fue eliminada",
            icon: "success",
            timer: 3000
          })
        }).catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "¡Error!",
            text: "No se logró eliminar al empleado",
            footer: JSON.parse(JSON.stringify(error)).message == "Network Error" ? "Intente más Tarde" : JSON.parse(JSON.stringify(error)).message
          });
        });

      }
    });
  }

  const getEmpleados = () => {
    Axios.get(server + "empleados").then((response) => {
      setEmpleados(response.data);
    });
  }

  const editarEmpleado = (val) => {
    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setCargo(val.cargo);
    setPais(val.pais);
    setAnios(val.anios);
    setId(val.Id);
  }

  const limpiarCampos = () => {
    setNombre("");
    setEdad("");
    setCargo("");
    setPais("");
    setAnios("");
    setId("");
    setEditar(false);
  }

  getEmpleados();

  return (
    <div className="container">

      <div className="card">
        <div className="card-header">
          GESTION DE EMPLEADOS
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input type="text" value={nombre} onChange={(event) => {
              setNombre(event.target.value);
            }} className="form-control" placeholder="Ingrese Nombre" aria-label="Nombre" aria-describedby="basic-addon1"></input>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad:</span>
            <input type="Number" value={edad} onChange={(event) => {
              setEdad(event.target.value);
            }} className="form-control" placeholder="Ingrese una edad" aria-label="Nombre" aria-describedby="basic-addon1"></input>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">País:</span>
            <input type="text" value={pais} onChange={(event) => {
              setPais(event.target.value);
            }} className="form-control" placeholder="Ingrese un país" aria-label="Nombre" aria-describedby="basic-addon1"></input>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo:</span>
            <input value={cargo} type="text" onChange={(event) => {
              setCargo(event.target.value);
            }} className="form-control" placeholder="Ingrese un cargo" aria-label="Nombre" aria-describedby="basic-addon1"></input>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años de experiencia:</span>
            <input value={anios} type="number" onChange={(event) => {
              setAnios(event.target.value);
            }} className="form-control" placeholder="Ingrese los años" aria-label="Nombre" aria-describedby="basic-addon1"></input>
          </div>
        </div>
        <div className="card-footer text-muted d-flex justify-content-center">

          {
            editar ?
              <div >
                <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
                <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
              </div>
              : <button className='btn btn-success' onClick={add}>Registrar</button>
          }

        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">País</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>

          </tr>
        </thead>
        <tbody>
          {
            empleadosList.map((val, key) => {
              return <tr key={val.Id}>
                <th>{val.Id}</th>
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.pais}</td>
                <td>{val.cargo}</td>
                <td>{val.anios}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button"
                      onClick={() => {
                        editarEmpleado(val);
                      }}
                      className="btn btn-info">Editar</button>
                    <button type="button"
                      onClick={() => {
                        deleteEmpleado(val);
                      }} className="btn btn-danger">Eliminar</button>
                  </div>
                </td>
              </tr>
            })
          }


        </tbody>
      </table>
    </div>
  );
}

export default App;
