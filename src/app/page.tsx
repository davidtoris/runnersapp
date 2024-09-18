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
        ¡Carrera por el Servicio 2024!
      </h2> 
      <h3 className="text-4xl font-extrabold text-center text-greenCustom uppercase mt-3 px-5">
        MODALIDAD HíBRIDA
      </h3> 

      <div className="bg-[url('/fondo-puntos.jpg')] bg-cover bg-center py-10">
        <div className='w-6/12 m-auto text-center flex justify-center'>
          <Image src="/personajes.png" width={350} height={380} alt=''  />
        </div>

        <div className='justify-center flex flex-col md:flex-row'>

        

          {/* Presencial */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='bg-blueCustom text-white text-lg md:text-2xl mx-7 p-5 mt-5 md:mt-0 rounded-md'>
              <h3 className='uppercase font-black text-lg md:text-3xl mb-3 text-center'>presencial</h3>
              <p className='mb-1 md:mb-3 flex items-center justify-center'>
                <FaCalendarAlt className='mr-3'/>Sábado 9 de noviembre 2024</p>
              <div className=''>
                <div className='mb-1 md:mb-3 flex items-center justify-center'>
                  <FaMapMarkerAlt className=''/>
                  <div className='ml-3'>
                    CCM
                  </div>
                </div>
              </div>
              <div className=''>
                <div className='mb-1 md:mb-33 flex items-center justify-center'>
                  <FaClock className='mr-1'/>
                  <div className='ml-3'>
                   8:00 AM
                  </div>
                </div>
                <div className='font-light ml-3 flex justify-center'>(Hora del centro)</div>
              </div>
            </div>

            <div className='bg-greenCustom text-white text-lg md:text-2xl mx-7 p-5 mt-5 md:mt-0 rounded-md'>
              <h3 className='uppercase font-black text-lg md:text-3xl mb-3 text-center'>Virtual</h3>
              <p className='mb-1 md:mb-3 flex items-center justify-center'>
                <FaCalendarAlt className='mr-3'/>Sábado 9 de noviembre 2024</p>
              <div className=''>
                <div className='mb-1 md:mb-3 flex items-center justify-center'>
                  <FaMapMarkerAlt className=''/>
                  <div className='ml-3'>
                    En tu lugar favorito (Parque, bosque, playa, etc.)
                  </div>
                </div>
              </div>
              <div className=''>
                <div className='mb-1 md:mb-3 flex items-center justify-center'>
                  <FaClock className='mr-1'/>
                  <div className='ml-3'>
                   A partir de las 6:00 AM hasta las 2:00 PM
                  </div>
                </div>
                <div className='font-light ml-3 flex justify-center'>(Hora del centro)</div>
              </div>
            </div>
          </div>
        </div>
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

      <div className='bg-blueCustom text-white text-left md:text-center p-7 mt-10'>
        <h3 className=' font-extrabold text-3xl mb-3 text-center'>Notas importantes:</h3>
        <ul className='list-disc md:list-none text-lg'>
          <li>La edad mínima para participar es de 18 años cumplidos al 30 de noviembre del 2024.</li>
          <li>La categoría será determinada por la edad que tendrá el competidor al 30 de noviembre del 2024.</li>
          <li>Participan colaboradores y pueden invitar a correr a sus familiares mayores de edad</li>
          <li>Registro para la carrera en ambas modalidades virtual y presencial</li>
        </ul>
        Habrá un link para realizar el registro. ¡Esperalo!

      </div>

      <div className="bg-[url('/nubes.jpg')] py-10 bg-cover p-4">
        <div className='grid grid-cols-1 md:grid-cols-2 gap-20 mx-4 md:mx-20'>
          <div>
            <div className='uppercase text-grayCustom text-center text-3xl font-bold'>modalidad Virtual:</div>
            <div className='flex justify-center'>
              <ul className='list-disc mt-5'>
                <li>Los participantes virtuales correrán con la app de su preferencia podrás bajar en los próximos días en tu teléfono celular.</li>
                <li>Al terminar la carrera: cada participante sube sus resultados y adjunta una captura de pantalla de la app como evidencia, en este sitio</li>
                <li>Se premiará a los 3 Primeros Lugares de CADA CATEGORÍA, femenil y varonil, en la distancia de 3 y 5 km.</li>
                <li>Los mejores TIEMPOS de cada categoría se darán a conocer el lunes 11 de noviembre por correo electrónico y en el sitio de sharepoint del Área México.</li>
              </ul>
            </div>
          </div>
          <div>
            <div className='uppercase text-grayCustom text-center text-3xl font-bold'>modalidad Presencial:</div>
            <div className='flex justify-center'>
              <ul className='list-disc mt-5'>
                <li>La entrada al CCM será a partir de las 7:00 am únicamente hasta las 8:00 am del sábado 09 de noviembre 2024</li>
                <li>La carrera iniciará a las 8:00 am en punto</li>
                <li>Se premiará a los 3 Primeros Lugares de CADA CATEGORÍA, femenil y varonil, en la distancia de 3 y 5 km.</li>
                <li>Los acompañantes animarán a los corredores y habrá actividades recreativas.</li>
                <li>Los corredores al terminar la carrera participarán en una actividad de servicio junto con su familia.</li>
                <li>Para ingresar a las instalaciones del CCM regístrate en el link que se les proporcionará más adelante.</li>
                <li>Se enviará el reglamento del CCM posteriormente a tu registro</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className='bg-greenCustom text-white p-4 md:p-10 '>

        <div className='flex flex-col md:flex-row mx-0 md:mx-20'>
          <div className='w-12/12 md:w-4/12'>
            <Image src="/misionaries.png" width={500} height={30} alt=''/>
          </div>
          <div className='w-12/12 md:w-8/12 ml-0 md:ml-10 mt-3 md:mt-0'>
            <div className='font-extrabold text-2xl'>Actividad de Servicio “Ayudar a otros” (presencial CCM)</div>
              <div>
                Propósito: Ayudar a los misioneros a tener experiencias reales de enseñanza.
              </div>
              <div>
                Inicio: Inmediatamente después de la carrera, pero debes llegar antes de las 8:00 am.
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
      </div>

      <div className='flex justify-center flex-col md:flex-row pb-3 md:pb-14 mt-0 md:mt-3 p-4'>
        {/* <Link href="/register">
          <div className='bg-redCustom text-white w-12/12 text-center m-auto font-extrabold p-3 rounded-md mt-8 flex items-center justify-center hover:scale-105 transition transform duration-200 cursor-pointer'>
            <Image src="/tennis.png" width={30} height={30} alt=''/>
            <div className="ml-3"> Regístrate AQUÍ para la carrera</div>
          </div>
        </Link> */}
        <Link href="/login">
          <div className='bg-blueCustom text-white w-12/12 ml-0 md:ml-4 text-center m-auto font-extrabold p-3 rounded-md mt-8 flex items-center justify-center hover:scale-105 transition transform duration-200 cursor-pointer'>
            <Image src="/tennis.png" width={30} height={30} alt=''/>
            <div className="ml-3"> Inicia Sesión</div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Home;
