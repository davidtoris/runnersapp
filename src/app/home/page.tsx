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
import Cookies from "js-cookie"
import { GiRunningShoe } from "react-icons/gi";

import { BsPersonCircle, BsSpeedometer2, BsFillPersonLinesFill, BsFillBookmarkStarFill } from "react-icons/bs";
import { useRouter } from 'next/navigation';
import { userLoading } from '@/store/slices/user/userSlice';
import Link from 'next/link';
import { showOneUser } from '@/store/slices/user/userService';

const Home = () => {
  const dispatch = useAppDispatch();
  const token = Cookies.get('tokenUser')
  const userData = Cookies.get('user')
  const router = useRouter();

  const { userItem } = useSelector((state : RootState) => state.userData)

  useEffect(() => {
    if (userData && token) {
      const user = JSON.parse(userData);
      const idUser = user._id;
      dispatch(showOneUser(idUser, token))
    }
  }, [])
  
  useEffect(() => {
    if (token) {
      dispatch(getDate(token))
      dispatch(validateToken(token))
    }
  }, [])
  
  const { date } = useSelector((state : RootState) => state.dateData)

  const number = () => {
    let numRunner;
    const num = userItem?.numRunner;
    if (num?.length === 1) {
      numRunner = '00' + num;
    }
    if (num?.length === 2) {
      numRunner = '0' + num;
    } 
    if (num !== undefined && num.length >= 3) {
      numRunner = num;
    }
    return numRunner;
  };

  const editRegister = () => {
    router.push("/editRegister")
  }
  
  const logOut = () => {
    router.push("/login")
    dispatch(userLoading(false));
    Cookies.remove('tokenUser');
    Cookies.remove('user');
  }

  return (
    <div className='flex justify-center items-center h-screen text-center'>
      <div className='flex justify-center flex-col pb-5 m-auto'>
        <Image 
        src='/logo.png' 
        width={450}
        height={230}
        alt="Picture of the author"
        className='m-auto'
        />

        <div className='flex flex-col justify-center mt-20'>
          <BsPersonCircle className='text-[184px] text-gray-400 text-center m-auto' />
          <div className='text-4xl font-bold text-gray-600 mt-3'>{userItem && `${userItem?.nombre} ${userItem?.apellido}`}</div>
        </div>

        <div className='text-2xl font-thin text-gray-600 mt-4'>{`Número de corredor:`}</div>
        <div className='text-8xl font-extrabold text-redCustom from-neutral-100 text-[184px]'>{number()}</div>

        {/* <div className='text-5xl text-gray-800 mt-10 mb-2 font-semibold'>Datos de la carrera:</div> */}
        <div className='flex text-gray-600 items-center justify-center mt-3 flex-col md:flex-row'>
          <div className='text-4xl bg-blueLightCustom rounded-full w-16 h-16 flex justify-center items-center'>
            <BsSpeedometer2 className="text-blueCustom" />
          </div>
          <div className='ml-0 md:ml-3 text-center md:text-left'>
            <div className='text-xl font-semibold'>
              Kms a correr
            </div>
            <div className='left'>
              {`${userItem?.kms} kms`}
            </div>
          </div>
          <div className='text-4xl bg-blueLightCustom rounded-full w-16 h-16 flex justify-center items-center ml-0 md:ml-8 mt-4 md:mt-0'>
            <BsFillPersonLinesFill className="text-blueCustom" />
          </div>
          <div className='ml-0 md:ml-3 text-center md:text-left'>
            <div className='text-xl font-semibold'>
              Rango de edad
            </div>
            <div className='left'>
              { userItem?.edad === "1" && '18-39 años'}
              { userItem?.edad === "2" && '40-49 años'}
              { userItem?.edad === "3" && '50 0 más años'}
            </div>
          </div>
          <div className='text-4xl bg-blueLightCustom rounded-full w-16 h-16 flex justify-center items-center ml-0 md:ml-8 mt-4 md:mt-0'>
            <BsFillBookmarkStarFill className="text-blueCustom" />
          </div>
          <div className='ml-0 md:ml-3 text-center md:text-left'>
            <div className='text-xl font-semibold'>
              Categoría
            </div>
            <div className='left'>
              { userItem?.genero === "H" && 'Varonil'}
              { userItem?.genero === "M" && 'Femenil'}
            </div>
          </div>
        </div>

        <div className='flex items-center text-3xl mt-10 justify-center font-thin cursor-pointer' onClick={editRegister}>
          <div className='ml-2'>{`Tiempo asignado: ${userItem?.time}`}</div>
        </div>

        <div className='text-3xl text-blueCustom mt-16  mb-2 font-extralight'>La carrera empieza en:</div>
        <div className='flex justify-center'>
          <CountDown
            closeDate={'2023-11-25 06:00:00'} 
            todayDate={date} 
            size 
          />
        </div>

        
          <div className='flex items-center text-2xl mt-10 justify-center font-thin cursor-pointer' onClick={editRegister}>
            <FaRegChartBar />
            <div className='ml-2'>Editar registro</div>
          </div>

          
          
          <Link href="/evidence">
            <button className='flex items-center text-2xl mt-10 justify-center font-thin bg-yellowCustom text-white w-12/12 md:w-6/12 m-auto p-2 rounded-lg' >
              <GiRunningShoe />
              <span className='ml-2'>Subir evidencia</span>
            </button>
          </Link>

          {/* <div className=''>Una vez iniciada la carrera se habilitará este botón</div> */}

          <div className='bg-blueCustom text-white text-center w-4/12 m-auto mt-6 font-extrabold p-3 rounded-md flex items-center justify-center hover:scale-105 transition transform duration-200 cursor-pointer'
            onClick={logOut}>
            <div className='ml-2'>Salir</div>
          </div>
        
          {/* 
          <div className='flex items-center text-2xl mt-10 justify-center font-medium '>
            <div className='border-2 border-gray-600 text-gray-600 rounded-full p-2 px-5 cursor-pointer hover:bg-redCustom hover:border-redCustom hover:text-white'>Imprime tu registro</div>
            <div className='bg-gray-500 text-white rounded-full p-2 px-5 ml-5 cursor-pointer shadow-xl hover:bg-blueCustom'>Ver todos los reultados</div>
          </div> */}
      </div>
    </div>
  )
}

export default Home