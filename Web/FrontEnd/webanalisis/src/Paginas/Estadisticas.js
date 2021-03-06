import React, { useState, useEffect } from "react";
import { Chart, ArcElement, Legend, Tooltip, Title } from 'chart.js'
import { ModalHeader, Modal, ModalBody, Button, Form, Select, ModalFooter } from 'reactstrap'
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import Label from '../componentes/labels/label';
import {  useNavigate } from 'react-router-dom';
Chart.register(ArcElement, Legend, Tooltip, Title);





function Estadísticas() {
    const baseUrl = "http://localhost:3001/paginas/2";
    const baseUrlPaginas = 'http://localhost:3001/paginas/all'
    const [dataP, setData] = useState([]);
    const [modal, setModal] = useState(false);
    const [paginas,setPaginas] = useState([]);
    const navigate = useNavigate();
    let cantidadTitulos = dataP.map(cantidad=>cantidad.cantTitulos);
    let cantidadPalabras = dataP.map(cantidad=>cantidad.cantPalabrasDistintas);
    let cantidadActivos = dataP.map(cantidad=>cantidad.cantLinksActivos);
    let cantidadNoActivos = dataP.map(cantidad=> cantidad.cantLinksNoActivos);
    let cantReferencias = dataP.map(cantidad=>cantidad.cantReferencias);
    let cantImgAlt = dataP.map(cantidad=>cantidad.cantImgAlt);
    let cantImg = dataP.map(cantidad=>cantidad.cantImg);

    function volver(){
        navigate('/');
    };


    const abrirCerrarModal = () => {
        setModal(!modal);
    }

    const peticionGet = async () => { //Realiza peticiones Get al backend 
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
                console.log(dataP);
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionGetPaginas = async () => { //Realiza peticiones Get al backend 
        await axios.get(baseUrlPaginas)
            .then(response => {
                setPaginas(response.data);
            }).catch(error => {
                console.log(error);
            })
    }



    useEffect(() => {
        peticionGet();
        peticionGetPaginas();
    }, []);

    const data = {
        labels: ['CantidadTitulos','CantidadPalabras','Links','NoActivos', 'Referencias','CantidadAlts','CantidadImagenes'],

        datasets: [{
            backgroundColor: ['#023E8A', '#03045E','#4d3d66', '#85b1f9',' #99374b',
            '#2c1421',' #a34647' ],
            data: [cantidadTitulos,cantidadPalabras,cantidadActivos,cantidadNoActivos,
                cantReferencias,cantImgAlt,cantImg],
            weight: 1

        }]

    };


    const opciones = {
        presponsive: true,
        maintainAspectRatio: false

    }

    return (
        <div>
            <div className="Estadistica" style={{ backgroundImage: 'url(https://wallpaper.dog/large/11007600.jpg)', height: "1000px", weight: "2000px", backgroundRepeat: "no-repeat" }}>
                <br></br>
                <Label text={'Estadistica General'} />
                <div className="grafico" style={{ weight: "600px", height: "600px", position: "relative", bottom: "-40px" }}>
                    <Doughnut data={data} options={opciones} />
                    <br></br>
                    <button className="boton-container" onClick={volver}>
                        Volver
                    </button>
                </div>

            </div>

             <div style={{ margin: '1rem', position: 'relative', bottom: '55rem' }}>
                <button className="boton-container" onClick={()=>abrirCerrarModal()}>Palabras Más Comunes</button>
            </div> 


             <Modal isOpen={modal}>
                <ModalBody>
                    <table className="table table-striped table-dark mt-2 offset-md-2 col-sm-2">
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
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-primary" size="sm" onClick={() => abrirCerrarModal()}>Cerrar</Button>
                </ModalFooter>
            </Modal> 
            
         
        </div>
    )




}

export default Estadísticas; 