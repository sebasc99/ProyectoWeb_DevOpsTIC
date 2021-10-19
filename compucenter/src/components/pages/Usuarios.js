import React from 'react';
import "./Usuarios.css";
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import axios from 'axios';

const url = 'http://localhost:3001/api/usuario';

class Usuarios extends React.Component {

  state = {
    usuarios: [],
    data: {
      _id: "",
      id: "",
      usuario: "",
      rol: "",
      estado: "",
    },
    modalInsertar: false,
    modalEditar: false,
  };

  peticionGet = () => {
    axios.get(url).then(response => {
      //console.log(response.data.ventas);
      //this.setState(response.data)
      const usuarios = response.data.usuarios;
      this.setState({ usuarios });
    }).catch(error => {
      //console.log(error.message);
    })
  }

  componentDidMount() {
    this.peticionGet();
  }

  peticionPost = async () => {
    await axios.post(url, this.state.data).then(response => {
      this.mostrarModalInsertar();
      this.peticionGet();
    }).catch(error => {
      //console.log(error.message);
    });

    this.setState({
      modalInsertar: false,
    });
  }

  peticionPut = () => {
    axios.put(url + '/' + this.state.data._id, this.state.data).then(response => {
      this.peticionGet();
    });

    this.setState({
      modalEditar: false,
    });
  }

  handleChange = async e => {
    e.persist();
    await this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });
    //console.log(this.state.data);
  }


  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({
      modalInsertar: false,
    });
  };

  mostrarModalEditar = (registro) => {
    this.setState({
      data: registro,
      modalEditar: true,
    });
  };

  cerrarModalEditar = () => {
    this.setState({ modalEditar: false, });
  };

  insertar = () => {
    var valorNuevo = { ...this.state.data };
    valorNuevo.id = this.state.data.length + 1;
    var arreglo = this.state.data;
    arreglo.push(valorNuevo);
    this.setState({ modalInsertar: false, data: arreglo });
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
    this.setState({
      data: arreglo,
      modalEditar: false,
    });
  };

  render() {
    return (
      <>
        <br />
        <h2 className="titulo">GESTIÓN DE USUARIOS</h2>
        <br />
        <div className="barraBusqueda">
          <input type="text" placeholder="Buscar" className="textField" name="busqueda" />
          <button type="button" className="btnBuscar">Buscar</button>
        </div>

        <br />

        <Container>
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>Nuevo Usuario</Button>
          <br /><br />
          <Table style={{ border: 1 + 'px solid black' }}>
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
              {this.state.usuarios.map(usuario => {
                return (
                  <tr key={usuario.id} className="Datos">
                    <td>{usuario.id}</td>
                    <td>{usuario.usuario}</td>
                    <td>{usuario.rol}</td>
                    <td>{usuario.estado}</td>
                    <td>
                      <Button color="primary" onClick={() => this.mostrarModalEditar(usuario)}>Editar</Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div><h3>Nuevo Usuario</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className="form-control" name="id" type="text" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Usuario:</label>
              <input className="form-control" name="usuario" type="text" onChange={this.handleChange} />
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
            <Button color="primary" onClick={() => this.peticionPost()}>Insertar</Button>
            <Button color="danger" onClick={() => this.cerrarModalInsertar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
            <div><h3>Editar Usuario</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className="form-control" readOnly name="id" type="text" value={this.state.data.id} />
            </FormGroup>

            <FormGroup>
              <label>Usuario:</label>
              <input className="form-control" name="usuario" type="text" onChange={this.handleChange} value={this.state.data.usuario} />
            </FormGroup>

            <FormGroup>
              <label>Rol:</label>
              <select className="form-control" name="rol" onChange={this.handleChange} value={this.state.data.rol}>
                <option value="">Seleccione</option>
                <option value="ADMINISTRADOR">Administrador</option>
                <option value="VENDEDOR">Vendedor</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Estado:</label>
              <select className="form-control" name="estado" onChange={this.handleChange} value={this.state.data.estado}>
                <option value="">Seleccione</option>
                <option value="ACTIVO">Activo</option>
                <option value="PENDIENTE">Pendiente</option>
                <option value="INACTIVO">Inactivo</option>
              </select>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.peticionPut()}>Editar</Button>
            <Button color="danger" onClick={() => this.cerrarModalEditar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}
export default Usuarios;
