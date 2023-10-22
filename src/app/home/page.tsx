'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import CountDown from '../../components/CountDown';
import { FaRegChartBar } from 'react-icons/fa6';
import { User } from '@/store/slices/user/userInterface';
import { RootState, useAppDispatch } from '@/store';
import { getDate } from '@/store/slices/date/dateService';
import { useSelector } from 'react-redux';
import { validateToken } from '@/store/slices/auth/authService';
import Link from 'next/link';

import { BsPersonCircle, BsSpeedometer2, BsFillPersonLinesFill, BsFillBookmarkStarFill } from "react-icons/bs";

const Home = () => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData !== null) {
      setUser( JSON.parse(userData) );
    }
  }, [])

  useEffect(() => {
    dispatch(getDate())
  }, [])

  useEffect(() => {
    dispatch(validateToken())
  }, [])
  
  const { date } = useSelector((state : RootState) => state.dateData)

  const number = () => {
    let numRunner;
    const num = user?.numRunner;
    if (num?.length === 1) {
      numRunner = '00' + num;
    }
    if (num?.length === 2) {
      numRunner = '0' + num;
    }
    return numRunner;
  };

  return (
    <div className='flex justify-center items-center h-screen text-center'>
      <div className='flex justify-center flex-col pb-5 m-auto'>
        <Image 
        src='/logo.png' 
        width={600}
        height={500}
        alt="Picture of the author"
        className='m-auto'
        />

        <div className='flex flex-col justify-center mt-20'>
          <BsPersonCircle className='text-[184px] text-gray-400 text-center m-auto' />
          <div className='text-4xl font-bold text-gray-600 mt-3'>{`${user?.nombre} ${user?.apellido}`}</div>

        </div>

        <div className='text-2xl font-thin text-gray-600 mt-4'>{`Número de corredor:`}</div>
        <div className='text-8xl font-extrabold text-redCustom from-neutral-100 text-[184px]'>{number()}</div>

        {/* <div className='text-5xl text-gray-800 mt-10 mb-2 font-semibold'>Datos de la carrera:</div> */}
        <div className='flex text-gray-600 items-center justify-center mt-3'>
          <div className='text-4xl bg-blueLightCustom rounded-full w-16 h-16 flex justify-center items-center'>
            <BsSpeedometer2 className="text-blueCustom" />
          </div>
          <div className='ml-3 text-left'>
            <div className='text-xl font-semibold'>
              Kms a correr
            </div>
            <div className='left'>
              {`${user?.kms} kms`}
            </div>
          </div>
          <div className='text-4xl bg-blueLightCustom rounded-full w-16 h-16 flex justify-center items-center ml-8'>
            <BsFillPersonLinesFill className="text-blueCustom" />
          </div>
          <div className='ml-3 text-left'>
            <div className='text-xl font-semibold'>
              Rango de edad
            </div>
            <div className='left'>
              { user?.edad === "1" && '18-39 años'}
              { user?.edad === "2" && '40-49 años'}
              { user?.edad === "3" && '50 0 más años'}
            </div>
          </div>
          <div className='text-4xl bg-blueLightCustom rounded-full w-16 h-16 flex justify-center items-center ml-8'>
            <BsFillBookmarkStarFill className="text-blueCustom" />
          </div>
          <div className='ml-3 text-left'>
            <div className='text-xl font-semibold'>
              Categoría
            </div>
            <div className='left'>
              { user?.sexo === "H" && 'Varonil'}
              { user?.sexo === "F" && 'Femenil'}
            </div>
          </div>
        </div>

        

        <div className='text-3xl text-blueCustom mt-16  mb-2 font-extralight'>La carrera empieza en:</div>
        <div className='flex justify-center'>
          <CountDown
            closeDate={'2023-11-26 08:00:00'} 
            todayDate={date} 
            size 
          />
        </div>

        <Link href="/editRegister">
          <div className='flex items-center text-2xl mt-10 justify-center font-thin cursor-pointer'>
            <FaRegChartBar />
            <div className='ml-2'>Editar registro</div>
          </div>
        </Link>

        <div className='flex items-center text-2xl mt-10 justify-center font-medium '>
          <div className='border-2 border-gray-600 text-gray-600 rounded-full p-2 px-5 cursor-pointer hover:bg-redCustom hover:border-redCustom hover:text-white'>Imprime tu registro</div>
          <div className='bg-gray-500 text-white rounded-full p-2 px-5 ml-5 cursor-pointer shadow-xl hover:bg-blueCustom'>Ver todos los reultados</div>
        </div>
      </div>
    </div>
  )
}

export default Home