import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import Header from './components/header/header';
import CardDeckRoutes from './components/routes/cardDeckRoutes';
import './App.css'


function App() {
  return (
    <div className='appStyle'>
        <HashRouter>
            <Header/>
            <CardDeckRoutes/>
        </HashRouter>
    </div>
  );
}

export default App;
