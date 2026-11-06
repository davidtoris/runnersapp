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
import { NumberFunc } from '../helper/Number'

const Runners = () => {
  const token = Cookies.get('tokenUser')
  const dispatch = useAppDispatch();

  const { users } = useSelector((state: RootState) => state.userData)
  console.log(users);

  useEffect(() => {
    if (token) {
      dispatch(getUsers(token))
    }
  }, [])

  const columnHelper = createColumnHelper<User>()

  const columns = [
    columnHelper.accessor('numColaborador', {
      header: () => 'Num · Kms',
      cell: info => {
        const row = info.row.original as User;
        return (
          <div className="flex flex-col">
            <div className="">{row.kms}-{NumberFunc(row.numRunner)}</div>
          </div>
        );
      },
    }),
    columnHelper.accessor('nombre', {
      header: () => 'nombre',
    }),
    columnHelper.accessor('apellido', {
      header: () => 'apellido',
    }),
    columnHelper.accessor('time', {
      header: () => 'tiempo',
    }),
    columnHelper.accessor('imgEvidence', {
      header: () => 'evidencia',
      cell: info => {
        const imgUrl = info.getValue()
        return imgUrl ? (
          <a
            href={imgUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Ver imagen completa"
            className="inline-block"
          >
            <img
              src={imgUrl}
              alt="Evidencia"
              className="w-16 h-16 min-w-[4rem] object-cover rounded border border-gray-300 hover:opacity-80 transition-opacity shadow-sm"
            />
          </a>
        ) : (
          <span className="text-gray-400 italic text-xs">Sin evidencia</span>
        )
      },
    }),
    columnHelper.accessor('imgPhoto', {
      header: () => 'foto',
      cell: info => {
        const imgUrlPhoto = info.getValue()
        return imgUrlPhoto ? (
          <a
            href={imgUrlPhoto}
            target="_blank"
            rel="noopener noreferrer"
            title="Ver imagen completa"
            className="inline-block"
          >
            <img
              src={imgUrlPhoto}
              alt="Photo"
              className="w-16 h-16 min-w-[4rem] object-cover rounded border border-gray-300 hover:opacity-80 transition-opacity shadow-sm"
            />
          </a>
        ) : (
          <span className="text-gray-400 italic text-xs">Sin foto</span>
        )
      },
    }),
    columnHelper.accessor('timeNumber', {
      header: () => 'tiempo Número',
    }),
    columnHelper.accessor('correo', {
      header: () => 'correo',
    }),
    columnHelper.accessor('modalidad', {
      header: () => 'modalidad',
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
    // columnHelper.accessor('direccion', {
    //   header: 'dirección',
    // }),
    // columnHelper.accessor('ciudad', {
    //   header: 'ciudad',
    // }),
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
          <div className="w-full max-w-[95%] mx-auto px-2 pb-12">
            <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 bg-white">
                <thead className="bg-gray-50">
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      <th className="px-6 py-3 text-left text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Num
                      </th>
                      {headerGroup.headers.map(header => (
                        <th
                          className="px-6 py-3 text-left text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                          key={header.id}
                        >
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
                <tbody className="divide-y divide-gray-200 bg-white">
                  {table.getRowModel().rows.map((row, i) => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 border-b border-gray-200">
                        {i}
                      </td>
                      {row.getVisibleCells().map(cell => (
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-b border-gray-200"
                          key={cell.id}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Runners