import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Productos from './components/pages/Productos';
import Ventas from './components/pages/Ventas';
import Usuarios from './components/pages/Usuarios';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/productos" exact component={Productos} />
          <Route path="/ventas" exact component={Ventas} />
          <Route path="/usuarios" exact component={Usuarios} />
        </Switch>
      </Router>

      <div class="banner">
        <img src={banner} alt="" class="banner__img" />
        <div class="contenedor">

        </div>
      </div>

      <main class="main">
        <div class="contenedor">
          <section class="gestiones">
            <h2 class="section__titulo">Modulos de Gestión</h2>
            <div class="gestiones__columna" href="">
              <img src={gestion_producto} alt="" class="gestion__imagen" />
              <div class="gestion__descripcion">
                <h3 class="gestion__titulo">Gestión de Productos</h3>
                <p class="gestion__txt">Aqui va la descripción</p>
              </div>
            </div>
            <div class="gestiones__columna">
              <img src={gestion_ventas} alt="" class="gestion__imagen" />
              <div class="gestion__descripcion">
                <h3 class="gestion__titulo">Gestión de Ventas</h3>
                <p class="gestion__txt">Aqui va la descripción</p>
              </div>
            </div>
            <div class="gestiones__columna">
              <img src={gestion_usuario} alt="" class="gestion__imagen" />
              <div class="gestion__descripcion">
                <h3 class="gestion__titulo">Gestión de Usuarios</h3>
                <p class="gestion__txt">Aqui va la descripción</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div >
  );
}

export default App;