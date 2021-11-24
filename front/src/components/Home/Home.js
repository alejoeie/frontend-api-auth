import React from "react";
import './Home.css';

function Home(){
    return (
            <div className="home_page">
            <h2>Hola a todos</h2>
            <p>
                Este es mi proyecto Electrico y servira como base
                para futuros proyectos para llevar a cabo el proceso
                de cambio de una pagina web funcional para generar
                preguntas y respuestas que sirvan como practica para el
                examen de admision para las universidades.
            </p>
            <a href="https://www.ucr.ac.cr/estudiantes/admision/" target="_blank" 
            rel="noopener noreferrer">Admision a la U</a>

            <h3>Visita a la UCR</h3>

            <a href="https://www.ucr.ac.cr/" target="_blank" 
            rel="noopener noreferrer">Pagina Principal</a>
        </div>
    )
}

export default Home;