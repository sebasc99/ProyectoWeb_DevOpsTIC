import React from 'react';
import './Inicio.css';

const Inicio = () => {
  return (
    <div>
      <div className="Container" style={{ backgroundImage: 'url("../fondo.jpeg")', backgroundSize: 'cover' }}>
        <div className="Fondo-container">
          <img src="../fondo_2.png" />
        </div>
        <div className="Inicio-container">
          <div className="Img-container">
            <img className="User" src="../user_login.png" />
            <br /><br />
            <h2>BIENVENIDO</h2>
            <br /><br />
            <a href="#">
              <input type="submit" class="Button" value="Inicia sesion con Google" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inicio;