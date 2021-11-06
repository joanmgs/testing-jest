import React, { useState } from "react";
import '../styles/Testeador.css';

export default function Testeador() {
    const [nombre, setNombre] = useState("SinNombre");

    const handleName = () => {
        setNombre(nombre === "SinNombre" ? "UnNombre" : "SinNombre");
    };

    return (<>
        <h1>{nombre}</h1>
        <button onClick={handleName}>
            Cambia el nombre b-1
        </button>
        <button onClick={handleName}>
            Cambia el nombre b-2
        </button>
        <a className="linky" href="/">Hola</a>
    </>);
};