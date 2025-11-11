'use client'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import React, { useEffect } from 'react'
import { FaCircleUser, FaLock } from 'react-icons/fa6';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RootState, useAppDispatch } from '@/store';
import { login } from '@/store/slices/auth/authService';
import { useSelector } from 'react-redux';
import Loader from "../../components/Loader";
import { userRespFunc, userStatusFunc } from '@/store/slices/user/userSlice';
import { pathFunc } from '@/store/slices/path/pathSlice';

const Login = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();

  const UserSchema = Yup.object().shape({
    correo: Yup.string().email('* Debe ser un email válido').required('* Email requerido'),
    password: Yup.string().required('* Contraseña requerida')
  });

  const { userStatus, userLoading, userResp } = useSelector((state : RootState) => state.userData)

  useEffect(() => {
    userResp === 'login' && router.push("/home")
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
          />
        </Link>

        <Formik
          validationSchema={UserSchema}
          initialValues={{
              correo: '',
              password: '',
            }}

            onSubmit={ async (values) => {
              dispatch(login(values))
            }}>

            {({ values }) => {
              return (
                <Form>
                  <div className='rounded-md mt-7'>
                    <div className='w-12/12 m-auto pb-5'>

                      <div className=' w-11/12 m-auto py-5'>

                        <div className='mb-5'>
                          <div className='flex items-center ml-3 text-lg mb-2'>
                            <FaCircleUser />
                            <div className='ml-2'>Correo</div>
                          </div>
                          <Field
                            type="email"
                            name="correo"
                            placeholder="Escribe tu nombre"
                            className='bg-gray-100 w-full p-2 rounded-full pl-5'
                          />
                          <div className='font-bold text-red-500 text-sm mt-1'>
                            <ErrorMessage name="correo"/>
                          </div>
                        </div>

                        <div className='my-5'>
                          <div className='flex items-center ml-3 text-lg mb-2'>
                            <FaLock />
                            <div className='ml-2'>Contraseña</div>
                          </div>
                          <Field
                            type="password"
                            name="password"
                            placeholder="Escribe tu correo"
                            className='bg-gray-100 w-full p-2 rounded-full pl-5'
                          />
                          
                          <div className='font-bold text-red-500 text-sm mt-1'>
                            <ErrorMessage name="password"/>
                          </div>
                        </div>

                        {userStatus === 400 &&  (<div className='text-2xl text-redCustom font-bold my-4 text-center w-8/12 m-auto'>El usuario y/o contraseña son incorrectos</div>)}
                        {userStatus === 500 || userStatus === 504 &&  (<div className='text-2xl text-redCustom font-bold my-4 text-center w-8/12 m-auto'>Algo salió mal, vuelve a intentarlo</div>)}

                        <Link href="/forgot">
                          <div className='text-greenCustom underline text-center mt-2'>
                            Recuperar contraseña
                          </div>
                        </Link>
                        
                      
                        <div className='flex justify-center mt-10'>
                          <button type="submit">
                            <div className='bg-redCustom text-white w-12/12 text-center m-auto font-extrabold p-3 rounded-md flex items-center justify-center hover:scale-105 transition transform duration-200 cursor-pointer'>
                              {userLoading ? ( <Loader />) : 'Iniciar Sesión'}
                            </div>
                          </button>
                        </div>

                        {/* <div className='text-center text-lg text-blueCustom underline mt-2'>
                          ¿No tienes cuenta? <Link href="/register"> <span className='  font-bold'>Regístrate</span></Link>
                        </div> */}
                      
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
