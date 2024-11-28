import './style.css'

import { Actividad } from './interface.ts';

const urlApi = '/api/random';

const botonActividadRandom = document.getElementById('botonActividadRandom');
const resultadoActividad = document.getElementById('resultadoActividad');

if(botonActividadRandom && resultadoActividad){
  botonActividadRandom.addEventListener('click',fetchActividadRandom);
}

function fetchActividadRandom():void{
  fetch(urlApi)
  .then((respuesta)=>{
    if(!respuesta.ok){
      throw new Error('Error al obtener la actividad random');
    }
    console.log("Respuesta api: ",respuesta);
    return respuesta.json();
  })
  .then((datos)=>{
    console.log("Datos de la api: ",datos);
    mostrarActividad(datos);
  })
}

function fetchImagenActividad(query:string):Promise<string>{
  const pixabayApiKey = '47323409-7290bf02366acf54a40b7dcdd';
  const urlPixabay =  'https://pixabay.com/api/?key='+pixabayApiKey+'&image_type=photo&q=';

  return fetch(urlPixabay+query)
  .then((respuesta)=>{
    if(!respuesta.ok){
      throw new Error('error al obtener la imagen de pixabay');
    }
    return respuesta.json();
  })
  .then((datos)=>{
    if(datos.hits && datos.hits.length>0){
      return datos.hits[0].webformatURL;
    }else{
      throw new Error('No se encuentra imagen para la actividad');
    }
  })

}


function mostrarActividad(actividad:Actividad):void{
  const iconoPrecio = actividad.price===0 ? "💲 (Gratis)":"💲💲";
  const iconoAccesibilidad = actividad.accessibility.includes("challenge") ? "♿ Difícil" : "♿ facil";
  //creo contenido para mostrar
  resultadoActividad!.innerHTML = `
      <h3>${actividad.activity}</h3>
      <p>Tipo de actividad: ${actividad.type}</p>
      <p>Participantes: ${actividad.participants}</p>
      <p>Precio: ${iconoPrecio}${actividad.price*10}</p>
      <p>Accesibilidad: ${iconoAccesibilidad}</p>
      <p>Duracion: ${actividad.duration}</p>

  
  `;

  //busco la imagen
  const query = actividad.type;
  fetchImagenActividad(query)
  .then((imageUrl)=>{
    resultadoActividad!.innerHTML += `<img src="${imageUrl}" alt="${actividad.activity}">`;

  })
  .catch((error)=>{
    resultadoActividad!.innerHTML+= `<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmWru8q17zpOzzzT1s475ZS_8fOL1GS0teSw&s'">`;
    console.log(error);
  })

 
}




