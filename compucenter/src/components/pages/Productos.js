import React from 'react';
//import logo from './logo.svg';
import './Productos.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Collapse } from 'reactstrap';

const data = [
  { id: 1, nombre: "Portatil", descripcion: "Este es un portatil", cantidad: 5, estado: "ACTIVO", categoria: "Portatiles" },
  { id: 2, nombre: "PC Gamer", descripcion: "Este es un PC Gamer", cantidad: 8, estado: "ACTIVO", categoria: "PC Gamers" },
  { id: 3, nombre: "Monitor", descripcion: "Este es un monitor", cantidad: 4, estado: "ACTIVO", categoria: "Monitores" },
  { id: 4, nombre: "Diadema", descripcion: "Este es un diadema", cantidad: 10, estado: "ACTIVO", categoria: "Accesorios" },
  { id: 5, nombre: "Mouse", descripcion: "Este es un mouse", cantidad: 15, estado: "ACTIVO", categoria: "Accesorios" },
];

class Productos extends React.Component {

  state = {
    data: data,
    form: {
      id: "",
      nombre: "",
      descripcion: "",
      cantidad: "",
      estado: "",
      categoria: "",
    },
    modalInsertar: false,
    modalEditar: false,
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

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
      form: registro,
      modalEditar: true,
    });
  };

  cerrarModalEditar = () => {
    this.setState({
      modalEditar: false,
    });
  };

  insertar = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    var arreglo = this.state.data;
    arreglo.push(valorNuevo);
    this.setState({
      modalInsertar: false,
      data: arreglo,
    });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].nombre = dato.nombre;
        arreglo[contador].descripcion = dato.descripcion;
        arreglo[contador].cantidad = dato.cantidad;
        arreglo[contador].estado = dato.estado;
        arreglo[contador].categoria = dato.categoria;
      }
      contador++;
    });
    this.setState({
      data: arreglo,
      modalEditar: false,
    });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Está seguro que desea eliminar el producto " + dato.id + "?");
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({
        data: arreglo,
        modalEditar: false,
      });
    }
  };

  render() {
    return (
      <>
        <br />
        <h2 className="titulo">GESTION DE PRODUCTOS</h2>
        <br />
        <Container>
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>Nuevo Producto</Button>
          <br /><br />
          <Table style={{border: 1 + 'px solid black'}}>
            <thead>
              <tr className="Cabecera">
                <th>Id</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Cantidad</th>
                <th>Estado</th>
                <th>Categoria</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr key={elemento.id} className="Datos">
                  <td>{elemento.id}</td>
                  <td>{elemento.nombre}</td>
                  <td>{elemento.descripcion}</td>
                  <td>{elemento.cantidad}</td>
                  <td>{elemento.estado}</td>
                  <td>{elemento.categoria}</td>
                  <td>
                    <Button color="primary" onClick={() => this.mostrarModalEditar(elemento)}>Editar<i class="bi bi-pencil-square"></i></Button>
                    {"  "}
                    <Button color="danger" onClick={() => this.eliminar(elemento)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div><h3>Nuevo Producto</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className="form-control" readOnly type="text" value={this.state.data.length + 1} />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input className="form-control" name="nombre" type="text" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Descripcion:</label>
              <input className="form-control" name="descripcion" type="text" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Cantidad:</label>
              <input className="form-control" name="cantidad" type="number" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Estado:</label>
              <select className="form-control" name="estado" onChange={this.handleChange}>
                <option value="">Seleccione</option>
                <option value="ACTIVO">Activo</option>
                <option value="INACTIVO">Inactivo</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Categoria:</label>
              <input className="form-control" name="categoria" type="text" onChange={this.handleChange} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>Insertar</Button>
            <Button color="danger" onClick={() => this.cerrarModalInsertar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
            <div><h3>Editar Producto</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className="form-control" readOnly type="text" value={this.state.form.id} />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input className="form-control" name="nombre" type="text" onChange={this.handleChange} value={this.state.form.nombre} />
            </FormGroup>

            <FormGroup>
              <label>Descripcion:</label>
              <input className="form-control" name="descripcion" type="text" onChange={this.handleChange} value={this.state.form.descripcion} />
            </FormGroup>

            <FormGroup>
              <label>Cantidad:</label>
              <input className="form-control" name="cantidad" type="number" onChange={this.handleChange} value={this.state.form.cantidad} />
            </FormGroup>

            <FormGroup>
              <label>Estado:</label>
              <select className="form-control" name="estado" onChange={this.handleChange} value={this.state.form.estado}>
                <option value="">Seleccione</option>
                <option value="ACTIVO">Activo</option>
                <option value="INACTIVO">Inactivo</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Categoria:</label>
              <input className="form-control" name="categoria" type="text" onChange={this.handleChange} value={this.state.form.categoria} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.editar(this.state.form)}>Editar</Button>
            <Button color="danger" onClick={() => this.cerrarModalEditar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <br />
      </>
    )
  }
}

export default Productos;
