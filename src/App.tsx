import React from 'react';
import './App.css';
import {useLocation} from "react-router-dom";
import Header from './components/header/header';
import CardDeckRoutes from './components/routes/cardDeckRoutes';

function App() {
const location = useLocation()

        return (
            <div className='appStyle'>
                {
                   !(location.pathname === "/404") && <Header/>
                }
                <CardDeckRoutes/>
            </div>
        )
}

export default App;
