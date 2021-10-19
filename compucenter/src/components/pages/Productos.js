import React from 'react';
import './Productos.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import axios from 'axios';

const url = 'http://localhost:3001/api/producto';

class Productos extends React.Component {

  state = {
    productos: [],
    data: {
      _id: "",
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

  peticionGet = () => {
    axios.get(url).then(response => {
      //console.log(response.data.ventas);
      //this.setState(response.data)
      const productos = response.data.productos;
      this.setState({ productos });
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
      if (dato.id === registro.id) {
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

  render() {
    return (
      <>
        <br />
        <h2 className="titulo">GESTIÓN DE PRODUCTOS</h2>
        <br />
        <div className="barraBusqueda">
          <input type="text" placeholder="Buscar" className="textField" name="busqueda" />
          <button type="button" className="btnBuscar">Buscar</button>
        </div>

        <br />

        <Container>
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>Nuevo Producto</Button>
          <br /><br />
          <Table style={{ border: 1 + 'px solid black' }}>
            <thead>
              <tr className="Cabecera">
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Cantidad</th>
                <th>Estado</th>
                <th>Categoria</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {this.state.productos.map(producto => {
                return (
                  <tr key={producto.id} className="Datos">
                    <td>{producto.id}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.descripcion}</td>
                    <td>{producto.cantidad}</td>
                    <td>{producto.estado}</td>
                    <td>{producto.categoria}</td>
                    <td>
                      <Button color="primary" onClick={() => this.mostrarModalEditar(producto)}>Editar</Button>
                    </td>
                  </tr>
                )
              })}
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
              <input className="form-control" name="id" type="number" onChange={this.handleChange} />
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
              <select className="form-control" name="categoria" onChange={this.handleChange}>
                <option value="">Seleccione</option>
                <option value="PORTATILES">Portatiles</option>
                <option value="PC DE MESA">PC de Mesa</option>
                <option value="PC GAMER">PC Gamer</option>
                <option value="ACCESORIOS">Accesorios</option>
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
            <div><h3>Editar Producto</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>ID:</label>
              <input className="form-control" readOnly type="text" value={this.state.data.id} />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input className="form-control" name="nombre" type="text" onChange={this.handleChange} value={this.state.data.nombre} />
            </FormGroup>

            <FormGroup>
              <label>Descripcion:</label>
              <input className="form-control" name="descripcion" type="text" onChange={this.handleChange} value={this.state.data.descripcion} />
            </FormGroup>

            <FormGroup>
              <label>Cantidad:</label>
              <input className="form-control" name="cantidad" type="number" onChange={this.handleChange} value={this.state.data.cantidad} />
            </FormGroup>

            <FormGroup>
              <label>Estado:</label>
              <select className="form-control" name="estado" onChange={this.handleChange} value={this.state.data.estado}>
                <option value="">Seleccione</option>
                <option value="ACTIVO">Activo</option>
                <option value="INACTIVO">Inactivo</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Categoria:</label>
              <select className="form-control" name="categoria" onChange={this.handleChange} value={this.state.data.categoria}>
                <option value="">Seleccione</option>
                <option value="PORTATILES">Portatiles</option>
                <option value="PC DE MESA">PC de Mesa</option>
                <option value="PC GAMER">PC Gamer</option>
                <option value="ACCESORIOS">Accesorios</option>
              </select>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.peticionPut()}>Editar</Button>
            <Button color="danger" onClick={() => this.cerrarModalEditar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>


        <br />
      </>
    )
  }
}

export default Productos;