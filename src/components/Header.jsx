//@ts-nocheck
import "../styles/header.css";
import "../styles/Opciones.css"
import logo  from "../assets/img/logos/logo1DB.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { faFacebook, faInstagram, faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";

const facebook = <FontAwesomeIcon icon={faFacebook} />;
const linkedin = <FontAwesomeIcon icon={faLinkedinIn} />;
const twitter = <FontAwesomeIcon icon={faTwitter} />;
const instagram = <FontAwesomeIcon icon={faInstagram} />;
const menu = <FontAwesomeIcon icon={faBars} />;


export default function Header(props) {
    
    const [width, setwidth] = useState ({ width: window.screen.availWidth });
    const [show, setShow] = useState("sidenav");

    let toggleNav = () => {
        setShow(show === "sidenav"? "sidenav-show" : "sidenav");
      }

    useEffect(() => {
        setwidth(window.screen.availWidth);
        function handleResize() {
            setwidth(window.screen.availWidth);
        }
        window.addEventListener('resize', handleResize)
        return _ => {
            window.removeEventListener('resize', handleResize)
        }
      }, [])
    
    return (
        <header>
            <div id="header" className="header">
            <div className="logo">
            <Link to="/"><img src={logo} alt="logo" className="logo-img" /></Link>
            <Link to="/"><span className="slogan">El auto que necesitas</span></Link>
            </div> 
            {width > 480? 
            <div className="inputs-header">
                {props.crearCuenta ? "" : <Link to="/crearCuenta"><input className="crearCuenta" name="Crear cuenta" id="Crear cuenta" value="Crear cuenta" type="button"/></Link>} 
                {props.login ? "" :<Link to="/iniciarSesion"><input className="iniciarSesion" name="Iniciar sesión" id="Iniciar sesión" value="Iniciar sesión" type="button"/></Link>}
            </div> 
            :
            <div className="inputs-header"><i className="opciones" id="opciones" onClick={toggleNav}>{menu}</i></div>
            }
            </div>

            <div id='mySidenav ' className={show}>
                <div className="opciones" id="opciones">
                    <p onClick={toggleNav}>X</p>
                    <div className="opciones-header" id="opciones-header">
                        <h2>MENÚ</h2>
                    </div>
                    <div className="opciones-links" id="opciones-links">
                        {props.login ? "" : <Link to="/iniciarSesion"><h3>Iniciar sesión</h3></Link>}
                        {props.crearCuenta ? "" : <Link to="/crearCuenta"><h3>Crear cuenta</h3></Link>}
                    </div>
                    <i>{facebook}  {linkedin}  {twitter}  {instagram}</i>
                </div>
            </div>
        </header>
    )
}
