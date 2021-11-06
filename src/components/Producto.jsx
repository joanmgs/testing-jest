//@ts-nocheck
// Librerías
import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// Estilo CSS
import "../styles/producto.css";
// JSON
import item from '../json/Listado.json';
// Íconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faChevronLeft, faStar, faMapMarkerAlt, faUserAlt, faDoorClosed } from "@fortawesome/free-solid-svg-icons";
// Calendario
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { subDays } from 'date-fns';

export default function Producto() {
  const autoTemporal = item.Autos[0];
  const commodityBackArrow = <FontAwesomeIcon icon={faChevronLeft} />;
  const marker = <FontAwesomeIcon icon={faMapMarkerAlt} />;
  const star = <FontAwesomeIcon icon={faStar} />;
  const people = <FontAwesomeIcon icon={faUserAlt} />;
  const door = <FontAwesomeIcon icon={faDoorClosed} />;
  const categoria = "Autos";
  registerLocale("es", es);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [width, setwidth] = useState ({ width: window.screen.availWidth });


  const qualificationText = (qualification) => {
    if(qualification >= 1 && qualification <= 2.5) {
      return "Muy malo";
    } else if(qualification > 2.5 && qualification <= 5) {
      return "Malo";
    } else if(qualification > 5 && qualification <= 7.5) {
      return "Bueno";
    } else if(qualification > 7.5 && qualification <= 10) {
      return "Muy bueno";
    } else {
      return "Sin Calificación";
    };
  };

  const withDoors = (doors) => {
    if(categoria === "Motos" || categoria === "Bicicletas") {
      return "";
    } else {
      return ((<><i>{door}</i><strong>{doors}</strong></>));
    };
  };

  useEffect(() => {
    setwidth(window.screen.availWidth);
    function handleResize() {
        setwidth(window.screen.availWidth);
    }
    window.addEventListener('resize', handleResize)
    return _ => {
        window.removeEventListener('resize', handleResize)
    }
  }, []);

  const center = {
    lat: -34.603722,
    lng: -58.381592
  };

  return (
    <>
      <div className="commodity-container">

        <div className="commodity-header">

          <div className="commodity-header-titles">
            <div>
              <h4>{autoTemporal.category}</h4>
              <h1>{autoTemporal.title}</h1>
            </div>
            <i className="commodity-back-arrow"><a href="/">{commodityBackArrow}</a></i>
            
          </div>

          <div className="commodity-location-ranking">
            <div className="commodity-location-description">
              <i>{marker}</i>
              <div>
                <p> Aquí va la ciudad ingresada en el buscador</p>
                <p>Aquí la distancia y locación: {autoTemporal.location}</p>
              </div>
            </div>
            
            <div className="commodity-ranking-description">
              <div className="commodity-rank">
                <p className="txt-1">{qualificationText(autoTemporal.qualification)}</p>
                <div>
                  <i>{star}</i>
                  <i>{star}</i>
                  <i>{star}</i>
                  <i>{star}</i>
                  <i>{star}</i>
                </div>
              </div>
              <span>{autoTemporal.qualification}</span>
            </div>
          </div>
        </div>

        <div className="commodity-gallery" style={{display: "flex", justifyContent: "center", alignItems: "center" }}>
          <h1 style={{color: "#FFFFFF"}}>aquí van las imagenes</h1>
        </div>

        <div className="commodity-description">
          <h1>{autoTemporal.slogan}</h1>
          <p>{autoTemporal.description}</p>
        </div>
      </div>

      <div className="commodity-features">
        <h1>¿Qué ofrece este lugar?</h1>
        <hr className="commodity-divisor" />
        <div className="features-box">
          <div>
            <i>{people}</i>
            <strong>{autoTemporal.people}</strong>
          </div>
          <div>
            {withDoors(autoTemporal.doors)}
          </div>
        </div>
      </div>

      <div className="commodity-available-dates">
        <DatePicker
          //para que aparezca sin necesidad del input
          inline 
          //para poder seleccionar un rango de fechas
          selectsRange={true} 
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
              setDateRange(update);
            }}
          //para que cuando sea menor a 480 se vuelva uno
          monthsShown={width <= 480 ? 1 : 2}
          //para que sea en español
          locale="es"
          //para que no se puedan escojer fechas pasadas a la actual
          minDate={subDays(new Date(), 0)}
          //para que el nombre de los meses quede con mayúscula inicial
          formatWeekDay={day => day.charAt(0).toUpperCase() + day.substring(1,2) }
        >
          <div className="divider"></div>
        </DatePicker>
        <div className="inicar-reserva">
            <p className="texto-iniciar-reserva">Agregá tus fechas de viaje para obetener precios exactos</p>
            <button className="boton-iniciar-reserva">Iniciar reseva</button>
        </div>
      </div>

      <div className="commodity-location">
        <h1>¿Dónde vas a estar?</h1>
        <hr className="commodity-divisor" />
        <h4>Aquí la ciudad: {autoTemporal.location}</h4>
        <div className="commodity-location-container">
          <div>
            <LoadScript
              googleMapsApiKey="AIzaSyAli5PVZMSWFoK9984QUolP-CMt0gxH70s"
            >
              <GoogleMap
                mapContainerClassName="google-map"
                center={center}
                zoom={10}
              />
            </LoadScript>
          </div>
        </div>
      </div>

      <div className="commodity-rules">
        <h1>Qué tenés que saber</h1>
        <hr className="commodity-divisor" />
        <div className="commodity-rule-container">
          <div>
            <h3>Normas del vehículo</h3>
            <p>Norma 1</p>
            <p>Norma 2</p>
            <p>Norma 3</p>
          </div>
          <div>
            <h3>Salud y seguridad</h3>
            <p>Salud 1</p>
            <p>Salud 2</p>
            <p>Salud 3</p>
          </div>
          <div>
            <h3>Política de cancelación</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
              Repudiandae suscipit obcaecati illum deserunt quaerat ipsa praesentium 
              consequatur sed id eos tempora vel, aliquid assumenda sequi nulla repellat 
              dolorem eum ab!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
