import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './buscador.css'

export default function Buscador() {
  const baseUrl = "http://localhost:3001/paginas";
  const [data, setData] = useState([]);
  const [paginas, setPaginas] = useState([]);
  const Searcher = async (e) => {
    const palabra = e.target.value;
    setData(palabra);
    // if(data.length>0)
    // peticionGet();
  }

  useEffect(() => {
    if(data.length>0)
   peticionGet();
  }, [data]);

  const peticionGet = async () => { //Realiza peticiones Get al backend
    console.log(data);
    await axios.get(baseUrl + "/" + data+ "/1")
      .then(response => {
        setPaginas(response.data);
      }).catch(error => {
        console.log(error);
      })
  }


  return (
    <div className='fondo' style={{ backgroundImage: 'url(https://wallpaper.dog/large/11007600.jpg)', height: "1000px", weight: "2000px", backgroundRepeat: "no-repeat" }}>
      <div className='container col-sm-3' style={{ position: "relative", bottom: "19rem" }}>
        <h1>Buscá tu palabra favorita</h1>
        <input className="form-control" placeholder='palabra...'
          style={{ width: "25rem", height: "3rem", fontSize: '25px', marginTop: "2rem" }}
          onChange={Searcher}></input>
        <br></br>
        <button className="buton-container" > Estadistica </button>
      </div>
        <table className="table table-striped table-dark mt-2 offset-md-3 col-sm-10" style={{ color: "white", position:'absolute',right:'10rem', top:"21rem"}}>
          <thead>
            <tr>
              <th>Número</th>
              <th>Nombre</th>
              <th>Palabra</th>
              <th>Repetidas</th>
            </tr>
          </thead>
          <tbody>
            {
              paginas.map(pagina => (
                <tr>
                  <td>{pagina.numeroPagina}</td>
                  <td>{pagina.nombrePagina} </td>
                  <td>{pagina.palabra}</td>
                  <td>{pagina.cantidadRe}</td>
                </tr>
              ))
            }

          </tbody>
        </table>

    </div>
  )
}
