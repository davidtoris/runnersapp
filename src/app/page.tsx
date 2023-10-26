import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <div className='w-10/12 md:w-6/12 m-auto text-center mt-5 mt:mt-0 flex justify-center'>
        <Image src="/logo.png" width={700} height={230} alt='' />
      </div>
      <h2 className="text-3xl font-bold text-center text-grayLight mt-5 mt:mt-0 px-3">
        ¡Bienvenidos a la 2da. Carrera por el Servicio 2023!
      </h2> 
      <h3 className="text-4xl font-extrabold text-center text-greenCustom uppercase mt-3 px-5">
      MODALIDAD VIRTUAL
      </h3>  
      <h2 className="text-xl font-bold text-center text-gray-700 mt-5 mt:mt-0 px-3">
        Este año la carrera es virtual. Corre en tu lugar favorito: parque, bosque, playa, montaña, etc.
      </h2> 

      <div className="bg-[url('/fondo-puntos.jpg')] bg-cover bg-center py-10">
        <div className='w-6/12 m-auto text-center flex justify-center'>
          <Image src="/personajes.png" width={350} height={380} alt=''  />
        </div>

        <div className='justify-center flex flex-col md:flex-row'>

        

          {/* Presencial */}
          <div className='bg-blueCustom text-white text-2xl mx-7 p-5 mt-5 md:mt-0 rounded-md w-12/12 md:w-4/12'>
            {/* <h3 className='uppercase font-bold text-2xl mb-3 text-center'>presencial</h3> */}
            <p className='mb-3 flex items-center justify-center'>
              <FaCalendarAlt className='mr-3'/>Sábado 25 de noviembre 2023</p>
            
            <div className=''>
              <div className='mb-3 flex items-center justify-center'>
                <FaMapMarkerAlt className=''/>
                <div className='ml-3'>
                  Tu lugar favorito
                </div>
              </div>
            </div>
            
            <div className=''>
              <div className='mb-3 flex items-center justify-center'>
                <FaClock className='mr-1'/>
                <div className='ml-3'>
                  Desde las 6:00 am hasta las 7:00 pm
                </div>
              </div>
              <div className='font-light ml-3 flex justify-center'>(Hora del centro)</div>
            </div>
          </div>
        </div>
          <h2 className="text-xl font-bold text-center text-gray-700 mt-5 mt:mt-0 px-3">
            Envía tu evidencia a más tardar a las 11:59 pm del 25 de noviembre 2023
          </h2> 
      </div>


      <div className='flex justify-center mt-10'>
        <Image src="/logo-fundamentos.jpg" width={200} height={190} className="mt-8" alt=''/>
      </div>
      <h2 className='uppercase font-bold text-blueCustom m-auto text-center text-4xl mt-10 mb-5'>Categorias</h2>

      <div className='flex justify-center items-center mx-2'>
        <div className='text-grayCustom text-center'>
          <div className='font-bold text-2xl mt-3'>Carrera 3 km</div>
          <div className='font-bold text-2xl'>(Femenil y varonil)</div>

          <div className='mt-3'>3 Km Libre (18 - 39)</div>
          <div className=''>3 Km Máster (40 – 49)</div>
          <div className=''>3 Km Veteranos (50 y más)</div>
          
          <div className='font-bold text-2xl mt-7'>Carrera 5 km</div>
          <div className='font-bold text-2xl'>(Femenil y varonil)</div>

          <div className='mt-3'>5 Km Libre (18 - 39)</div>
          <div className=''>5 Km Máster (40 – 49)</div>
          <div className=''>5 Km Veteranos (50 y más)</div>
        </div>
        <div className='w6/12 ml-7'>
          <Image src="/celular.jpg" width={200} height={161} alt=''/>
        </div>
      </div>

      <div className='bg-yellowCustom text-white text-left md:text-center p-7 mt-10'>
        <h3 className=' font-extrabold text-3xl mb-3 text-center'>CONVOCATORIA</h3>
        <ul className='list-disc md:list-none'>
        <li>La <span className='font-bold'>edad</span> mínima para correr: 18 años cumplidos al 30 de noviembre del 2023</li>
        <li>Cada participante correrá con: la <span className='font-bold'>app</span> de su preferencia</li>
        <li>Al terminar la carrera: cada participante sube sus <span className='font-bold'>resultados y adjunta</span> una captura de pantalla de la app como <span className='font-bold'>evidencia,</span> en el sitio que en breve haremos llegar  </li>
        <li>La <span className='font-bold'>categoría:</span> será determinada por el género y la edad que tendrá el competidor al 30 de noviembre del 2023</li>
        <li>Participan: colaboradores <span className='font-bold'>inscritos</span> y pueden inscribir a la carrera a dos de sus familiares</li>

        </ul>

      </div>

      <div className="bg-[url('/nubes.jpg')] py-10 bg-cover">
        <div className='uppercase text-grayCustom text-center text-3xl font-bold'>premiación</div>
      </div>
      
      <div className='flex flex-col md:flex-row w-12/12 md:w-6/12 justify-center text-grayCustom m-auto mt-10 items-center'>
        <div className='w-3/12 ml-7 -mt-16'>
          <Image src="/premio.jpg" width={280} height={330} alt=''/>
        </div>
        <div className='ml-5 w-11/12'>
          <div className='mt-5 md:mt-0'>Se premiará a los 3 Primeros Lugares de cada categoría, en la distancia de 3 y 5 km.</div>
          <div className='mt-5 md:mt-0'>Los mejores tiempos de cada categoría se darán a conocer el lunes 27 de noviembre por correo electrónico y en este sitio</div>
          <div className='ml-10 my-5'>
            {/* <ul className='list-disc'>
              <li>1er lugar (mejor tiempo APP):</li>
              <li>2o lugar (mejor tiempo APP):</li>
              <li>3er lugar (mejor tiempo APP):</li>
            </ul> */}
          </div>


        </div>
      </div>
            <div className='flex justify-center pb-14 mt-3'>
              <Link href="/register">
                <div className='bg-redCustom text-white w-12/12 text-center m-auto font-extrabold p-3 rounded-md mt-8 flex items-center justify-center hover:scale-105 transition transform duration-200 cursor-pointer'>
                  <Image src="/tennis.png" width={30} height={30} alt=''/>
                  <div className="ml-3"> Regístrate AQUÍ para la carrera</div>
                </div>
              </Link>
              <Link href="/login">
                <div className='bg-blueCustom ml-3 text-white w-12/12 text-center m-auto font-extrabold p-3 rounded-md mt-8 flex items-center justify-center hover:scale-105 transition transform duration-200 cursor-pointer'>
                  <Image src="/tennis.png" width={30} height={30} alt=''/>
                  <div className="ml-3"> Inicia Sesión</div>
                </div>
              </Link>
            </div>

      
    </>
  )
}

export default Home;
