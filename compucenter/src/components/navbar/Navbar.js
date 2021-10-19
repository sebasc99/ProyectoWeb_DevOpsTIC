import React from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">COMPUCENTER</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/productos">Gestion de Productos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/ventas">Gestion de Ventas</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/usuarios">Gestion de Usuarios</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav justify-content-end">
                            <li className="nav-item">
                                <Link className="nav-link" to="#">Salir</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;