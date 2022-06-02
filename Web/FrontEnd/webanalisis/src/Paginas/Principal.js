import React from 'react';
import './Principal.css';
import Label from '../componentes/labels/label';
import Title from '../componentes/Title/Title';

function App() {
  return (
    <div className="App" style={{backgroundImage: 'url(https://www.todofondos.net/wp-content/uploads/4k-ultra-hd-galaxy-wallpapers-top-gratis-4k-ultra-hd-galaxy.-imagen-4k-ultra-hd-de-galaxia-scaled.jpg)', height: "1000px", weight: "1000px", backgroundRepeat: "no-repeat"}}>
        <br></br>
       <div  className='inicio-container'>
         <Label text = 'Web Análisis de Wikipedia'/>
          <br></br>
          <Label text = 'Buscador'/>
          <br></br>
          <button className="buton-container" >
                Entrar
            </button>
          <br></br>
          <Label text = 'Estadísticas Generales'/>
          <br></br>
          <button className="buton-container" >
                Ver
            </button>
       </div>
       <div className="welcome-container">
       <Title text = 'Bienvenidos' />
       </div>
     
      </div>
    
  );
}

export default App;
