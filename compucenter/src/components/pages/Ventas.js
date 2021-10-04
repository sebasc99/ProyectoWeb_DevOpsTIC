import React from 'react';
import './Productos.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';

const datosVenta = [
  { id: 1, valor: '300000', idProducto: '1', cantidad: '3', precioUnitario: '100000', fecha: '2021-10-07', idCliente: '234', nombreCliente: 'Marco', nombreVendedor: 'Rosa' },
  { id: 2, valor: '300000', idProducto: '2', cantidad: '3', precioUnitario: '100000', fecha: '2021-10-07', idCliente: '234', nombreCliente: 'Marco', nombreVendedor: 'Rosa' },
  { id: 3, valor: '300000', idProducto: '3', cantidad: '3', precioUnitario: '100000', fecha: '2021-10-07', idCliente: '234', nombreCliente: 'Marco', nombreVendedor: 'Rosa' },
  { id: 4, valor: '300000', idProducto: '4', cantidad: '3', precioUnitario: '100000', fecha: '2021-10-07', idCliente: '234', nombreCliente: 'Marco', nombreVendedor: 'Rosa' },
];

class Ventas extends React.Component {

  state = {
    data: datosVenta,
    form: {
      id: "",
      valor: "",
      idProducto: "",
      precioUnitario: "",
      fecha: "",
      idCliente: "",
      nombreCliente: "",
      nombreVendedor: "",
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
    this.setState({ modalEditar: false, });
  };

  insertar = () => {
    var valorNuevo = { ...this.state.form };
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
        arreglo[contador].nombre = dato.nombre;
        arreglo[contador].valor = dato.valor;
        arreglo[contador].idProducto = dato.idProducto;
        arreglo[contador].precioUnitario = dato.precioUnitario;
        arreglo[contador].fecha = dato.fecha;
        arreglo[contador].idCliente = dato.idCliente;
        arreglo[contador].nombreCliente = dato.nombreCliente;
        arreglo[contador].nombreVendedor = dato.nombreVendedor;
      }
      contador++;
    });
    this.setState({
      data: arreglo,
      modalEditar: false,
    });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("¿Está seguro que desea eliminar el registro de venta " + dato.id + "?");
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id === registro.id) {
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
        <h2 className="titulo">GESTION DE VENTAS</h2>
        <br />
        
        <div className="barraBusqueda">
          <input type="text" placeholder="Buscar" className="textField" name="busqueda" />
          <button type="button" className="btnBuscar">Buscar</button>
        </div>

        <br />

        <Container>
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>Nueva Venta</Button>
          <br /><br />
          <Table style={{border: 1 + 'px solid black'}}>
            <thead>
              <tr className="Cabecera">
                <th>ID venta</th>
                <th>Valor</th>
                <th>ID producto</th>
                <th>Cantidad</th>
                <th>Precio unitario</th>
                <th>Fecha</th>
                <th>ID cliente</th>
                <th>Nombre cliente</th>
                <th>Nombre vendedor</th>
                <th>Editar/Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((venta) => (
                <tr key={venta.id} className="Datos">
                  <td>{venta.id}</td>
                  <td>{venta.valor}</td>
                  <td>{venta.idProducto}</td>
                  <td>{venta.cantidad}</td>
                  <td>{venta.precioUnitario}</td>
                  <td>{venta.fecha}</td>
                  <td>{venta.idCliente}</td>
                  <td>{venta.nombreCliente}</td>
                  <td>{venta.nombreVendedor}</td>
                  <td>
                    <Button color="primary" onClick={() => this.mostrarModalEditar(venta)}>Editar</Button>
                    {"  "}
                    <Button color="danger" onClick={() => this.eliminar(venta)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
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
              <input className="form-control" readOnly type="text" value={this.state.data.length + 1} />
            </FormGroup>

            <FormGroup>
              <label>Valor:</label>
              <input className="form-control" name="valor" type="number" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Id Producto:</label>
              <input className="form-control" name="idProducto" type="text" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Cantidad:</label>
              <input className="form-control" name="cantidad" type="number" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Precio unitario:</label>
              <input className="form-control" name="precioUnitario" type="number" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Fecha:</label>
              <input className="form-control" name="fecha" type='date' onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Id Cliente:</label>
              <input className="form-control" name="idCliente" type='text' onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Nombre del cliente:</label>
              <input className="form-control" name="nombreCliente" type="text" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Nombre del vendedor:</label>
              <input className="form-control" name="nombreVendedor" type="text" onChange={this.handleChange} />
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>Insertar</Button>
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
              <input className="form-control" readOnly type="text" value={this.state.form.id} />
            </FormGroup>

            <FormGroup>
              <label>Valor:</label>
              <input className="form-control" name="valor" type="number" onChange={this.handleChange} value={this.state.form.valor} />
            </FormGroup>

            <FormGroup>
              <label>ID Producto:</label>
              <input className="form-control" name="idProducto" type="text" onChange={this.handleChange} value={this.state.form.idProducto} />
            </FormGroup>

            <FormGroup>
              <label>Cantidad:</label>
              <input className="form-control" name="cantidad" type="number" onChange={this.handleChange} value={this.state.form.cantidad} />
            </FormGroup>

            <FormGroup>
              <label>Precio unitario:</label>
              <input className="form-control" name="precioUnitario" type='number' onChange={this.handleChange} value={this.state.form.precioUnitario} />
            </FormGroup>

            <FormGroup>
              <label>Fecha:</label>
              <input className="form-control" name="fecha" type='date' onChange={this.handleChange} value={this.state.form.fecha} />
            </FormGroup>

            <FormGroup>
              <label>ID cliente:</label>
              <input className="form-control" name="idCliente" type="text" onChange={this.handleChange} value={this.state.form.idCliente} />
            </FormGroup>

            <FormGroup>
              <label>Nombre del cliente:</label>
              <input className="form-control" name="nombreCliente" type="text" onChange={this.handleChange} value={this.state.form.nombreCliente} />
            </FormGroup>

            <FormGroup>
              <label>Nombre del vendedor:</label>
              <input className="form-control" name="nombreVendedor" type="text" onChange={this.handleChange} value={this.state.form.nombreVendedor} />
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

export default Ventas;