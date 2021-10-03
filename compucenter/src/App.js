import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Productos from './components/pages/Productos';

function App() {
  return (
    <div className="App">
      <Router>
          <Navbar />
          <Switch>
            <Route path="/productos" exact component={Productos} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;