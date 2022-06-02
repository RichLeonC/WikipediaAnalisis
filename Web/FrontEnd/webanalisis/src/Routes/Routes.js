import React from 'react';
import {BrowserRouter,Routes ,Route} from 'react-router-dom';
import '../Routes/App.css';
import Home from '../Paginas/Principal';
import Estadistica from '../Paginas/Estadisticas';



export default function RoutesP() {
    

    return (
  
        <BrowserRouter>
            <Routes>
          
                <Route  path="/" element={<Home/>}/>
                <Route  path="/Estadistica" element ={<Estadistica/>}/>
        
                
            </Routes>
            </BrowserRouter>
    )
  }
