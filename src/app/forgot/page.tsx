'use client'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import React, { useEffect } from 'react'
import { FaCircleUser, FaLock } from 'react-icons/fa6';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RootState, useAppDispatch } from '@/store';
import { forgot, login } from '@/store/slices/auth/authService';
import { useSelector } from 'react-redux';

const Login = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();

  const UserSchema = Yup.object().shape({
    correo: Yup.string().email('* Debe ser un email válido').required('* Email requerido'),
  });

  const { userRespStatus } = useSelector((state : RootState) => state.userData)

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
              correo: '',
            }}

            onSubmit={ async (values) => {
              // const data = {
              //   correo: values.correo
              // }
              dispatch(forgot(values))
            }}>

            {({ }) => {
              return (
                <Form>
                  <div className='rounded-md mt-7'>
                    <div className='w-12/12 m-auto pb-5'>

                      <div className=' w-11/12 m-auto py-5'>
                      <div className='text-3xl font-bold text-gray-600 my-4 text-center'>Recuperación de la cuenta</div>
                      <div className='text-md font-thin text-gray-600 my-4 text-center w-8/12 m-auto'>Escribe tu correo registrado y te enviaremos un correo para recuperar tu contraseña</div>
                        <div className='mb-5'>
                          <div className='flex items-center ml-3 text-lg mb-2'>
                            <FaCircleUser />
                            <div className='ml-2'>Correo</div>
                          </div>
                          <Field
                            type="email"
                            name="correo"
                            placeholder="Escribe tu correo registrado"
                            className='bg-gray-100 w-full p-2 rounded-full pl-5'
                          />
                          <div className='font-bold text-red-500 text-sm mt-1'>
                            <ErrorMessage name="correo"/>
                          </div>
                        </div>

                        {userRespStatus === 200 &&  (<div className='text-2xl text-greenCustom font-bold my-4 text-center w-8/12 m-auto'>Te hemos enviado un correo para crear una nueva contraseña</div>)}
                        {userRespStatus === 400 &&  (<div className='text-2xl text-redCustom font-bold my-4 text-center w-8/12 m-auto'>El correo no se encuentra registrado</div>)}
                        {userRespStatus === 401 &&  (<div className='text-2xl text-redCustom font-bold my-4 text-center w-8/12 m-auto'>El token ha expirado, envía de nuevo el correo</div>)}

                      
                        <div className='flex justify-center mt-10'>
                          <button type="submit">
                            <div className='bg-blueCustom text-white w-12/12 text-center m-auto font-extrabold p-3 rounded-md flex items-center justify-center hover:scale-105 transition transform duration-200 cursor-pointer'>
                              <div className=""> Recuperar Contraseña </div>
                            </div>
                          </button>
                        </div>

                        <Link href="/login">
                          <div className='text-greenCustom underline text-center mt-2'>
                            Regresar al Login
                          </div>
                        </Link>
                      
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

export default Login;
