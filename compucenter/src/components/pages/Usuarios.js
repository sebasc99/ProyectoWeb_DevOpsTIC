import React from "react";
//import logo from "./logo.svg"; 
import "./Usuarios.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  { id: 1, usuario: "Monica Alvarez", rol: "Administrador", estado: "Inactivo" },
  { id: 2, usuario: "Andres", rol: "Vendedor", estado: "Inactivo" },
  { id: 3, usuario: "Sebastian Cardenas", rol: "Vendedor", estado: "Inactivo" },
  { id: 4, usuario: "Luis Gomez", rol: "Vendedor", estado: "Inactivo" },
  { id: 5, usuario: "Sebastian Cataño", rol: "Vendedor", estado: "Inactivo" },
  { id: 6, usuario: "Sebastian Leal", rol: "Vendedor", estado: "Inactivo" },
];

class Usuarios extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      usuario: "",
      rol: "",
      estado: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].usuario = dato.usuario;
        arreglo[contador].rol = dato.rol;
        arreglo[contador].estado = dato.estado;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Está Seguro que deseas eliminar el usuario " + dato.id + "?");
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {

    return (
      <>
        <br />
        <h2>GESTION DE USUARIOS</h2>
        <br />
        
        <div className="barraBusqueda">
          <input type="text" placeholder="Buscar" className="textField" name="busqueda" />
          <button type="button" className="btnBuscar">Buscar</button>
        </div>

        <br />

        <Container>
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>Nuevo Usuario</Button>
          <br /><br />
          <Table style={{border: 1 + 'px solid black'}}>
            <thead>
              <tr className="Cabecera">
                <th>ID</th>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id} className="Datos">
                  <td>{dato.id}</td>
                  <td>{dato.usuario}</td>
                  <td>{dato.rol}</td>
                  <td>{dato.estado}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={() => this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div><h3>Editar Usuario</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id:
              </label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Usuario:
              </label>
              <input
                className="form-control"
                name="usuario"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.usuario}
              />
            </FormGroup>

            <FormGroup>
              <label>Rol:</label>
              <select className="form-control" name="rol" onChange={this.handleChange} value={this.state.form.rol}>
                <option value="">Seleccione</option>
                <option value="ADMINISTRADOR">Administrador</option>
                <option value="VENDEDOR">Vendedor</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Estado:</label>
              <select className="form-control" name="estado" onChange={this.handleChange} value={this.state.form.estado}>
                <option value="">Seleccione</option>
                <option value="ACTIVO">Activo</option>
                <option value="PENDIENTE">Pendiente</option>
                <option value="INACTIVO">Inactivo</option>
              </select>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div><h3>Nuevo Usuario</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id:
              </label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length + 1}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Usuario:
              </label>
              <input
                className="form-control"
                name="usuario"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Rol:</label>
              <select className="form-control" name="rol" onChange={this.handleChange}>
                <option value="">Seleccione</option>
                <option value="ADMINISTRADOR">Administrador</option>
                <option value="VENDEDOR">Vendedor</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Estado:</label>
              <select className="form-control" name="estado" onChange={this.handleChange}>
                <option value="">Seleccione</option>
                <option value="ACTIVO">Activo</option>
                <option value="PENDIENTE">Pendiente</option>
                <option value="INACTIVO">Inactivo</option>
              </select>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default Usuarios;
