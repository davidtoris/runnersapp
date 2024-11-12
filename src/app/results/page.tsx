'use client'

import React, { useEffect, useState } from 'react'
import { RootState, useAppDispatch } from '@/store';
import { useSelector } from 'react-redux';
import { getUsers } from '@/store/slices/user/userService';
import Cookies from "js-cookie"

const Results = () => {

  const token = Cookies.get('tokenUser')
  const dispatch = useAppDispatch();
  
  const { users } = useSelector((state : RootState) => state.userData)
  const [results, setResults] = useState<any>([])

  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (token) {
      dispatch(getUsers(token))
    }
  }, [])

  useEffect(() => {
    const userResults = users?.filter( (u:any) => u.imgPhoto)
    setResults(userResults);
  }, [users])
  


  return (
    <>
      {isClient && (
        <div>
          {results && (
            <div>
              <tbody>    
                {results?.filter( (u:any) => u.timeNumber !== '').map( (c:any) => (
                  <tr key={c.id} className=''>
                    <td className='border border-gray-200'>{c.nombre}</td>
                    <td className='border border-gray-200'>{c.apellido}</td>
                    <td className='border border-gray-200'>{c.time}</td>
                    <td className='border border-gray-200'>{c.timeNumber}</td>
                    <td className='border border-gray-200'>
                      <img src={c.imgEvidence} alt="" width={250}/>
                    </td>
                    <td className='border border-gray-200'>
                      <img src={c.imgPhoto} alt="" width={250}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </div>
          )}
        </div>
      )}

    </>
  )
}

export default Results