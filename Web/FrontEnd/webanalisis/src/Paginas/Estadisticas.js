import React, { useState, useEffect } from "react";
import { Chart, ArcElement, Legend, Tooltip,Title } from 'chart.js'
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import Label from '../componentes/labels/label';
Chart.register(ArcElement, Legend, Tooltip,Title);




function Estadísticas() {
    const baseUrl = "http://localhost:3001/paginas/2";
    const [dataP, setData] = useState([]);
    let cantidadTitulos = dataP.map(cantidad=>cantidad.cantTitulos);
    let cantidadPalabras = dataP.map(cantidad=>cantidad.cantPalabrasDistintas);
    let cantidadActivos = dataP.map(cantidad=>cantidad.cantLinksActivos);
    let cantidadNoActivos = dataP.map(cantidad=> cantidad.cantLinksNoActivos);
    let cantReferencias = dataP.map(cantidad=>cantidad.cantReferencias);
    let cantImgAlt = dataP.map(cantidad=>cantidad.cantImgAlt);
    let cantImg = dataP.map(cantidad=>cantidad.cantImg);




    const peticionGet = async()=>{ //Realiza peticiones Get al backend 
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
                console.log(dataP);
            }).catch(error => {
                console.log(error);
            })
    }



    useEffect(() => {
            peticionGet();
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
        <div className="Estadistica" style={{ backgroundImage: 'url(https://wallpaper.dog/large/11007600.jpg)', height: "1000px", weight: "2000px", backgroundRepeat: "no-repeat" }}>
            <br></br>
            <Label text={'Estadistica General'} />
            <div className="grafico" style={{ weight: "50px", height: "50px", position: "relative", bottom: "-10px" }}>
                <Doughnut data={data} options={opciones} />
            </div>
        </div>
    )




}

export default Estadísticas; 