'use client'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import React, { useEffect } from 'react'
import { FaLock } from 'react-icons/fa6';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { RootState, useAppDispatch } from '@/store';
import { newPass } from '@/store/slices/auth/authService';
import { useSelector } from 'react-redux';
import { userRespFunc, userStatusFunc } from '@/store/slices/user/userSlice';
import Cookies from "js-cookie";

const NewPass = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParam = useSearchParams();
  const token = searchParam.get('token');


  

  const UserSchema = Yup.object().shape({
    password: Yup.string().required('* Contraseña requerida').min(6, 'La contraseña debe tener al menos 6 caractéres'),
  });


  const { userStatus, userResp } = useSelector((state : RootState) => state.userData)

  useEffect(() => {
    userResp === 'newPass' && router.push("/login")
    dispatch(userRespFunc(''))
  }, [userResp])

  return (
    <div className='flex justify-center items-center  h-screen'>
      <div className='flex justify-center flex-col'>
        <Link href="/">
          <Image 
          src='/logo.png' 
          width={600}
          height={500}
          alt="Picture of the author"
          className='m-auto'
          />
        </Link>

        <Formik
          validationSchema={UserSchema}
          initialValues={{
              password: '',
            }}

            onSubmit={ async (values) => {
              const data = {
                password: values.password
              }
              if (token) {
                dispatch(newPass(data, token))
              }
            }}>

            {({ }) => {
              return (
                <Form>
                  <div className='rounded-md mt-7'>
                    <div className='w-12/12 m-auto pb-5'>

                      <div className=' w-11/12 m-auto py-5'>
                      <div className='text-3xl font-bold text-gray-600 my-4 text-center'>Nueva contraseña</div>
                      {/* <div className='text-md font-thin text-gray-600 my-4 text-center w-8/12 m-auto'>Escribe tu nueva contraseña</div> */}

                        <div className='my-5'>
                          <div className='flex items-center ml-3 text-lg mb-2'>
                            <FaLock />
                            <div className='ml-2'>Contraseña</div>
                          </div>
                          <Field
                            type="password"
                            name="password"
                            placeholder="Escribe tu contraseña"
                            className='bg-gray-100 w-full p-2 rounded-full pl-5'
                          />

                          <div className='font-bold text-red-500 text-sm mt-1'>
                            <ErrorMessage name="password"/>
                          </div>
                        </div>

                        {userStatus === 200 &&  (<div className='text-2xl text-greenCustom font-bold my-4 text-center w-8/12 m-auto'>Se ha actualizado tu contraseña correctamente, regresa al login he inicia sesión</div>)}
                        {userStatus === 400 &&  (<div className='text-2xl text-redCustom font-bold my-4 text-center w-8/12 m-auto'>Algo falló, inténtalo de nuevo</div>)}
                        {userStatus === 401 &&  (<div className='text-2xl text-redCustom font-bold my-4 text-center w-8/12 m-auto'>El token ha expirado</div>)}

                        
                        {/* <div className='text-greenCustom underline text-center mt-2 font-bold cursor-pointer' onClick={handleLogin}>
                          Regresar al Login
                        </div> */}
                        

                        <div className='flex justify-center mt-10'>
                          <button type="submit">
                            <div className='bg-blueCustom text-white w-12/12 text-center m-auto font-extrabold p-3 rounded-md flex items-center justify-center hover:scale-105 transition transform duration-200 cursor-pointer'>
                              <div className=""> Crear nueva contraseña </div>
                            </div>
                          </button>
                        </div>

                      
                      </div>  
                    </div>
                  </div>
                </Form>
              );
            }}
        </Formik>

      </div>
    </div>
  )
}

export default NewPass;
