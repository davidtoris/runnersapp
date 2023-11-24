'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { saveTime, showOneUser, uploadEvidenceService, uploadPhotoService } from '@/store/slices/user/userService';
import { RootState, useAppDispatch } from '@/store';
import Cookies from "js-cookie"
import { useSelector } from 'react-redux';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';
import { userRespFunc } from '@/store/slices/user/userSlice';
import { validateToken } from '@/store/slices/auth/authService';

const Evidence = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = Cookies.get('tokenUser')
  const userData = Cookies.get('user')
  
  const [idUser, setIdUser] = useState('')

  const { evidence, photo, evidenceLoading, photoLoading, errorEvidence, errorPhoto } = useSelector((state : RootState) => state.imagesData)
  const { userItem, userResp } = useSelector((state : RootState) => state.userData)

  useEffect(() => {
    userResp === 'evidence' && router.push("/home")
    dispatch(userRespFunc(''))
  }, [userResp])

  useEffect(() => {
    if (token) {
      dispatch(validateToken(token))
    } else {
      router.push("/login")
    }
  }, [])

  useEffect(() => {
    if (userData && token) {
      const user = JSON.parse(userData);
      const idUser = user._id;
      setIdUser(user._id);
      dispatch(showOneUser(idUser, token))
    }
  }, [])

  const [selectedEvidence, setSelectedEvidence] = useState<string | Blob>('');
  const [selectedPhoto, setSelectedPhoto] = useState<string | Blob>('');
  const [hours, setHours] = useState<any>('')
  const [minutes, setMinutes] = useState<any>('')
  const [seconds, setSeconds] = useState<any>('')
  const [errorHours, setErrorHours] = useState(true)
  const [errorMinutes, setErrorMinutes] = useState(true)
  const [errorSeconds, setErrorSeconds] = useState(true)
  const [errorEvidenceState, setErrorEvidence] = useState(true)
  const [errorPhotoState, setErrorPhoto] = useState(true)
  const [errorSize, setErrorSize] = useState(false)

  const handleEvidence = (e : any) => {
    setErrorEvidence(false)
    setSelectedEvidence(e.target.files[0])
  } 
  
  const handlePhoto = (e : any) => {
    setErrorPhoto(false)
    setSelectedPhoto(e.target.files[0])
  } 

  const changeHours = (e:any) => {
    const hours = e.target.value;
    if(hours.length === 1){
      setHours(`0${hours}`)
    } else {
      setHours(hours)
    }
  }

  const changeMinutes = (e:any) => {
    const minutes = e.target.value;
    if(minutes.length === 1){
      setMinutes(`0${minutes}`)
    } else {
      setMinutes(minutes)
    }
  } 

  const changeSeconds = (e:any) => {
    const seconds = e.target.value;
    if(seconds.length === 1){
      setSeconds(`0${seconds}`)
    } else {
      setSeconds(seconds)
    }
  }

  const handleSave = () =>{

    if (token) {
      if(selectedEvidence !== '') {
        console.log('entroEvidence')
        const formData = new FormData();
        formData.append('image', selectedEvidence);
        dispatch(uploadEvidenceService(formData, token, 'imgEvidence'))
      }

      if(selectedPhoto !== '') {
        console.log('entroPhoto')
        const formData = new FormData();
        formData.append('image', selectedPhoto);
        dispatch(uploadPhotoService(formData, token, 'imgPhoto'))
      }

      const timeNumber = (hours * 3600) + (minutes * 60) + seconds;
      const data = {
        time: `${hours}:${minutes}:${seconds}`,
        timeNumber
      }
      dispatch(saveTime(data, token));
    }
  }

  useEffect(() => {
    userItem?.imgEvidence && setErrorEvidence(false)
    userItem?.imgPhoto && setErrorPhoto(false)
  }, [])
  

  useEffect(() => {
    console.log({hours, minutes, seconds})
    hours === '' ? setErrorHours(true) : setErrorHours(false);
    minutes === '' ? setErrorMinutes(true) : setErrorMinutes(false);
    seconds === '' ? setErrorSeconds(true) : setErrorSeconds(false);
    errorPhoto === 413 ? setErrorSize(true) : setErrorSize(false);
    console.log({errorHours, errorMinutes, errorSeconds})
  }, [hours, minutes, seconds])
  
  
  

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
            Sube la evidencia de tu resultado de la app y sube tu fotografía de tu experiencia de la carrera, estas 
            <span className='font-bold'> deben pesar máximo (5Mb)</span>. Recuerda que el Lunes podrás revisar los ganadores por categoría.
          </div>

          <div className='label mt-5'>Tiempo de la carrera<span className='font-light ml-2'></span></div>
          <div className='flex text-center m-auto mb-10'>
            <div>
              Horas
              <input type="number" name="hours" className='text-center' onChange={changeHours} />
              {errorHours && (<div className='text-redCustom'>*Campo obligatorio</div>)}
            </div>
            <div className='mx-2'>
              * Minutos
              <input type="number" name="minutes" className='text-center' onChange={changeMinutes} />
              {errorMinutes && (<div className='text-redCustom'>*Campo obligatorio</div>)}
            </div>
            <div>
              Segundos
              <input type="number" name="seconds" className='text-center' onChange={changeSeconds}/>
              {errorSeconds && (<div className='text-redCustom'>*Campo obligatorio</div>)}
            </div>
          </div>

          <div className='flex flex-col md:flex-row m-auto'>
            <div className='bg-gray-100 p-2 rounded-md shadow-md'>
              <div className='m-auto font-bold text-blueCustom text-3xl mt-2'>Foto de la Evidencia</div>
              {!evidence.imagen && userItem?.imgEvidence && (
                <>
                  <img src={userItem?.imgEvidence} width={200} className='m-auto py-5'/>
                </>
              )}
              
              {evidence.imagen && (
                <>
                  <img src={evidence.imagen} width={200} className='m-auto py-5'/>
                </>
              )}
              <input type="file" onChange={(e) => handleEvidence(e)} className='p-1' />
              {errorEvidenceState && (<div className='text-redCustom'>*Campo obligatorio</div>)}
              {errorEvidence === 413 && ( <div className='text-redCustom'>La foto pesa más de 5Mb</div> )}
            </div>

            <div className='bg-gray-100 p-2 rounded-md shadow-md mt-6 md:mt-0 ml-0 md:ml-8'>
            <div className='m-auto pb-5 font-bold text-greenCustom text-3xl mt-2'>Foto de la Carrera</div>
              {!photo.imagen && userItem?.imgPhoto && (
                <>
                  <img src={userItem?.imgPhoto} width={200} className='m-auto pb-5'/>
                </>
              )}
              
              {photo.imagen && (
                <>
                  <img src={photo.imagen} width={200} className='m-auto py-5'/>
                </>
              )}

              <input type="file" onChange={(e) => handlePhoto(e)} />
              {errorPhotoState && (<div className='text-redCustom'>*Campo obligatorio</div>)}
              {errorPhoto === 413 && ( <div className='text-redCustom'>La foto pesa más de 5Mb</div> )}
            </div>
          </div>

          <button className='bg-redCustom text-white w-12/12 text-center m-auto font-extrabold p-3 rounded-md flex items-center justify-center hover:scale-105 transition transform duration-200 cursor-pointer mt-6 disabled:bg-gray-300'
          disabled={errorHours || errorMinutes || errorSeconds || errorEvidenceState || errorPhotoState || errorSize}
          onClick={handleSave}
            >
            {(photoLoading || evidenceLoading) ? ( <Loader />) : 'Guardar resultados'}
          </button>
        </div>

      </div>
    </>
  )
}

export default Evidence