import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <div className="relative">
        <div className='w-4/12 md:w-6/12 m-auto text-center flex ml-5 justify-center absolute right-0 top-36'>
          <Image src="/logo.png" width={550} height={230} alt='' />
        </div>
        <Image
          src="/mapa-corredores.jpg"
          width={2776}
          height={1536}
          alt="Mapa de corredores"
          priority
          className="w-full h-auto"
        />
        {/* <div className='w-full m-auto text-center flex justify-center'>
          <video
            width="100%"
            controls
            autoPlay
            loop
            muted 
            playsInline  
            preload="metadata"
            aria-label="Video de la carrera"
          >
            <source src="/videos/carrera.mp4" type="video/mp4" />
            Tu navegador no soporta el elemento <code>video</code>.
          </video>
        </div> */}
      </div>

      <div className='text-center my-8 px-4 max-w-4xl mx-auto'>
        <h2 className="text-2xl md:text-3xl font-extrabold text-grayCustom mb-2">
          La experiencia que nos une en el servicio, ahora más cerca de todos
        </h2>
        <h3 className="text-xl md:text-2xl font-bold text-greenCustom">
          Sirviendo, avanzando y creciendo juntos, sin importar la distancia.
        </h3>
      </div>

      {/* Presencial (oculto) */}
      {/* <div className='bg-blueCustom text-white text-lg md:text-2xl mx-7 p-5 mt-5 md:mt-0 rounded-md'>
        <h3 className='uppercase font-black text-lg md:text-3xl mb-3 text-center'>presencial</h3>
        <p className='mb-1 md:mb-3 flex items-center justify-center'>
          <FaCalendarAlt className='mr-3'/>Sábado 15 de noviembre 2025</p>
        <div className=''>
          <div className='mb-1 md:mb-3 flex items-center justify-center'>
            <FaMapMarkerAlt className=''/>
            <div className='ml-3'>CCM</div>
          </div>
        </div>
        <div className=''>
          <div className='mb-1 md:mb-33 flex items-center justify-center'>
            <FaClock className='mr-1'/>
            <div className='ml-3'>8:00 AM</div>
          </div>
          <div className='font-light ml-3 flex justify-center'>(Hora del centro)</div>
          <div className='mt-2 text-center'>
            La playera se entregará el día del evento (15 de noviembre)
          </div>
        </div>
      </div> */}

      <div className='bg-greenCustom text-white text-lg md:text-2xl p-6 md:p-10 w-full'>
        <h3 className='uppercase font-black text-2xl md:text-4xl mb-4 text-center'>Virtual</h3>
        <p className='mb-2 md:mb-3 flex items-center justify-center'>
          <FaCalendarAlt className='mr-3' />Sábado 31 de Octubre 2026
        </p>
        <div className='mb-2 md:mb-3 flex items-center justify-center text-center'>
          <FaMapMarkerAlt className='mr-3 flex-shrink-0' />
          <div>
            En tu lugar favorito (Parque, bosque, playa, etc.)
          </div>
        </div>
        <div className='mb-2 md:mb-3 flex items-center justify-center text-center'>
          <FaClock className='mr-3 flex-shrink-0' />
          <div>
            A partir de las 6:00 AM hasta las 2:00 PM
          </div>
        </div>
        <div className='font-light flex justify-center text-base md:text-xl'>(Hora del centro)</div>
        <div className='mt-4 text-center font-medium'>
          Cada colaborador podrá agregar 5 invitados.
        </div>
      </div>

      {/* <div className='flex justify-center flex-col md:flex-row pb-3 md:pb-14 mt-0 md:mt-3 p-4'>
        <Link href="/register">
          <div className='bg-redCustom text-white w-12/12 text-center m-auto font-extrabold p-3 rounded-md mt-8 flex items-center justify-center hover:scale-105 transition transform duration-200 cursor-pointer'>
            <Image src="/tennis.png" width={30} height={30} alt=''/>
            <div className="ml-3"> Regístrate AQUÍ para la carrera</div>
          </div>
        </Link>
      </div> */}


      <div className='flex justify-center mt-10'>
        <Image src="/logo-fundamentos.jpg" width={200} height={190} className="mt-8" alt='' />
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
          <Image src="/celular.jpg" width={200} height={161} alt='' />
        </div>
      </div>

      <div className='bg-blueCustom text-white text-left md:text-center p-7 mt-10'>
        <h3 className=' font-extrabold text-3xl mb-3 text-center'>Notas importantes:</h3>
        <ul className='list-disc md:list-none text-lg'>
          <li>La edad mínima para participar es de 18 años cumplidos al 31 de octubre de 2026.</li>
          <li>La categoría será determinada por la edad que tendrá el competidor al 31 de octubre de 2026.</li>
          <li>Participan colaboradores y pueden invitar a correr hasta a 5 <span className='font-bold'>familiares</span> mayores de edad.</li>
          <li>Registro para la carrera en modalidad virtual.</li>
        </ul>

      </div>

      <div className="bg-[url('/nubes.jpg')] py-10 bg-cover p-4">
        {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-20 mx-4 md:mx-20'> */}
        <div className='max-w-2xl mx-auto'>
          <div>
            <div className='uppercase text-grayCustom text-center text-3xl font-bold'>modalidad Virtual:</div>
            <div className='flex justify-center'>
              <ul className='list-disc mt-5'>
                <li>Los participantes virtuales correrán con la app de su preferencia</li>
                <li>Al terminar la carrera: cada participante sube sus resultados y adjunta una captura de pantalla de la app como evidencia, en este sitio</li>
                <li>Se premiará a los 3 Primeros Lugares de CADA CATEGORÍA, femenil y varonil, en la distancia de 3 y 5 km.</li>
                <li>Los mejores TIEMPOS de cada categoría se darán a conocer el martes 18 de noviembre por correo electrónico y en el sitio de sharepoint del Área México</li>
              </ul>
            </div>
          </div>
          {/* Modalidad Presencial (oculto) */}
          {/* <div>
            <div className='uppercase text-grayCustom text-center text-3xl font-bold'>modalidad Presencial:</div>
            <div className='flex justify-center'>
              <ul className='list-disc mt-5'>
                <li>La entrada al CCM será de 7:00 am a 8:00 am del sábado 15 de noviembre 2025</li>
                <li>La carrera iniciará a las 8:00 am en punto</li>
                <li>Se premiará a los 3 Primeros Lugares de CADA CATEGORÍA, femenil y varonil, en la distancia de 3 y 5 km.</li>
                <li>Los acompañantes animarán a los corredores y habrá actividades recreativas.</li>
                <li>Los corredores al terminar la carrera participarán en una actividad de servicio junto con su familia</li>
                <li>Para ingresar a las instalaciones del CCM regístrate en el link que se les proporcionará más adelante</li>
                <li>Se enviará el reglamento del CCM posteriormente a tu registro</li>
              </ul>
            </div>
          </div> */}
        </div>
      </div>

      {/* Actividad de Servicio (presencial CCM) - oculto */}
      {/* <div className='bg-greenCustom text-white p-4 md:p-10 '>

        <div className='flex flex-col md:flex-row mx-0 md:mx-20'>
          <div className='w-12/12 md:w-4/12'>
            <Image src="/misionaries.png" width={500} height={30} alt=''/>
          </div>
          <div className='w-12/12 md:w-8/12 ml-0 md:ml-10 mt-3 md:mt-0'>
            <div className='font-extrabold text-2xl'>Actividad de Servicio “Ayudar a otros” (presencial CCM)</div>
              <div>
                Propósito: Ayudar a los misioneros a tener experiencias reales de enseñanza
              </div>
              <div>
                Inicio: Inmediatamente después de la carrera
              </div>
              <div>
                Lugar: Se te darán indicaciones terminando la carrera.
              </div>
              <div>
                Próximamente enviaremos el link para el registro
              </div>

              <div className='mt-2 ml-4'>
                <div>
                  <div className='text-lg font-bold -ml-4'>Participantes:</div>
                  <ul className='list-disc'>
                    <li>Todos participan tanto colaboradores y familiares.</li>
                    <li>Los corredores también participan.</li>
                    <li>La participación será por familia.</li>
                  </ul>
                </div>
              </div>
          </div>
        </div>
      </div> */}

      <div className='flex justify-center flex-col md:flex-row pb-3 md:pb-14 mt-0 md:mt-3 p-4'>
        {/* <Link href="/register">
          <div className='bg-redCustom text-white w-12/12 text-center m-auto font-extrabold p-3 rounded-md mt-8 flex items-center justify-center hover:scale-105 transition transform duration-200 cursor-pointer'>
            <Image src="/tennis.png" width={30} height={30} alt=''/>
            <div className="ml-3"> Regístrate AQUÍ para la carrera</div>
          </div>
        </Link> */}
        <Link href="/login">
          <div className='bg-blueCustom text-white w-12/12 ml-0 md:ml-4 text-center m-auto font-extrabold p-3 rounded-md mt-8 flex items-center justify-center hover:scale-105 transition transform duration-200 cursor-pointer'>
            <Image src="/tennis.png" width={30} height={30} alt='' />
            <div className="ml-3"> Inicia Sesión</div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Home;
