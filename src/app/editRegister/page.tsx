'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { showOneUser, updatedUser } from '@/store/slices/user/userService';
import { RootState, useAppDispatch } from '@/store';
import { useSelector } from 'react-redux';
import { validateToken } from '@/store/slices/auth/authService';
import { userRespFunc, userStatusFunc } from '@/store/slices/user/userSlice';
import Cookies from "js-cookie";
import Link from 'next/link';

const EditRegister = ({}) => {
  
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [idUser, setIdUser] = useState('')
  const token = Cookies.get('tokenUser')
  const userData = Cookies.get('user')
  
  useEffect(() => {
    if (userData && token) {
      const user = JSON.parse(userData);
      const idUser = user._id;
      setIdUser(user._id);
      dispatch(showOneUser(idUser, token))
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('tokenUser');
    if (token !== null) {
      dispatch(validateToken(token))
    }
  }, [])
  

  const UserSchema = Yup.object().shape({
    nombre: Yup.string().required('* Nombre requerido').matches(/^[aA-zZ\u00C0-\u024F\u1E00-\u1EFF\s]+$/, 'Solo letras y espacios').max(10, 'El nombre debe ser máximo de 10 caractéres'),
    apellido: Yup.string().required('* Apellido requerido').matches(/^[aA-zZ\u00C0-\u024F\u1E00-\u1EFF\s]+$/, 'Solo letras y espacios'),
    correo: Yup.string().email('Debe ser un email válido').required('* Correo requerido'),
    password: Yup.string().required('* Contraseña requerida').min(6, 'La contraseña debe tener al menos 6 caractéres'),
    tipo: Yup.string()
      .when(["familiar"], {
        is: (familiar:any) => familiar === "familiar",    
        then: (depto) => depto.required('Campo requerido'),
      }),
    numColaborador: Yup.string()
      .when(["tipo"], {
        is: (tipo:any) => tipo === "colaborador",
        then: (numColaborador) => numColaborador.required('* Campo requerido').min(6, 'El número debe tener al menos 6 caractéres').max(9, 'El número debe tener máximo 9 caractéres'),
      }),
    depto: Yup.string()
      .when(["tipo"], {
        is: (tipo:any) => tipo === "colaborador",
        then: (depto) => depto.required('* Selecciona una opción'),
      }),
    otroDepto: Yup.string()
      .when(["depto"], {
        is: (depto:any) => depto === "Otro",
        then: (otroDepto) => otroDepto.required('Campo requerido').matches(/^[aA-zZ\u00C0-\u024F\u1E00-\u1EFF\s]+$/, 'Solo letras y espacios'),
      }),
    correoFamiliar: Yup.string()
      .when(["tipo"], {
        is: (tipo:any) => tipo === "familiar",
        then: (correoFamiliar) => correoFamiliar.required('* Elige una opción').email('Debe ser un email válido').required('* Correo requerido'),
      }),
    ubicacion: Yup.string().required('* Elige una opción'),
    direccion: Yup.string()
      .when(["ubicacion"], {
        is: (ubicacion:any) => ubicacion === "otraUbicacion",
        then: (direccion) => direccion.required('Campo requerido'),
      }),
    ciudad: Yup.string()
      .when(["ubicacion"], {
        is: (ubicacion:any) => ubicacion === "otraUbicacion",
        then: (ciudad) => ciudad.required('Campo requerido'),
      }),
    estado: Yup.string()
      .when(["ubicacion"], {
        is: (ubicacion:any) => ubicacion === "otraUbicacion",
        then: (estado) => estado.required('Campo requerido'),
        }),
    edad: Yup.string().required('* Edad requerida'),
    playera: Yup.string().required('* Elige una opción'),
    kms: Yup.string().required('* Elige una opción'),
    genero: Yup.string().required('* Elige una opción'),
    
  });

  const { userStatus, userItem, userResp } = useSelector((state : RootState) => state.userData)

  useEffect(() => {
    userResp === 'editRegister' && router.push("/home")
    dispatch(userRespFunc(''))
  }, [userResp])
  
  // console.log(userItem)
  // console.log(userRespStatus)
  // console.log(userItem?.nombre)

  return (
    <div className='flex m-auto justify-center container w-12/12'>
      <div className=''>
        <div className='w-10/12 md:w-8/12 m-auto text-center mt-5 mt:mt-0'>
          <Image src="/logo.png" width={700} height={230} alt="Logotipo Runners" />
        </div>
      
        <Formik
          validationSchema={UserSchema}
          initialValues={{
              nombre: '',
              apellido: '',
              correo: '',
              password: '',
              tipo: '',
              numColaborador: '',
              depto: '',
              otroDepto: '',
              correoFamiliar: '',
              ubicacion: '',
              direccion: '',
              ciudad: '',
              estado: '',
              edad: '' ,
              playera: '',
              kms: '',
              genero: '',
            }}

            onSubmit={ async (values) => {
              const user = {
                nombre: values.nombre === '' ? null : values.nombre,
                apellido: values.apellido === '' ? null : values.apellido,
                correo: values.correo === '' ? null : values.correo,
                password: values.password === '' ? null : values.password,
                tipo: values.tipo === '' ? null : values.tipo,
                numColaborador: values.numColaborador === '' ? null : values.numColaborador,
                depto: values.depto === '' ? null : values.depto,
                otroDepto: values.otroDepto === '' ? null : values.otroDepto,
                correoFamiliar: values.correoFamiliar === '' ? null : values.correoFamiliar,
                ubicacion: values.ubicacion === '' ? null : values.ubicacion,
                direccion: values.direccion === '' ? null : values.direccion,
                ciudad: values.ciudad === '' ? null : values.ciudad,
                estado: values.estado === '' ? null : values.estado,
                edad: values.edad === '' ? null : values.edad,
                playera: values.playera === '' ? null : values.playera,
                kms: values.kms === '' ? null : values.kms,
                genero: values.genero === '' ? null : values.genero,
              };
              console.log(user);
              if (token) {
                dispatch(updatedUser(idUser, token, user))
              }
            }}>

            {
              function ShowForm ({ values, errors, dirty, isValid, setFieldValue }) {

                useEffect(() => {
                  setFieldValue('nombre', userItem?.nombre || '')
                  setFieldValue('apellido', userItem?.apellido || '')
                  setFieldValue('correo', userItem?.correo || '')
                  setFieldValue('password', userItem?.password || '')
                  setFieldValue('tipo', userItem?.tipo || '')
                  setFieldValue('numColaborador', userItem?.numColaborador || '')
                  setFieldValue('depto', userItem?.depto || '')
                  setFieldValue('otroDepto', userItem?.otroDepto || '')
                  setFieldValue('correoFamiliar', userItem?.correoFamiliar || '')
                  setFieldValue('ubicacion', userItem?.ubicacion || '')
                  setFieldValue('direccion', userItem?.direccion || '')
                  setFieldValue('ciudad', userItem?.ciudad || '')
                  setFieldValue('estado', userItem?.estado || '')
                  setFieldValue('edad', userItem?.edad || '')
                  setFieldValue('playera', userItem?.playera || '')
                  setFieldValue('kms', userItem?.kms || '')
                  setFieldValue('genero', userItem?.genero || '')
                }, [userItem])
                

                const [typeState, setTypeState] = useState('')
                useEffect(() => {
                  if (values.tipo === 'colaborador' ) {
                    setTypeState('colaborador');
                  } 
                  if (values.tipo === 'familiar' ) {
                    setTypeState('familiar');
                  } 
                }, [values.tipo])
                
                const [deptoIsOtro, setDeptoIsOtro] = useState(false)
                useEffect(() => {
                  if (values.depto === 'Otro' ) {
                    setDeptoIsOtro(true);
                  } else {
                    setDeptoIsOtro(false);
                  }
                }, [values.depto])

                const [ubicacionIsOtro, setUbicacionIsOtro] = useState(false)
                useEffect(() => {
                  if (values.ubicacion === 'otraUbicacion' ) {
                    setUbicacionIsOtro(true);
                  } else {
                    setUbicacionIsOtro(false);
                  }
                }, [values.ubicacion])
            
            
            return (

            <Form>
              <div className='rounded-md mt-7'>
                <div className='w-12/12 m-auto pb-5'>

                  <div className='w-12/12 m-auto pb-5 rounded-md'>
                  <div className=' w-11/12 m-auto py-5'>
                
                    <div className='mb-5'>
                      <div className='label'>Nombre<span className='font-light ml-2'>(Si tienes dos nombre, escribe solo uno)</span></div>
                      <Field
                        name="nombre"
                        placeholder="Escribe tu nombre"
                        className="bg-gray-100 w-full p-2 rounded-full pl-5" />
                      {errors.nombre && <div className='error'>{errors.nombre}</div>}
                    </div>

                    <div className='mb-5'>
                      <div className='label'>Primer Apellido</div>
                      <Field
                        name="apellido"
                        placeholder="Escribe tu pimer Apellido"
                        className="bg-gray-100 w-full p-2 rounded-full pl-5" />
                      {errors.apellido && <div className='error'>{errors.apellido}</div>}
                    </div>

                    <div className='my-5'>
                      <div className='label'>Correo<span className='font-light ml-2'>(De preferencia use un correo personal)</span></div>
                      <Field
                        name="correo"
                        placeholder="Escribe tu correo"
                        type="email" />
                      {errors.correo && <div className='error'>{errors.correo}</div>}
                    </div>

                    <div className='my-5'>
                      <div className='label'>Contraseña<span className='font-light ml-2'>(Cree una contraseña de 6 caractéres mínimo)</span></div>
                      <Field
                        name="password"
                        placeholder="Escribe tu Contraseña"
                        type="password" />
                      {errors.password && <div className='error'>{errors.password}</div>}
                    </div>

                    <div className='my-5'>
                      <div className='label'>Colaborador / Familiar</div>
                      <Field 
                        as="select"
                        name="tipo">
                          <option value="">Selecciona una opción</option>
                          <option value="colaborador">Colaborador</option>
                          <option value="familiar">Familiar</option>
                      </Field>
                      {errors.tipo && <div className='error'>{errors.tipo}</div>}
                    </div>

                    {typeState === 'colaborador' && (
                      <>
                        <div className='my-5'>
                        <div className='label'>Número de Colaborador<span className='font-light ml-2'>(Si aplica)</span></div>
                        <Field
                          name="numColaborador"
                          placeholder="Escribe tu número de empleado"
                          type="number" />
                        {errors.numColaborador && <div className='error'>{errors.numColaborador}</div>}
                        </div>
                        
                        <div className='my-5'>
                          <div className='label'>Departamento</div>
                          <Field 
                            as="select"
                            name="depto">
                              <option value="">Selecciona una opción</option>
                              <option value="AP (Presidencia de área)">AP (Presidencia de área)</option>
                              <option value="CCD (Comunicaciones y Asuntos Públicos)">CCD (Comunicaciones y Asuntos Públicos)</option>
                              <option value="CHD (Historia de la Iglesia)">CHD (Historia de la Iglesia)</option>
                              <option value="DTA (Asuntos Temporales)">DTA (Asuntos Temporales)</option>
                              <option value="FHD (Historia Familiar)">FHD (Historia Familiar)</option>
                              <option value="FRD (Contraloría)">FRD (Contraloría)</option>
                              <option value="HRD (Recursos Humanos)">HRD (Recursos Humanos)</option>
                              <option value="MFD (Mantenimiento y Facilidades Físicas)">MFD (Mantenimiento y Facilidades Físicas)</option>
                              <option value="MIS (Departamento Misional)">MIS (Departamento Misional)</option>
                              <option value="SSD (Servicios de soporte)">SSD (Servicios de soporte)</option>
                              <option value="OGC (Legal)">OGC (Legal)</option>
                              <option value="SAI (Sistema educativo)">SAI (Sistema educativo)</option>
                              <option value="SPD (Proyectos especiales)">SPD (Proyectos especiales)</option>
                              <option value="TPL (Templos)">TPL (Templos)</option>
                              <option value="WSR (Autosuficiencia y Bienestar)">WSR (Autosuficiencia y Bienestar)</option>
                              <option value="Otro">Otro</option>
                          </Field>
                          {errors.depto && <div className='error'>{errors.depto}</div>}
                        </div>

                        {deptoIsOtro && (
                          <div className='my-5'>
                            <div className='label'>Nombre del departamento</div>
                            <Field
                              name="otroDepto"
                              placeholder="Escribe tu departamento"
                              type="text" />
                            {errors.otroDepto && <div className='error'>{errors.otroDepto}</div>}
                          </div>
                        )}
                      </>
                    )}

                    {typeState === 'familiar' && (
                      <div className='my-5'>
                        <div className='label'>Correo institucional del Colabordador<div className='font-light'>El correo debe ser el mismo con el que el Colaborador se registró</div></div>
                        <Field
                          name="correoFamiliar"
                          placeholder="Escribe el correo"
                          type="email" />
                        {errors.correoFamiliar && <div className='error'>{errors.correoFamiliar}</div>}
                      </div>
                    )}


                    <div className='my-5'>
                      <div className='label'>Ubicación para entrega de playera<span className='font-light'> </span></div>
                      <Field 
                        as="select"
                        name="ubicacion">
                          <option value="">Selecciona una opción</option>
                          <option value="tecamachalco">Tecamachalco</option>
                          <option value="CCM">CCM</option>
                          <option value="Aragón">Aragón</option>
                          <option value="otraUbicacion">Otra</option>
                      </Field>
                      {errors.ubicacion &&<div className='error'>{errors.ubicacion}</div>}
                    </div>

                    {ubicacionIsOtro && (
                      <>
                        <div className='my-5'>
                          <div className='label'>Dirección de la Oficina para entrega de playera</div>
                          <Field
                            name="direccion"
                            placeholder="Escribe tu ubicación"
                            type="text" />
                          {errors.direccion && <div className='error'>{errors.direccion}</div>}
                        </div>
                        <div className='my-5'>
                          <div className='label'>Estado</div>
                          <Field
                            name="estado"
                            placeholder="Escribe el estado de tu ubicación"
                            type="text" />
                          {errors.estado && <div className='error'>{errors.estado}</div>}
                        </div>
                        <div className='my-5'>
                          <div className='label'>Ciudad</div>
                          <Field
                            name="ciudad"
                            placeholder="Escribe la ciudad de tu ubicación"
                            type="text" />
                          {errors.ciudad && <div className='error'>{errors.ciudad}</div>}
                        </div>
                      </>
                    )}


                    <div className='my-5'>
                      <div className='label'>Edad</div>
                      <Field 
                        as="select"
                        name="edad">
                          <option value="">Selecciona una opción</option>
                          <option value="1">18-39</option>
                          <option value="2">40-49</option>
                          <option value="3">50 y más</option>
                      </Field>
                      {errors.edad &&<div className='error'>{errors.edad}</div>}
                    </div>

                    <div className='my-5'>
                      <div className='label'>Talla de Playera</div>
                      <Field 
                        as="select"
                        name="playera">
                          <option value="">Selecciona una opción</option>
                          <option value="ch">CH</option>
                          <option value="m">M</option>
                          <option value="g">G</option>
                          <option value="xg">XG</option>
                      </Field>
                      {errors.playera &&<div className='error'>{errors.playera}</div>}
                    </div>
                    
                    <div className='my-5'>
                      <div className='label'>Kilómetros a correr</div>
                      <Field 
                        as="select"
                        name="kms">
                          <option value="">Selecciona una opción</option>
                          <option value="3">3 kms.</option>
                          <option value="5">5 kms.</option>
                      </Field>
                      {errors.kms &&<div className='error'>{errors.kms}</div>}
                    </div>

                    <div className='flex ml-5'>
                      <label className='flex'>
                        <Field type="radio" name="genero" value="H" className="w-3/12"/>
                        <span className='ml-2'>Hombre</span>
                      </label>
                      <label className='flex ml-10'>
                        <Field type="radio" name="genero" value="M" className="w-3/12"/>
                        <span className='ml-2'>Mujer</span>
                      </label>
                    </div>
                    {errors.genero &&<div className='error'>{errors.genero}</div>}
                  </div>
                    
                  </div>

                  {userStatus === 400 && (<div className='m-auto w-10/12 text-1xl font-bold text-center bg-blueCustom text-white rounded-md p-2'>El correo ya existe</div>)}
                  {userStatus === 401 && (<div className='m-auto w-10/12 text-1xl font-bold text-center bg-blueCustom text-white rounded-md p-2'>El Colaborador ha registrado más de 4 familiares</div>)}

                  <div className='flex justify-center mt-5'>
                    <Link href="/home">
                      <div className='bg-blueCustom text-white text-center font-extrabold p-3 rounded-md flex items-center justify-center hover:scale-105 transition transform duration-200 cursor-pointer'>
                          Regresar
                      </div>
                    </Link>
                    <button type="submit" 
                      className='bg-redCustom text-white ml-3 text-center font-extrabold p-3 rounded-md flex items-center justify-center hover:scale-105 transition transform duration-200 cursor-pointer disabled:bg-slate-200 disabled:cursor-not-allowed'
                      disabled={!dirty || !isValid}
                      >
                        Editar Registro
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
  );
};

export default EditRegister;
