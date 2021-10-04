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
    </div>
  );
}

export default App;