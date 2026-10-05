'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '@/store/slices/user/userService';
import { RootState, useAppDispatch } from '@/store';
import { useSelector } from 'react-redux';
import Loader from '@/components/Loader';
import { userRespFunc, userStatusFunc } from '@/store/slices/user/userSlice';
import { FaArrowLeft, FaInfoCircle, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const Register = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { userLoading, userStatus, userResp } = useSelector(
    (state: RootState) => state.userData
  );

  const UserSchema = Yup.object().shape({
    nombre: Yup.string()
      .required('* Nombre requerido')
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, 'Solo letras y espacios')
      .max(25, 'El nombre debe tener máximo 25 caracteres'),
    apellido: Yup.string()
      .required('* Apellidos requeridos')
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, 'Solo letras y espacios'),
    correo: Yup.string()
      .email('Ingresa un correo electrónico válido')
      .required('* Correo requerido'),
    password: Yup.string()
      .required('* Contraseña requerida')
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    tipo: Yup.string().required('* Selecciona el tipo de participante'),
    numColaborador: Yup.string().when(['tipo'], {
      is: (tipo: any) => tipo === 'colaborador',
      then: (schema) =>
        schema
          .required('* Número de colaborador requerido')
          .min(6, 'Debe tener al menos 6 caracteres')
          .max(9, 'Debe tener máximo 9 caracteres'),
    }),
    depto: Yup.string().when(['tipo'], {
      is: (tipo: any) => tipo === 'colaborador',
      then: (schema) => schema.required('* Selecciona un departamento'),
    }),
    otroDepto: Yup.string().when(['depto'], {
      is: (depto: any) => depto === 'Otro',
      then: (schema) =>
        schema
          .required('* Especifica el departamento')
          .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, 'Solo letras y espacios'),
    }),
    nombreFamiliar: Yup.string().when(['tipo'], {
      is: (tipo: any) => tipo === 'familiar',
      then: (schema) =>
        schema.required('* Ingresa el nombre del colaborador que te invita'),
    }),
    // Modalidad es 100% virtual, la ubicación siempre es obligatoria
    ubicacion: Yup.string().required('* Selecciona la ubicación para entrega de playera'),
    direccion: Yup.string().when(['ubicacion'], {
      is: (ubicacion: any) => ubicacion === 'otraUbicacion',
      then: (schema) => schema.required('* Ingresa la dirección'),
    }),
    ciudad: Yup.string().when(['ubicacion'], {
      is: (ubicacion: any) => ubicacion === 'otraUbicacion',
      then: (schema) => schema.required('* Ingresa la ciudad'),
    }),
    estado: Yup.string().when(['ubicacion'], {
      is: (ubicacion: any) => ubicacion === 'otraUbicacion',
      then: (schema) => schema.required('* Ingresa el estado'),
    }),
    edad: Yup.string().required('* Selecciona tu rango de edad'),
    playera: Yup.string().required('* Selecciona la talla de playera'),
    kms: Yup.string().required('* Selecciona la distancia a correr'),
    genero: Yup.string().required('* Selecciona tu género'),
    agree: Yup.bool()
      .oneOf([true], '* Debes aceptar el Aviso de Privacidad')
      .required('* Debes aceptar el Aviso de Privacidad'),
  });

  useEffect(() => {
    dispatch(userStatusFunc(0));
  }, [dispatch]);

  useEffect(() => {
    if (userResp === 'register') {
      router.push('/home');
      dispatch(userRespFunc(''));
    }
  }, [userResp, router, dispatch]);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 font-sans">
      {/* ========================================================= */}
      {/* 1. BARRA SUPERIOR INSTITUCIONAL LIMPIA Y SOBRIA           */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-nav.png"
              width={140}
              height={42}
              alt="RUNNERS"
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
            >
              <FaArrowLeft className="text-[10px]" />
              <span>Inicio</span>
            </Link>

            <Link
              href="/login"
              className="px-3.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. CONTENEDOR DEL FORMULARIO                              */}
      {/* ========================================================= */}
      <main className="py-8 sm:py-12 px-4 sm:px-6 max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-10">
          {/* Encabezado formal */}
          <div className="border-b border-slate-200 pb-6 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              5ta Carrera por el Servicio • Edición 2026
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Registro de Participante
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Ingresa tus datos personales y de cuenta para formalizar tu inscripción.
            </p>
          </div>

          {/* FORMULARIO */}
          <Formik
            validationSchema={UserSchema}
            initialValues={{
              nombre: '',
              apellido: '',
              correo: '',
              password: '',
              tipo: '',
              modalidad: 'virtual',
              numColaborador: '',
              depto: '',
              otroDepto: '',
              nombreFamiliar: '',
              ubicacion: '',
              direccion: '',
              ciudad: '',
              estado: '',
              edad: '',
              playera: '',
              kms: '',
              genero: '',
              agree: false,
            }}
            onSubmit={async (values) => {
              const data = {
                nombre: values.nombre.trim() || null,
                apellido: values.apellido.trim() || null,
                correo: values.correo.trim().toLowerCase() || null,
                password: values.password || null,
                tipo: values.tipo || null,
                modalidad: 'virtual',
                numColaborador:
                  values.tipo === 'colaborador'
                    ? values.numColaborador
                      ? String(values.numColaborador).trim()
                      : null
                    : null,
                depto:
                  values.tipo === 'colaborador' ? values.depto || null : null,
                otroDepto:
                  values.tipo === 'colaborador' && values.depto === 'Otro'
                    ? values.otroDepto.trim() || null
                    : null,
                nombreFamiliar:
                  values.tipo === 'familiar'
                    ? values.nombreFamiliar.trim() || null
                    : null,
                ubicacion: values.ubicacion || null,
                direccion:
                  values.ubicacion === 'otraUbicacion'
                    ? values.direccion.trim() || null
                    : null,
                ciudad:
                  values.ubicacion === 'otraUbicacion'
                    ? values.ciudad.trim() || null
                    : null,
                estado:
                  values.ubicacion === 'otraUbicacion'
                    ? values.estado.trim() || null
                    : null,
                edad: values.edad || null,
                playera: values.playera || null,
                kms: values.kms || null,
                genero: values.genero || null,
              };

              dispatch(registerUser(data));
            }}
          >
            {({ values, errors, touched, setFieldValue }) => {
              return (
                <Form className="space-y-6">
                  {/* SECCIÓN 1: DATOS PERSONALES Y DE CUENTA */}
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      1. Información Personal y de Cuenta
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Nombre */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Nombre{' '}
                          <span className="font-normal text-slate-400">
                            (un solo nombre)
                          </span>
                        </label>
                        <Field
                          name="nombre"
                          type="text"
                          placeholder="Ej. Juan"
                          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 transition"
                        />
                        {errors.nombre && touched.nombre && (
                          <p className="text-rose-600 text-xs mt-1 font-medium">
                            {errors.nombre}
                          </p>
                        )}
                      </div>

                      {/* Apellidos */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Apellidos
                        </label>
                        <Field
                          name="apellido"
                          type="text"
                          placeholder="Ej. Pérez Gómez"
                          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 transition"
                        />
                        {errors.apellido && touched.apellido && (
                          <p className="text-rose-600 text-xs mt-1 font-medium">
                            {errors.apellido}
                          </p>
                        )}
                      </div>

                      {/* Correo */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Correo Electrónico{' '}
                          <span className="font-normal text-slate-400">
                            (personal)
                          </span>
                        </label>
                        <Field
                          name="correo"
                          type="email"
                          placeholder="correo@ejemplo.com"
                          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 transition"
                        />
                        {errors.correo && touched.correo && (
                          <p className="text-rose-600 text-xs mt-1 font-medium">
                            {errors.correo}
                          </p>
                        )}
                      </div>

                      {/* Contraseña */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Contraseña{' '}
                          <span className="font-normal text-slate-400">
                            (mínimo 6 caracteres)
                          </span>
                        </label>
                        <Field
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 transition"
                        />
                        {errors.password && touched.password && (
                          <p className="text-rose-600 text-xs mt-1 font-medium">
                            {errors.password}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SECCIÓN 2: TIPO DE PARTICIPANTE */}
                  <div className="border-t border-slate-200 pt-5">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      2. Tipo de Participante
                    </h2>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <button
                        type="button"
                        onClick={() => setFieldValue('tipo', 'colaborador')}
                        className={`py-3 px-4 rounded-xl border text-center transition ${
                          values.tipo === 'colaborador'
                            ? 'border-slate-900 bg-slate-900 text-white font-semibold shadow-sm'
                            : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="block text-sm">Colaborador</span>
                        <span
                          className={`block text-[11px] mt-0.5 ${
                            values.tipo === 'colaborador'
                              ? 'text-slate-300'
                              : 'text-slate-500'
                          }`}
                        >
                          Empleado institucional
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFieldValue('tipo', 'familiar')}
                        className={`py-3 px-4 rounded-xl border text-center transition ${
                          values.tipo === 'familiar'
                            ? 'border-slate-900 bg-slate-900 text-white font-semibold shadow-sm'
                            : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="block text-sm">Familiar</span>
                        <span
                          className={`block text-[11px] mt-0.5 ${
                            values.tipo === 'familiar'
                              ? 'text-slate-300'
                              : 'text-slate-500'
                          }`}
                        >
                          Invitado por colaborador
                        </span>
                      </button>
                    </div>

                    {errors.tipo && touched.tipo && (
                      <p className="text-rose-600 text-xs font-medium mb-3">
                        {errors.tipo}
                      </p>
                    )}

                    {/* Campos condicionales para Colaborador */}
                    {values.tipo === 'colaborador' && (
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Número de Colaborador{' '}
                              <span className="font-normal text-slate-400">
                                (6 a 9 dígitos)
                              </span>
                            </label>
                            <Field
                              name="numColaborador"
                              type="text"
                              placeholder="Ej. 123456"
                              className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 transition"
                            />
                            {errors.numColaborador && touched.numColaborador && (
                              <p className="text-rose-600 text-xs mt-1 font-medium">
                                {errors.numColaborador}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Departamento
                            </label>
                            <Field
                              as="select"
                              name="depto"
                              className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 transition cursor-pointer"
                            >
                              <option value="">Selecciona una opción...</option>
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
                            {errors.depto && touched.depto && (
                              <p className="text-rose-600 text-xs mt-1 font-medium">
                                {errors.depto}
                              </p>
                            )}
                          </div>
                        </div>

                        {values.depto === 'Otro' && (
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Nombre del Departamento
                            </label>
                            <Field
                              name="otroDepto"
                              type="text"
                              placeholder="Escribe el nombre del departamento"
                              className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 transition"
                            />
                            {errors.otroDepto && touched.otroDepto && (
                              <p className="text-rose-600 text-xs mt-1 font-medium">
                                {errors.otroDepto}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Campos condicionales para Familiar */}
                    {values.tipo === 'familiar' && (
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Nombre completo del Colaborador{' '}
                          <span className="font-normal text-slate-400">
                            (quien te invita)
                          </span>
                        </label>
                        <Field
                          name="nombreFamiliar"
                          type="text"
                          placeholder="Nombre y apellidos del colaborador"
                          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 transition"
                        />
                        {errors.nombreFamiliar && touched.nombreFamiliar && (
                          <p className="text-rose-600 text-xs mt-1 font-medium">
                            {errors.nombreFamiliar}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* SECCIÓN 3: ENTREGA DE PLAYERA Y TALLA */}
                  <div className="border-t border-slate-200 pt-5">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      3. Entrega de Playera y Talla
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Ubicación para entrega de playera */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Ubicación para entrega de playera
                        </label>
                        <Field
                          as="select"
                          name="ubicacion"
                          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 transition cursor-pointer"
                        >
                          <option value="">Selecciona una opción...</option>
                          <option value="tecamachalco">Oficinas Tecamachalco</option>
                          <option value="CCM">Centro de Capacitación Misional (CCM)</option>
                          <option value="Aragón">Oficinas Aragón</option>
                          <option value="otraUbicacion">Otra oficina / Ubicación foránea</option>
                        </Field>
                        {errors.ubicacion && touched.ubicacion && (
                          <p className="text-rose-600 text-xs mt-1 font-medium">
                            {errors.ubicacion}
                          </p>
                        )}
                      </div>

                      {/* Talla de Playera */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Talla de Playera
                        </label>
                        <Field
                          as="select"
                          name="playera"
                          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 transition cursor-pointer"
                        >
                          <option value="">Selecciona una talla...</option>
                          <option value="ch">Chica (CH)</option>
                          <option value="m">Mediana (M)</option>
                          <option value="g">Grande (G)</option>
                          <option value="xg">Extra Grande (XG)</option>
                        </Field>
                        {errors.playera && touched.playera && (
                          <p className="text-rose-600 text-xs mt-1 font-medium">
                            {errors.playera}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Campos de otraUbicacion */}
                    {values.ubicacion === 'otraUbicacion' && (
                      <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                        <span className="block text-xs font-semibold text-slate-700">
                          Dirección de envío a oficina foránea:
                        </span>

                        <div>
                          <label className="block text-xs text-slate-600 mb-1">
                            Dirección de la Oficina
                          </label>
                          <Field
                            name="direccion"
                            type="text"
                            placeholder="Calle, número, colonia y C.P."
                            className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 transition"
                          />
                          {errors.direccion && touched.direccion && (
                            <p className="text-rose-600 text-xs mt-1 font-medium">
                              {errors.direccion}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-slate-600 mb-1">
                              Estado
                            </label>
                            <Field
                              name="estado"
                              type="text"
                              placeholder="Ej. Jalisco"
                              className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 transition"
                            />
                            {errors.estado && touched.estado && (
                              <p className="text-rose-600 text-xs mt-1 font-medium">
                                {errors.estado}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-xs text-slate-600 mb-1">
                              Ciudad
                            </label>
                            <Field
                              name="ciudad"
                              type="text"
                              placeholder="Ej. Guadalajara"
                              className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 transition"
                            />
                            {errors.ciudad && touched.ciudad && (
                              <p className="text-rose-600 text-xs mt-1 font-medium">
                                {errors.ciudad}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* SECCIÓN 4: CATEGORÍA Y PARÁMETROS */}
                  <div className="border-t border-slate-200 pt-5">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      4. Categoría y Distancia
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Rango de Edad */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Rango de Edad
                        </label>
                        <Field
                          as="select"
                          name="edad"
                          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 transition cursor-pointer"
                        >
                          <option value="">Selecciona tu edad...</option>
                          <option value="1">18 a 39 años</option>
                          <option value="2">40 a 49 años</option>
                          <option value="3">50 años y más</option>
                        </Field>
                        {errors.edad && touched.edad && (
                          <p className="text-rose-600 text-xs mt-1 font-medium">
                            {errors.edad}
                          </p>
                        )}
                      </div>

                      {/* Distancia */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Distancia a Correr
                        </label>
                        <Field
                          as="select"
                          name="kms"
                          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 transition cursor-pointer"
                        >
                          <option value="">Selecciona distancia...</option>
                          <option value="3">3 kms (Caminata / Trote)</option>
                          <option value="5">5 kms (Carrera)</option>
                        </Field>
                        {errors.kms && touched.kms && (
                          <p className="text-rose-600 text-xs mt-1 font-medium">
                            {errors.kms}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Género */}
                    <div className="mt-4">
                      <label className="block text-xs font-semibold text-slate-700 mb-2">
                        Género
                      </label>
                      <div className="grid grid-cols-2 gap-3 max-w-xs">
                        <button
                          type="button"
                          onClick={() => setFieldValue('genero', 'H')}
                          className={`py-2 px-4 rounded-lg border text-sm font-semibold transition ${
                            values.genero === 'H'
                              ? 'border-slate-900 bg-slate-900 text-white'
                              : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          Hombre
                        </button>

                        <button
                          type="button"
                          onClick={() => setFieldValue('genero', 'M')}
                          className={`py-2 px-4 rounded-lg border text-sm font-semibold transition ${
                            values.genero === 'M'
                              ? 'border-slate-900 bg-slate-900 text-white'
                              : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          Mujer
                        </button>
                      </div>
                      {errors.genero && touched.genero && (
                        <p className="text-rose-600 text-xs mt-1 font-medium">
                          {errors.genero}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* SECCIÓN 5: TÉRMINOS Y ENVÍO */}
                  <div className="border-t border-slate-200 pt-5 space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <Field
                        type="checkbox"
                        name="agree"
                        className="mt-0.5 w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-700 cursor-pointer"
                      />
                      <span className="text-xs text-slate-600 leading-relaxed">
                        He leído y acepto el{' '}
                        <a
                          href="/aviso.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-900 font-semibold underline hover:text-slate-700"
                        >
                          Aviso de Privacidad
                        </a>{' '}
                        para la participación en la 5ta Carrera por el Servicio Virtual.
                      </span>
                    </label>
                    {errors.agree && touched.agree && (
                      <p className="text-rose-600 text-xs font-medium">
                        {errors.agree}
                      </p>
                    )}

                    {/* Mensajes de respuesta del servidor */}
                    {userStatus === 200 && (
                      <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-2">
                        <FaCheckCircle className="text-emerald-600 text-base shrink-0" />
                        <span>¡Registro completado con éxito! Redirigiendo...</span>
                      </div>
                    )}

                    {userStatus === 400 && (
                      <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-2">
                        <FaExclamationTriangle className="text-rose-600 text-base shrink-0" />
                        <span>
                          Este correo ya se encuentra registrado. ¿Deseas{' '}
                          <Link href="/login" className="underline font-bold">
                            iniciar sesión
                          </Link>
                          ?
                        </span>
                      </div>
                    )}

                    {userStatus === 401 && (
                      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm flex items-center gap-2">
                        <FaExclamationTriangle className="text-amber-600 text-base shrink-0" />
                        <span>El colaborador ya ha registrado el máximo de 4 familiares permitidos.</span>
                      </div>
                    )}

                    {(userStatus === 500 || userStatus === 504) && (
                      <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-2">
                        <FaExclamationTriangle className="text-rose-600 text-base shrink-0" />
                        <span>Error de servidor. Por favor intenta de nuevo en unos minutos.</span>
                      </div>
                    )}

                    {/* Botón de envío sobrio */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={userLoading}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base py-3 px-6 rounded-xl transition shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {userLoading ? <Loader /> : 'Completar Registro'}
                      </button>
                    </div>

                    <div className="text-center pt-1">
                      <p className="text-xs text-slate-500">
                        ¿Ya tienes una cuenta registrada?{' '}
                        <Link
                          href="/login"
                          className="font-semibold text-slate-800 hover:underline"
                        >
                          Inicia sesión aquí
                        </Link>
                      </p>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </main>
    </div>
  );
};

export default Register;