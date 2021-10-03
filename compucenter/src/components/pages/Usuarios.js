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
  { id: 1, Usuario: "Monica Alvarez", Rol: "Administrador", Estado: "Pendiente" },
  { id: 2, Usuario: "Andres", Rol: "Comercial", Estado: "Pendiente" },
  { id: 3, Usuario: "Sebastian Cardenas", Rol: "Comercial", Estado: "Pendiente" },
  { id: 4, Usuario: "Luis Gomez", Rol: "Comercial", Estado: "Pendiente" },
  { id: 5, Usuario: "Sebastian Cataño", Rol: "Comercial", Estado: "Pendiente" },
  { id: 6, Usuario: "Sebastian Leal", Rol: "Comercial", Estado: "Pendiente" },
];

class Usuarios extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      Usuario: "",
      Rol: "",
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
        arreglo[contador].Usuario = dato.Usuario;
        arreglo[contador].Rol = dato.Rol;
        arreglo[contador].Estado = dato.Estado;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
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
        <header className="header paginas">
          <div className="contenedor">
            <h1 className="logo">CompuCenter</h1>
            <span className="icon-menu" id="btn-menu"></span>
            <nav className="nav" id="nav">
              <ul className="menu">
                <li className="menu_item"><a className="menu_link" href="">Home</a></li>
                <li className="menu_item"><a className="menu_link" href="">Gestión de Productos</a></li>
                <li className="menu_item"><a className="menu_link select" href="">Gestión de Ventas</a></li>
                <li className="menu_item"><a className="menu_link" href="">Gestión de Usuarios</a></li>
                <li className="menu_item"><a className="menu_link" href="">Salir</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <h2>Gestión de Usuarios</h2 >
        
        <Container>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.Usuario}</td>
                  <td>{dato.Rol}</td>
                  <td>{dato.Estado}</td>
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
            <div><h3>Editar Registro</h3></div>
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
                name="Usuario"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Usuario}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Rol:
              </label>
              <input
                className="form-control"
                name="Rol"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Rol}
              />
            </FormGroup>

            <FormGroup>
              <label>
                estado :
              </label>
              <input
                className="form-control"
                name="estado"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.estado}
              />
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
            <div><h3>Insertar Usuario</h3></div>
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
                name="Usuario"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Rol:
              </label>
              <input
                className="form-control"
                name="Rol"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                estado:
              </label>
              <input
                className="form-control"
                name="estado"
                type="text"
                onChange={this.handleChange}
              />
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
