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

  const columnHelper = createColumnHelper<User>()

  const columns = [
    columnHelper.accessor('nombre', {
      header: () => 'nombre',
    }),
    columnHelper.accessor('apellido', {
      header: () => 'apellido',
    }),
    columnHelper.accessor('numRunner', {
      header: () => 'numero',
    }),
  ]

  const winnersArray: any = winners?.users || [];

  const table = useReactTable({
    data: winnersArray,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

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
        <table className="w-8/12">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                <th className='px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Num</th>
                {headerGroup.headers.map(header => (
                  <th className='px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider' key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row,i) => (
              <tr key={row.id}>
                <td>{i+1}</td>
                {row.getVisibleCells().map(cell => (
                  <>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                  </>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </>
      )}
    </>
  )
}

export default Winners