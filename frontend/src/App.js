// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register'; // ajuste o caminho conforme necessário

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/register" component={Register} />
          {/* Adicione outras rotas conforme necessário */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
