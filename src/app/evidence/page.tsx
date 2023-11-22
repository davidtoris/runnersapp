'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { showOneUser, uploadEvidenceService, uploadPhotoService } from '@/store/slices/user/userService';
import { RootState, useAppDispatch } from '@/store';
import Cookies from "js-cookie"
import { useSelector } from 'react-redux';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';

const Evidence = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = Cookies.get('tokenUser')
  const userData = Cookies.get('user')
  
  const [idUser, setIdUser] = useState('')

  const { evidence, photo, evidenceLoading, photoLoading, statusCode } = useSelector((state : RootState) => state.imagesData)
  const { userItem } = useSelector((state : RootState) => state.userData)
  const { userStatus } = useSelector((state : RootState) => state.userData)

  useEffect(() => {
    if ( userStatus === 401 ) {
      router.push("/login")
    }
  }, [userStatus])
  

  const [selectedEvidence, setSelectedEvidence] = useState<string | Blob>('');
  const [selectedPhoto, setSelectedPhoto] = useState<string | Blob>('');

  const handleEvidence = (e : any) => setSelectedEvidence(e.target.files[0])
  const handlePhoto = (e : any) => setSelectedPhoto(e.target.files[0])

  const uploadEvidence = () => {
    const formData = new FormData();
     formData.append('image', selectedEvidence);
     if (token) {
      dispatch(uploadEvidenceService(formData, token, 'imgEvidence'))
    }
  }

  const uploadPhoto = () => {
    const formData = new FormData();
     formData.append('image', selectedPhoto);
     if (token) {
      dispatch(uploadPhotoService(formData, token, 'imgPhoto'))
    }
  }

  useEffect(() => {
    if (userData && token) {
      const user = JSON.parse(userData);
      const idUser = user._id;
      setIdUser(user._id);
      dispatch(showOneUser(idUser, token))
    }
  }, [])

  return (
    <>
      <div className='flex justify-center items-center h-screen text-center'>
        <div className='flex justify-center flex-col pb-5 m-auto'>
          <Image 
          src='/logo.png' 
          width={650}
          height={230}
          alt="Picture of the author"
          className='m-auto'
          />

          <div className='text-center py-6 w-11/12 md:w-8/12 m-auto text-md text-gray-800 md:text-lg'>
            Para subir tu evidencia y foto de la carrera primero selecciona la <span className='font-bold'>imagen de máximo (5Mb) de tamaño</span> y después de click en el botón de Subir. Recuerda que el Lunes podrás revisar los ganadores por categoría
          </div>

          <div className='label mt-5'>Tiempo de la carrera<span className='font-light ml-2'></span></div>
          <div className='flex text-center m-auto mb-10'>
            <div>
              Horas
              <input type="number" name="hours" className='text-center' />
            </div>
            <div className='mx-2'>
              Minutos
              <input type="number" name="minutes" className='text-center'/>
            </div>
            <div>
              Segundos
              <input type="number" name="seconds" className='text-center'/>
            </div>
          </div>

          <div className='flex flex-col md:flex-row m-auto'>
            <div className='bg-gray-100 p-2 rounded-md shadow-md'>
              {statusCode}
              {!evidence.imagen && userItem?.imgEvidence && (
                <>
                  <div className='m-auto font-bold text-blueCustom text-3xl mt-2'>Evidencia</div>
                  <img src={userItem?.imgEvidence} width={200} className='m-auto py-5'/>
                </>
              )}
              
              {evidence.imagen && (
                <>
                  <img src={evidence.imagen} width={200} className='m-auto py-5'/>
                  <div className='m-auto pb-5 font-bold text-greenCustom text-xl'>Nueva Evidencia</div>
                </>
              )}

              <input type="file" onChange={(e) => handleEvidence(e)} className='p-1' />
              
              
              <div className='bg-blueCustom text-white w-12/12 text-center m-auto font-extrabold p-3 rounded-md flex items-center justify-center hover:scale-105 transition transform duration-200 cursor-pointer mt-6' onClick={uploadEvidence}>
                {evidenceLoading ? ( <Loader />) : 'Subir evidencia'}
              </div>
              
              {statusCode === 413 && ( <div className='text-redCustom'>La foto pesa más de 5Mb</div> )}

            </div>

            <div className='bg-gray-100 p-2 rounded-md shadow-md mt-6 md:mt-0 ml-0 md:ml-8'>
              {statusCode}
              {!photo.imagen && userItem?.imgPhoto && (
                <>
                  <div className='m-auto pb-5 font-bold text-greenCustom text-3xl mt-2'>Foto de la Carrera</div>
                  <img src={userItem?.imgPhoto} width={200} className='m-auto pb-5'/>
                </>
              )}
              
              {photo.imagen && (
                <>
                  <img src={photo.imagen} width={200} className='m-auto py-5'/>
                  <div className='m-auto pb-5 font-bold text-greenCustom text-xl'>Nueva Foto de la Carrera</div>
                </>
              )}

              <input type="file" onChange={(e) => handlePhoto(e)} />
              {statusCode === 413 && ( <div className='text-redCustom'>La foto pesa más de 5Mb</div> )}

              <div className='bg-greenCustom text-white w-12/12 text-center m-auto font-extrabold p-3 rounded-md flex items-center justify-center hover:scale-105 transition transform duration-200 cursor-pointer mt-6' onClick={uploadPhoto}>
                {photoLoading ? ( <Loader />) : 'Subir Foto'}
              </div>
            </div>
          </div>

          <div className='bg-redCustom text-white w-12/12 text-center m-auto font-extrabold p-3 rounded-md flex items-center justify-center hover:scale-105 transition transform duration-200 cursor-pointer mt-6' onClick={uploadPhoto}>
                {photoLoading ? ( <Loader />) : 'Guardar resultados'}
              </div>
        </div>

      </div>
    </>
  )
}

export default Evidence