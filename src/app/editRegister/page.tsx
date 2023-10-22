'use client'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react'
import { FaCircleUser, FaLock } from 'react-icons/fa6';
import { useAppDispatch } from '@/store';
import { uploadImage } from '@/store/slices/user/userService';

import useFileUpload from 'react-use-file-upload';

const Login = () => {

  const dispatch = useAppDispatch()

  const UserSchema = Yup.object().shape({
    kms: Yup.string().required('* Campo requerido'),
    sexo: Yup.string().required('* Campo requerido')
  });

  const [files, setFiles] = useState<FileList | null >(null)
  const handleFiles = ({target}: ChangeEvent<HTMLInputElement>) => {
    setFiles(target.files[0])
  }

  const algo = () => {
    const formData = new FormData();
    formData.append('image', files)
    dispatch(uploadImage(formData))
  }

  return (
    <div className='flex justify-center items-center h-screen w-full'>
      <div className='flex justify-center flex-col'>
        <Image 
        src='/logo.png' 
        width={600}
        height={500}
        alt="Picture of the author"
        />

        <div className='text-center'>
          <div className='text-5xl font-bold text-gray-600 mt-10'>Bienvenido David</div>
        </div>

        <input 
          type='file' 
          multiple
          accept='images/*'
          onChange={handleFiles} 
          name="image"/>
        <button onClick={algo}>enviar</button>


        <Formik
          validationSchema={UserSchema}
          initialValues={{
              // image: '',
              // password: '',
            }}

            onSubmit={ async (values) => {
              // console.log(values);
              console.log(files);
              
              
              
            }}>

            {({ values }) => {

              console.log(values)
     
              return (
                <Form>
                  <div className='rounded-md mt-7'>
                    <div className='w-12/12 m-auto pb-5'>

                      <div className=' w-12/12 m-auto py-5 text-center'>

                        <div className='mb-5 text-center'>
                          <div className='flex items-center ml-3 text-lg mb-2 justify-center'>
                            <div className='text-2xl font-bold'>Kms a recorrer</div>
                          </div>
                          
                          <Field
                              as="select"
                              name="kms"
                              placeholder="Escribe tu nombre"
                              className='bg-gray-100 p-2 rounded-full pl-5 w-6/12 pr-6 text-center text-xl flechita'
                            >
                            <option value=""></option>
                            <option value="pagado">3km</option>
                            <option value="noPagado">5 km</option>
                          </Field>
                          <div className='font-bold text-red-500 text-sm mt-1'>
                            <ErrorMessage name="kms"/>
                          </div>
                        </div>

                        <div className='mb-5 text-center'>
                          <div className='flex items-center ml-3 text-lg mb-2 justify-center'>
                            <div className='text-2xl font-bold'>Sexo</div>
                          </div>
                          <Field
                              as="select"
                              name="sexo"
                              placeholder="Escribe tu nombre"
                              className='bg-gray-100 p-2 rounded-full pl-5 w-6/12 pr-6 text-center text-xl flechita'
                            >
                            <option value=""></option>
                            <option value="pagado">Hombre</option>
                            <option value="noPagado">Mujer</option>
                          </Field>
                          <div className='font-bold text-red-500 text-sm mt-1'>
                            <ErrorMessage name="sexo"/>
                          </div>
                        </div>

                        <div className='mb-5 text-center'>
                          <div className='flex items-center ml-3 text-lg mb-2 justify-center'>
                            <div className='text-2xl font-bold'>Edad</div>
                          </div>
                          <Field
                              as="select"
                              name="edad"
                              placeholder="Escribe tu nombre"
                              className='bg-gray-100 p-2 rounded-full pl-5 w-6/12 pr-6 text-center text-xl flechita'
                            >
                            <option value=""></option>
                            <option value="pagado">18-39</option>
                            <option value="noPagado">40-49</option>
                            <option value="noPagado">50 y más</option>
                          </Field>
                          <div className='font-bold text-red-500 text-sm mt-1'>
                            <ErrorMessage name="edad"/>
                          </div>
                        </div>


                      </div>  
                      
                        <div className='flex justify-center mt-10'>
                          <button type="submit">
                            <div className='bg-redCustom text-white w-12/12 text-center m-auto font-extrabold p-3 rounded-md flex items-center justify-center hover:scale-105 transition transform duration-200 cursor-pointer'>
                              <div className="ml-3"> Registrarme</div>
                            </div>
                          </button>
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
