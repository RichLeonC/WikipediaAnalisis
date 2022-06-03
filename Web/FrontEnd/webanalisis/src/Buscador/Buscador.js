import React from 'react'
import './buscador.css'

export default function Buscador() {
  return (
    <div className='fondo'>
        <div className='container col-sm-3' style={{position:"relative",bottom:"19rem"}}>
            <h1>Buscá tu palabra favorita</h1>
            <input className="form-control" style={{width:"25rem",height:"3rem", fontSize:'25px', marginTop:"2rem"}}></input>
        </div>
    </div>
  )
}
