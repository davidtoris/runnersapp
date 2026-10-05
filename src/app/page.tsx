import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaRunning,
  FaTrophy,
  FaCamera,
  FaMobileAlt,
  FaUserFriends,
  FaCheckCircle,
  FaMedal,
  FaRoute,
  FaStopwatch,
  FaFlagCheckered
} from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-cyan-500 selection:text-white">

      {/* ========================================================= */}
      {/* 1. BARRA DE MENÚS STICKY CLARA (NAVEGACIÓN DEL CORREDOR)  */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Logo oficial recortado en el navbar (Solo RUNNERS + tenis) */}
          <Link href="/" className="flex items-center group py-1">
            <Image
              src="/logo-nav.png"
              width={160}
              height={50}
              alt="RUNNERS"
              className="h-8 sm:h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
              priority
            />
          </Link>

          {/* Menú de enlaces de anclaje (Smooth Scroll a secciones) */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-bold text-slate-600">
            <a
              href="#evento"
              className="px-3.5 py-2 rounded-xl hover:text-blueCustom hover:bg-slate-100 transition flex items-center gap-2"
            >
              <FaRoute className="text-cyan-500 text-xs" />
              <span>Ruta & Horarios</span>
            </a>
            <a
              href="#categorias"
              className="px-3.5 py-2 rounded-xl hover:text-yellow-600 hover:bg-slate-100 transition flex items-center gap-2"
            >
              <FaFlagCheckered className="text-yellowCustom text-xs" />
              <span>Categorías (3K & 5K)</span>
            </a>
            <a
              href="#como-participar"
              className="px-3.5 py-2 rounded-xl hover:text-green-600 hover:bg-slate-100 transition flex items-center gap-2"
            >
              <FaStopwatch className="text-greenCustom text-xs" />
              <span>Paso a Paso</span>
            </a>
            <a
              href="#reglamento"
              className="px-3.5 py-2 rounded-xl hover:text-blueCustom hover:bg-slate-100 transition flex items-center gap-2"
            >
              <FaCheckCircle className="text-blueCustom text-xs" />
              <span>Reglamento</span>
            </a>
          </nav>

          {/* Botones de acción rápida con tenis blanco visible */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login">
              <div className="px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-blueCustom to-cyan-600 hover:from-cyan-600 hover:to-blueCustom text-white text-xs sm:text-sm font-extrabold shadow-md hover:shadow-lg transition cursor-pointer flex items-center gap-2">
                <Image src="/tennis.png" width={18} height={18} alt="" className="brightness-0 invert" />
                <span>Inicia Sesión</span>
              </div>
            </Link>
            <Link href="/register">
              <div className="px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-redCustom to-rose-600 hover:from-rose-600 hover:to-redCustom text-white text-xs sm:text-sm font-extrabold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition cursor-pointer flex items-center gap-2">
                <FaRunning className="text-xs" />
                <span>Regístrate</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Sub-barra de navegación móvil con desplazamiento horizontal suave */}
        <div className="lg:hidden flex items-center justify-between px-3 py-2 bg-slate-100/90 border-t border-slate-200 text-xs font-bold overflow-x-auto gap-2 no-scrollbar">
          <a href="#evento" className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-white shadow-sm text-slate-700 hover:text-blueCustom flex items-center gap-1.5">
            <FaRoute className="text-cyan-500 text-[10px]" />
            <span>Ruta</span>
          </a>
          <a href="#categorias" className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-white shadow-sm text-slate-700 hover:text-yellow-600 flex items-center gap-1.5">
            <FaFlagCheckered className="text-yellowCustom text-[10px]" />
            <span>Categorías</span>
          </a>
          <a href="#como-participar" className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-white shadow-sm text-slate-700 hover:text-green-600 flex items-center gap-1.5">
            <FaStopwatch className="text-greenCustom text-[10px]" />
            <span>Pasos</span>
          </a>
          <a href="#reglamento" className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-white shadow-sm text-slate-700 hover:text-blueCustom flex items-center gap-1.5">
            <FaCheckCircle className="text-blueCustom text-[10px]" />
            <span>Reglas</span>
          </a>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. HERO SECTION: MAPA DE CORREDORES + LOGO OFICIAL       */}
      {/* ========================================================= */}
      <section className="relative w-full overflow-hidden bg-white border-b border-slate-200/80">
        {/* Logo flotante responsive con sombra suave */}
        <div className="absolute right-3 sm:right-6 md:right-24 top-4 sm:top-8 md:top-14 w-5/12 sm:w-4/12 md:w-4/12 max-w-[480px] z-10 pointer-events-none drop-shadow-xl transition-all">
          <Image
            src="/logo.png"
            width={550}
            height={230}
            alt="RUNNERS - 5ta Carrera por el Servicio Área México"
            priority
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Imagen del mapa con rutas de corredores */}
        <Image
          src="/mapa-corredores.jpg"
          width={2776}
          height={1536}
          alt="Mapa de corredores Área México"
          priority
          className="w-full h-auto object-cover block"
        />
      </section>

      {/* ========================================================= */}
      {/* 3. SLOGAN CORPORATIVO & RELOJ DE CARRERA                  */}
      {/* ========================================================= */}
      <section className="py-10 md:py-14 px-4 text-center max-w-5xl mx-auto">

        {/* Badge estilo Cronómetro de Salida */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-200 shadow-sm mb-6">
          <div className="w-2.5 h-2.5 rounded-full bg-greenCustom animate-pulse"></div>
          <span className="font-mono font-bold text-xs uppercase tracking-widest text-slate-700">
            CIRCUITO NACIONAL VIRTUAL • 31 OCTUBRE 2026
          </span>
          <span className="px-2 py-0.5 rounded bg-blueCustom text-white font-mono text-[10px] font-black">
            EN VIVO
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-grayCustom tracking-tight leading-tight">
          La experiencia que nos une en el servicio,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blueCustom to-cyan-500">
            ahora más cerca de todos
          </span>
        </h1>

        <p className="mt-4 text-lg sm:text-xl md:text-2xl font-bold text-greenCustom max-w-3xl mx-auto">
          Sirviendo, avanzando y creciendo juntos, sin importar la distancia.
        </p>

        {/* Botones de acción rápida con estética deportiva */}
        <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
          <Link href="/register">
            <div className="bg-gradient-to-r from-redCustom to-rose-600 hover:from-rose-600 hover:to-redCustom text-white font-extrabold px-7 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center cursor-pointer">
              <Image src="/tennis.png" width={26} height={26} alt="Icono tenis" className="mr-3 brightness-0 invert" />
              <span className="tracking-wide">Regístrate AQUÍ para la carrera</span>
            </div>
          </Link>
          <Link href="/login">
            <div className="bg-gradient-to-r from-blueCustom to-cyan-600 hover:from-cyan-600 hover:to-blueCustom text-white font-extrabold px-7 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center cursor-pointer">
              <Image src="/tennis.png" width={26} height={26} alt="Icono tenis" className="mr-3 brightness-0 invert" />
              <span className="tracking-wide">Inicia Sesión</span>
            </div>
          </Link>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. SECCIÓN #evento: FICHA TÉCNICA CLARA DE LA CARRERA     */}
      {/* ========================================================= */}
      <section id="evento" className="scroll-mt-24 px-4 max-w-6xl mx-auto mb-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl relative overflow-hidden">

          {/* Encabezado con estética de Cronometraje Deportivo */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-200 pb-6 mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
                <span className="text-xs font-black uppercase tracking-widest text-cyan-600">
                  Ficha Técnica Oficial
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-800 uppercase tracking-tight mt-1">
                Modalidad Virtual 2026
              </h2>
            </div>

            {/* Medidor de Ventana de Carrera */}

          </div>

          {/* Grilla de 4 tarjetas de datos de alto contraste */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Tarjeta Fecha */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 transition flex flex-col justify-between hover:bg-emerald-50 hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center mb-4 shadow-sm">
                <FaCalendarAlt className="text-xl" />
              </div>
              <div>
                <span className="text-[11px] uppercase font-bold tracking-wider text-emerald-800">Día de competencia</span>
                <h3 className="text-lg font-black text-slate-800 mt-1 leading-snug">
                  Sábado 31 de Octubre 2026
                </h3>
              </div>
            </div>

            {/* Tarjeta Horario */}
            <div className="bg-cyan-50/70 border border-cyan-200/80 rounded-2xl p-5 transition flex flex-col justify-between hover:bg-cyan-50 hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-cyan-600 text-white flex items-center justify-center mb-4 shadow-sm">
                <FaClock className="text-xl" />
              </div>
              <div>
                <span className="text-[11px] uppercase font-bold tracking-wider text-cyan-800">Horario oficial</span>
                <h3 className="text-lg font-black text-slate-800 mt-1 leading-snug">
                  6:00 AM a 2:00 PM
                </h3>
                <span className="text-xs text-slate-500 font-medium">(Hora del centro)</span>
              </div>
            </div>

            {/* Tarjeta Ubicación */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 transition flex flex-col justify-between hover:bg-amber-50 hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-4 shadow-sm">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <div>
                <span className="text-[11px] uppercase font-bold tracking-wider text-amber-800">Circuito & Terreno</span>
                <h3 className="text-base font-bold text-slate-800 mt-1 leading-snug">
                  En tu lugar favorito
                </h3>
                <span className="text-xs text-slate-500">(Parque, asfalto, bosque...)</span>
              </div>
            </div>

            {/* Tarjeta Invitados */}
            <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-5 transition flex flex-col justify-between hover:bg-rose-50 hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-rose-500 text-white flex items-center justify-center mb-4 shadow-sm">
                <FaUserFriends className="text-xl" />
              </div>
              <div>
                <span className="text-[11px] uppercase font-bold tracking-wider text-rose-800">Invitados</span>
                <h3 className="text-base font-bold text-slate-800 mt-1 leading-snug">
                  Hasta 5 invitados
                </h3>
                <span className="text-xs text-slate-500">Familiares mayores de edad</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. SECCIÓN #categorias: DORSALES DE MARATÓN (CLAROS)      */}
      {/* ========================================================= */}
      <section id="categorias" className="scroll-mt-24 py-16 bg-white px-4 border-y border-slate-200">
        <div className="max-w-5xl mx-auto">

          {/* Logo Fundamentos con presentación de insignia */}
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="p-3 bg-white rounded-2xl shadow-md border border-slate-200 hover:shadow-lg transition">
              <Image
                src="/logo-fundamentos.jpg"
                width={150}
                height={140}
                className="object-contain"
                alt="Fundamentos del servicio"
              />
            </div>
          </div>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-black uppercase tracking-widest mb-2">
              <FaFlagCheckered />
              Distancias Oficiales
            </div>
            <h2 className="uppercase font-black text-slate-800 text-3xl sm:text-4xl tracking-tight">
              Categorías de Competencia
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Ramas Femenil y Varonil
            </p>
          </div>

          {/* Grilla de DORSALES DE CORREDOR (Race Bibs en Modo Claro) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

            {/* DORSAL 3 KM */}
            <div className="bg-white border-2 border-cyan-400 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:border-cyan-500 transition-all duration-300 group">

              {/* Ojales de dorsal (Race Bib holes) */}
              <div className="flex justify-between items-center mb-4">
                <span className="w-3.5 h-3.5 rounded-full bg-slate-200 border border-slate-300"></span>

                <span className="w-3.5 h-3.5 rounded-full bg-slate-200 border border-slate-300"></span>
              </div>

              <div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
                      Carrera 3 km
                    </h3>

                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center group-hover:scale-110 transition shadow-sm">
                    <FaRunning className="text-3xl" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800">3 Km Libre</span>
                    <span className="text-xs font-black px-3 py-1 bg-cyan-600 text-white rounded-md">
                      18 – 39 años
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800">3 Km Máster</span>
                    <span className="text-xs font-black px-3 py-1 bg-slate-200 text-slate-700 rounded-md">
                      40 – 49 años
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800">3 Km Veteranos</span>
                    <span className="text-xs font-black px-3 py-1 bg-slate-200 text-slate-700 rounded-md">
                      50 y más
                    </span>
                  </div>
                </div>
              </div>


            </div>

            {/* DORSAL 5 KM */}
            <div className="bg-white border-2 border-amber-400 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:border-amber-500 transition-all duration-300 group">

              {/* Ojales de dorsal (Race Bib holes) */}
              <div className="flex justify-between items-center mb-4">
                <span className="w-3.5 h-3.5 rounded-full bg-slate-200 border border-slate-300"></span>

                <span className="w-3.5 h-3.5 rounded-full bg-slate-200 border border-slate-300"></span>
              </div>

              <div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
                      Carrera 5 km
                    </h3>

                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition shadow-sm">
                    <FaTrophy className="text-3xl" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800">5 Km Libre</span>
                    <span className="text-xs font-black px-3 py-1 bg-amber-500 text-white rounded-md">
                      18 – 39 años
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800">5 Km Máster</span>
                    <span className="text-xs font-black px-3 py-1 bg-slate-200 text-slate-700 rounded-md">
                      40 – 49 años
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800">5 Km Veteranos</span>
                    <span className="text-xs font-black px-3 py-1 bg-slate-200 text-slate-700 rounded-md">
                      50 y más
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Muestra de App de celular centrado */}
          <div className="flex justify-center mt-12">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-md max-w-xs text-center">
              <Image
                src="/celular.jpg"
                width={200}
                height={161}
                alt="App de correr en celular"
                className="mx-auto rounded-xl shadow-sm"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. SECCIÓN #como-participar: CHECKPOINTS CLAROS           */}
      {/* ========================================================= */}
      <section id="como-participar" className="scroll-mt-24 py-16 bg-slate-50 border-b border-slate-200 px-4">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-widest mb-2">
              <FaStopwatch />
              Checkpoints de Carrera
            </span>
            <h2 className="uppercase font-black text-slate-800 text-3xl sm:text-4xl tracking-tight">
              ¿Cómo Participar en la Modalidad Virtual?
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
              Sigue la secuencia de 4 etapas para completar tu recorrido y validar tus tiempos oficiales:
            </p>
          </div>

          {/* Grid de 4 Checkpoints */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Checkpoint 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md relative flex flex-col justify-between hover:shadow-lg hover:border-cyan-400 transition duration-200">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 font-mono font-black text-lg flex items-center justify-center mb-4">
                  01
                </div>
                <div className="flex items-center gap-2 mb-2 text-slate-800 font-bold text-lg">
                  <FaMobileAlt className="text-cyan-600" />
                  <h4>Inicia tu App</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Corre con la aplicación de tu preferencia (Nike Run Club, Strava, Garmin, Apple Fitness, etc.).
                </p>
              </div>
            </div>

            {/* Checkpoint 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md relative flex flex-col justify-between hover:shadow-lg hover:border-greenCustom transition duration-200">
              <div>
                <div className="w-10 h-10 rounded-xl bg-lime-100 text-lime-800 font-mono font-black text-lg flex items-center justify-center mb-4">
                  02
                </div>
                <div className="flex items-center gap-2 mb-2 text-slate-800 font-bold text-lg">
                  <FaCamera className="text-greenCustom" />
                  <h4>Guarda Evidencia</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Al terminar tu ruta (3 km o 5 km), toma una captura de pantalla clara de la app con tu distancia y tiempo.
                </p>
              </div>
            </div>

            {/* Checkpoint 3 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md relative flex flex-col justify-between hover:shadow-lg hover:border-yellowCustom transition duration-200">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-mono font-black text-lg flex items-center justify-center mb-4">
                  03
                </div>
                <div className="flex items-center gap-2 mb-2 text-slate-800 font-bold text-lg">
                  <FaCheckCircle className="text-yellowCustom" />
                  <h4>Sube Resultados</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Inicia sesión en este sitio web, ingresa tus tiempos y adjunta la captura de evidencia antes de las 2:00 PM.
                </p>
              </div>
            </div>

            {/* Checkpoint 4 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md relative flex flex-col justify-between hover:shadow-lg hover:border-redCustom transition duration-200">
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 font-mono font-black text-lg flex items-center justify-center mb-4">
                  04
                </div>
                <div className="flex items-center gap-2 mb-2 text-slate-800 font-bold text-lg">
                  <FaMedal className="text-redCustom" />
                  <h4>Podio & Premios</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Se premiará a los 3 primeros lugares de cada categoría. Los resultados oficiales se publicarán el martes 18 de noviembre.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. SECCIÓN #reglamento: REGLAMENTO OFICIAL DEL CORREDOR    */}
      {/* ========================================================= */}
      <section id="reglamento" className="scroll-mt-24 py-16 px-4 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl relative overflow-hidden">

          <div className="text-center mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-800 bg-cyan-100 px-3 py-1 rounded-full">
              Bases del Evento
            </span>
            <h3 className="font-black text-2xl sm:text-3xl text-slate-800 tracking-tight mt-2">
              Notas Importantes & Reglamento
            </h3>
            <p className="text-slate-500 text-sm mt-1">Lineamientos oficiales para validar tu participación</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <FaCheckCircle className="text-sm" />
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                La edad mínima para participar es de <strong className="text-slate-900">18 años cumplidos al 31 de octubre de 2026</strong>.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <FaCheckCircle className="text-sm" />
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                La categoría oficial será determinada por la edad que tendrá el competidor al <strong className="text-slate-900">31 de octubre de 2026</strong>.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <FaCheckCircle className="text-sm" />
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                Participan colaboradores y pueden invitar a correr hasta <strong className="text-slate-900">5 familiares mayores de edad</strong>.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <FaCheckCircle className="text-sm" />
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                Registro y participación de la carrera exclusivamente en <strong className="text-slate-900">modalidad virtual</strong>.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. FOOTER CALL TO ACTION (LÍNEA DE META / REGISTRO)       */}
      {/* ========================================================= */}
      <footer id="registro" className="scroll-mt-24 pb-16 pt-6 px-4 text-center border-t border-slate-200 bg-white">
        <div className="max-w-3xl mx-auto bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <FaFlagCheckered className="text-2xl" />
          </div>
          <h3 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight mb-2">
            ¡Inscríbete y Cruza la Meta!
          </h3>
          <p className="text-slate-600 text-sm sm:text-base mb-8 max-w-md mx-auto">
            Asegura tu lugar en la carrera y comparte tus mejores tiempos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="w-full sm:w-auto">
              <div className="bg-gradient-to-r from-redCustom to-rose-600 hover:from-rose-600 hover:to-redCustom text-white font-extrabold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer w-full">
                <Image src="/tennis.png" width={30} height={30} alt="Icono tenis" className="mr-3 brightness-0 invert" />
                <span className="text-base sm:text-lg">Regístrate AQUÍ para la carrera</span>
              </div>
            </Link>

            <Link href="/login" className="w-full sm:w-auto">
              <div className="bg-gradient-to-r from-blueCustom to-cyan-600 hover:from-cyan-600 hover:to-blueCustom text-white font-extrabold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer w-full">
                <Image src="/tennis.png" width={30} height={30} alt="Icono tenis" className="mr-3 brightness-0 invert" />
                <span className="text-base sm:text-lg">Inicia Sesión</span>
              </div>
            </Link>
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-10 font-mono tracking-wider">
          RUNNERS • 5ta Carrera por el Servicio • Área México • 2026
        </p>
      </footer>

    </div>
  );
};

export default Home;
