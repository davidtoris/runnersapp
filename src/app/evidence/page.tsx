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

  const { evidence, photo, evidenceLoading, photoLoading } = useSelector((state : RootState) => state.imagesData)
  const { userItem } = useSelector((state : RootState) => state.userData)
  const { userStatus } = useSelector((state : RootState) => state.userData)

  console.log(userStatus)

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

          <div className='flex'>
            <div>
              {!evidence.imagen && userItem?.imgEvidence && (
                <>
                  <img src={userItem?.imgEvidence} width={200} className='m-auto pt-5'/>
                  <div className='m-auto pb-5 font-bold text-greenCustom text-2xl mt-2'>Evidencia</div>
                </>
              )}
              
              {evidence.imagen && (
                <>
                  <img src={evidence.imagen} width={200} className='m-auto py-5'/>
                  <div className='m-auto pb-5 font-bold text-greenCustom text-xl'>Nueva Evidencia</div>
                </>
              )}

              <input type="file" onChange={(e) => handleEvidence(e)} />

              <div className='bg-redCustom text-white w-12/12 text-center m-auto font-extrabold p-3 rounded-md flex items-center justify-center hover:scale-105 transition transform duration-200 cursor-pointer mt-6' onClick={uploadEvidence}>
                {evidenceLoading ? ( <Loader />) : 'Subir evidencia'}
              </div>
            </div>

            <div className='ml-5'>
              {!photo.imagen && userItem?.imgPhoto && (
                <>
                  <img src={userItem?.imgPhoto} width={200} className='m-auto pt-5'/>
                  <div className='m-auto pb-5 font-bold text-greenCustom text-2xl mt-2'>Fotos de la Carrera</div>
                </>
              )}
              
              {photo.imagen && (
                <>
                  <img src={photo.imagen} width={200} className='m-auto py-5'/>
                  <div className='m-auto pb-5 font-bold text-greenCustom text-xl'>Nueva Foto de la Carrera</div>
                </>
              )}

              <input type="file" onChange={(e) => handlePhoto(e)} />

              <div className='bg-blueCustom text-white w-12/12 text-center m-auto font-extrabold p-3 rounded-md flex items-center justify-center hover:scale-105 transition transform duration-200 cursor-pointer mt-6' onClick={uploadPhoto}>
                {photoLoading ? ( <Loader />) : 'Subir Foto'}
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Evidence