import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import Header from './components/header/header';
import CardDeckRoutes from './components/routes/cardDeckRoutes';


function App() {
  return (
    <div>
        <HashRouter>
            <Header/>
            <CardDeckRoutes/>
        </HashRouter>
    </div>
  );
}

export default App;
