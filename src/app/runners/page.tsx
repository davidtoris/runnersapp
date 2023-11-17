'use client'
import React, { useEffect } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/store'
import Cookies from "js-cookie"
import { getUsers } from '@/store/slices/user/userService'
import { User } from '@/store/slices/user/userInterface'
import Exports from './Exports';

const Runners = () => {
  const token = Cookies.get('tokenUser')
  const dispatch = useAppDispatch();
  
  const { users } = useSelector((state : RootState) => state.userData)

  useEffect(() => {
    if (token) {
      dispatch(getUsers(token))
    }
  }, [])

  const columnHelper = createColumnHelper<User>()

  const columns = [
    columnHelper.accessor('nombre', {
      header: () => 'nombre',
    }),
    columnHelper.accessor('apellido', {
      header: () => 'apellido',
    }),
    columnHelper.accessor('correo', {
      header: () => 'correo',
    }),
    columnHelper.accessor('playera', {
      header: 'playera',
    }),
    columnHelper.accessor('tipo', {
      header: () => 'tipo',
    }),
    columnHelper.accessor('numColaborador', {
      header: 'num Colaborador',
    }),
    columnHelper.accessor('nombreFamiliar', {
      header: 'nombre Familiar',
    }),
    columnHelper.accessor('depto', {
      header: 'depto',
    }),
    columnHelper.accessor('otroDepto', {
      header: 'otro Depto',
    }),
    columnHelper.accessor('ubicacion', {
      header: 'ubicación',
    }),
    columnHelper.accessor('direccion', {
      header: 'dirección',
    }),
    columnHelper.accessor('ciudad', {
      header: 'ciudad',
    }),
    columnHelper.accessor('estado', {
      header: 'estado',
    }),
    columnHelper.accessor('edad', {
      header: 'edad',
    }),
    
    columnHelper.accessor('kms', {
      header: 'kms',
    }),
    columnHelper.accessor('genero', {
      header: 'género',
    }),
  ]

  const usersArray: any = users || [];

  const table = useReactTable({
    data: usersArray,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      {users && (
        <>
        <Exports users={users} />
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
                <td>{i}</td>
                {row.getVisibleCells().map(cell => (
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
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

export default Runners