'use client'
import React, { useEffect, useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/store'
import Cookies from "js-cookie"
import { User } from '@/store/slices/user/userInterface'
import { getWinners } from '@/store/slices/winners/winnersService'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { validateToken } from '@/store/slices/auth/authService'


const Winners = () => {
  const token = Cookies.get('tokenUser')
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { winners } = useSelector((state : RootState) => state.winnersData)

  const [genero, setGenero] = useState('M')
  const [edad, setEdad] = useState('1')
  const [kms, setKms] = useState('3')

  useEffect(() => {
    if (token) {
      dispatch(getWinners(genero, kms, edad, token))
    }
  }, [genero, edad, kms])

  useEffect(() => {
    if (token) {
      dispatch(validateToken(token))
    } else {
      router.push("/login")
    }
  }, [])

  console.log(winners?.users)

  return (
    <>

      <Link href="/">
        <Image
        className='flex justify-center m-auto' 
        src='/logo.png' 
        width={600}
        height={500}
        alt="Picture of the author"
        />
      </Link>
      <div className='flex w-12/12 md:w-8/12 m-auto py-8'>
        <select name="genero" id="" onChange={(e) => setGenero(e.target.value)}>
          <option value='M'>Mujeres</option>
          <option value='H'>Hombres</option>
        </select>
        <select name="edad" id="" className='mx-5' onChange={(e) => setEdad(e.target.value)}>
          <option value='1'>18-39</option>
          <option value='2'>40-49</option>
          <option value='3'>50 y más</option>
        </select>
        <select name="kms" id="" onChange={(e) => setKms(e.target.value)}>
          <option value='3'>3 kms</option>
          <option value='5'>5 kms</option>
        </select>
      </div>

      {(
        <>
        <div className='flex justify-center mb-6 font-extrabold text-lg'><span>{winners?.total} corredores en esta categoría</span> </div>
        <div className='flex justify-center'>
        <table id="table-to-xls" className="table-auto max-w-7xl mx-auto pb-10 mt-8">
        <thead>
          <tr>
            <th className='font-bold text-xl bg-blueCustom p-2 text-white'>Nombre</th>
            <th className='font-bold text-xl bg-blueCustom p-2 text-white'>Número de Corredor</th>
            
            {/* <th className='font-bold text-xl bg-blueCustom p-2 text-white'>Tiempo</th>
            <th className='font-bold text-xl bg-blueCustom p-2 text-white'>Tiempo Total</th> */}
            {/* <th className='font-bold text-xl bg-blueCustom p-2 text-white'>Evidencia</th>
            <th className='font-bold text-xl bg-blueCustom p-2 text-white'>Foto</th>
            <th className='font-bold text-xl bg-blueCustom p-2 text-white'>Depto</th>
            <th className='font-bold text-xl bg-blueCustom p-2 text-white'>Tipo</th>
            <th className='font-bold text-xl bg-blueCustom p-2 text-white'>OtroDepto</th> */}
            <th className='font-bold text-xl bg-blueCustom p-2 text-white'>Estado</th>
          </tr>
        </thead>
        <tbody>
          {winners?.users.length && winners?.users.map((s : any) => (
            
              <tr className='border-2 text-center' key={s._id}>
              
                <td className='border-2 p-2'>{`${s.nombre} ${s.apellido}`}</td>
                <td className='border-2 p-2'>{s.numRunner}</td>
                {/* <td className='border-2 p-2'>{s.time}</td>
                <td className='border-2 p-2'>{s.timeNumber}</td> */}
                {/* <td className='border-2 p-2'><img src={s.imgEvidence} width={200}/></td>
                <td className='border-2 p-2'><img src={s.imgPhoto} width={200}/></td>
                <td className='border-2 p-2'>{s.depto}</td>
                <td className='border-2 p-2'>{s.tipo}</td>
                <td className='border-2 p-2'>{s.otroDepto}</td> */}
                <td className='border-2 p-2'>{s.estado === null ? 'CDMX' : s.estado}</td>
                
              </tr> 
            )
          )}
        </tbody>
      </table>
        </div>
        </>
      )}
    </>
  )
}

export default Winners