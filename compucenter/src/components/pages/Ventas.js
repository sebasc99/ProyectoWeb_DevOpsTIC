import React from 'react';
import './Ventas.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import axios from 'axios';

const url = 'http://localhost:3001/api/venta';

class Ventas extends React.Component {

  state = {
    ventas: [],
    data: {
      _id: "",
      id: "",
      idCliente: "",
      nombreCliente: "",
      nombreVendedor: "",
      idProducto: "",
      precioUnitario: "",
      cantidad: "",
      valor: "",
      fecha: "",
    },
    modalInsertar: false,
    modalEditar: false,
  };

  peticionGet = () => {
    axios.get(url).then(response => {
      //console.log(response.data.ventas);
      //this.setState(response.data)
      const ventas = response.data.ventas;
      this.setState({ ventas });
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
        arreglo[contador].idCliente = dato.idCliente;
        arreglo[contador].nombreCliente = dato.nombreCliente;
        arreglo[contador].nombreVendedor = dato.nombreVendedor;
        arreglo[contador].idProducto = dato.idProducto;
        arreglo[contador].precioUnitario = dato.precioUnitario;
        arreglo[contador].cantidad = dato.cantidad;
        arreglo[contador].valor = dato.valor;
        arreglo[contador].fecha = dato.fecha;
      }
      contador++;
    });
    this.setState({
      data: arreglo,
      modalEditar: false,
    });
  };

  calcularValor = () => {
    var precioUnidad = document.getElementById("precioUnitario").value;
    var cantidad = document.getElementById("cantidad").value;
    var multiplicar = (precioUnidad * cantidad);
    var valor = document.getElementById("valor");
    valor.value = multiplicar;
  };

  fechaActual = new Date();
  dd = this.fechaActual.getDate();
  mm = this.fechaActual.getMonth() + 1;
  yyyy = this.fechaActual.getFullYear();
  fechaActual = this.yyyy + '-' + this.mm + '-' + this.dd;

  render() {
    return (
      <>
        <br />
        <h2 className="titulo">GESTIÓN DE VENTAS</h2>
        <br />
        <div className="barraBusqueda">
          <input type="text" placeholder="Buscar" className="textField" name="busqueda" />
          <button type="button" className="btnBuscar">Buscar</button>
        </div>

        <br />

        <Container>
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>Nueva Venta</Button>
          <br /><br />
          <Table style={{ border: 1 + 'px solid black' }}>
            <thead>
              <tr className="Cabecera">
                <th>ID</th>
                <th>ID cliente</th>
                <th>Nombre cliente</th>
                <th>Nombre vendedor</th>
                <th>ID producto</th>
                <th>Precio unitario</th>
                <th>Cantidad</th>
                <th>Valor</th>
                <th>Fecha</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {this.state.ventas.map(venta => {
                return (
                  <tr key={venta.id} className="Datos">
                    <td>{venta.id}</td>
                    <td>{venta.idCliente}</td>
                    <td>{venta.nombreCliente}</td>
                    <td>{venta.nombreVendedor}</td>
                    <td>{venta.idProducto}</td>
                    <td>{venta.precioUnitario}</td>
                    <td>{venta.cantidad}</td>
                    <td>{venta.valor}</td>
                    <td>{venta.fecha}</td>
                    <td>
                      <Button color="primary" onClick={() => this.mostrarModalEditar(venta)}>Editar</Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div><h3>Nueva Venta</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className="form-control" name="id" type="number" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Id Cliente:</label>
              <input className="form-control" name="idCliente" type='number' onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Nombre del cliente:</label>
              <input className="form-control" name="nombreCliente" type="text" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Nombre del vendedor:</label>
              <input className="form-control" name="nombreVendedor" type="text" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Id Producto:</label>
              <input className="form-control" name="idProducto" type="number" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Precio unitario:</label>
              <input className="form-control" name="precioUnitario" id="precioUnitario" type="number" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Cantidad:</label>
              <input className="form-control" name="cantidad" id="cantidad" type="number" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Valor:</label>
              <input className="form-control" name="valor" id="valor" type="number" onChange={this.handleChange} onClick={this.calcularValor} readOnly />
            </FormGroup>

            <FormGroup>
              <label>Fecha:</label>
              <input className="form-control" name="fecha" type='date' value={this.fechaActual} onChange={this.handleChange} readOnly />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.peticionPost()}>Insertar</Button>
            <Button color="danger" onClick={() => this.cerrarModalInsertar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
            <div><h3>Editar Venta</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>ID:</label>
              <input className="form-control" readOnly type="text" value={this.state.data.id} />
            </FormGroup>

            <FormGroup>
              <label>ID cliente:</label>
              <input className="form-control" name="idCliente" type="text" onChange={this.handleChange} value={this.state.data.idCliente} />
            </FormGroup>

            <FormGroup>
              <label>Nombre del cliente:</label>
              <input className="form-control" name="nombreCliente" type="text" onChange={this.handleChange} value={this.state.data.nombreCliente} />
            </FormGroup>

            <FormGroup>
              <label>Nombre del vendedor:</label>
              <input className="form-control" name="nombreVendedor" type="text" onChange={this.handleChange} value={this.state.data.nombreVendedor} />
            </FormGroup>

            <FormGroup>
              <label>ID Producto:</label>
              <input className="form-control" name="idProducto" type="text" onChange={this.handleChange} value={this.state.data.idProducto} />
            </FormGroup>

            <FormGroup>
              <label>Precio unitario:</label>
              <input className="form-control" name="precioUnitario" type='number' onChange={this.handleChange} value={this.state.data.precioUnitario} />
            </FormGroup>

            <FormGroup>
              <label>Cantidad:</label>
              <input className="form-control" name="cantidad" type="number" onChange={this.handleChange} value={this.state.data.cantidad} />
            </FormGroup>

            <FormGroup>
              <label>Valor:</label>
              <input className="form-control" name="valor" type="number" onChange={this.handleChange} value={this.state.data.valor} />
            </FormGroup>

            <FormGroup>
              <label>Fecha:</label>
              <input className="form-control" name="fecha" type='date' value={this.fechaActual} onChange={this.handleChange} />
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

export default Ventas;