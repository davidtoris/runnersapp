// Evidence.tsx
'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import { saveTime, showOneUser, uploadEvidenceService, uploadPhotoService } from '@/store/slices/user/userService';
import { RootState, useAppDispatch } from '@/store';
import Cookies from "js-cookie"
import { useSelector } from 'react-redux';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';
import { userRespFunc } from '@/store/slices/user/userSlice';
import { validateToken } from '@/store/slices/auth/authService';
import { errorEvidenceFunc } from '@/store/slices/images/imagesSlice';
import EvidenceEditor from '../../components/EvidenceEditor';
import Modal from 'react-modal';

type EditorHandle = {
  exportImage: () => Promise<File | null>;
};

const Evidence = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = Cookies.get('tokenUser')
  const userData = Cookies.get('user')
  
  const [idUser, setIdUser] = useState('')
  const [ok, setOk] = useState('')

  const { evidence, photo, evidenceLoading, photoLoading, errorEvidence, errorPhoto } = useSelector((state : RootState) => state.imagesData)
  const { userItem, userResp } = useSelector((state : RootState) => state.userData)

  const editorRef = useRef<EditorHandle | null>(null);

  useEffect(() => {
    if (token) {
      dispatch(validateToken(token))
    } else {
      router.push("/login")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (userData && token) {
      const user = JSON.parse(userData);
      const idUser = user._id;
      setIdUser(user._id);
      dispatch(showOneUser(idUser, token))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // evidence (padre) sigue siendo input del padre
  const [selectedEvidence, setSelectedEvidence] = useState<File | Blob | null>(null);
  // ya no dependemos de selectedPhoto proveniente del input del padre:
  // el hijo exportará su imagen cuando el padre lo pida
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
    dispatch(errorEvidenceFunc(null))
    dispatch(userRespFunc(''))
    setOk('')
    setSelectedEvidence(e.target.files?.[0] ?? null)
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

  const handleSave = async () => {
    if (!token) return;

    // 1) subir evidencia del padre (input de evidencia)
    if (selectedEvidence) {
      console.log('Subiendo evidence (padre) ...');
      const formData = new FormData();
      formData.append('image', selectedEvidence as Blob);
      dispatch(uploadEvidenceService(formData, token, 'imgEvidence'));
    }

    // 2) pedir al hijo que exporte su canvas y subimos si existe
    if (editorRef.current && typeof editorRef.current.exportImage === 'function') {
      try {
        console.log('Pidiendo exportImage al hijo...');
        const fileFromChild = await editorRef.current.exportImage();
        if (fileFromChild) {
          console.log('Archivo recibido del hijo, subiendo...');
          const formData = new FormData();
          formData.append('image', fileFromChild as Blob);
          dispatch(uploadPhotoService(formData, token, 'imgPhoto'));
        } else {
          console.log('No hay imagen en el editor (hijo).');
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error exportImage desde hijo:', err);
      }
    } else {
      console.log('editorRef no disponible o exportImage no implementado.');
    }

    // 3) guardar tiempo (se hace independientemente)
    const timeNumber = (Number(hours || 0) * 3600) + (Number(minutes || 0) * 60) + Number(seconds || 0);
    const data = {
      time: `${hours}:${minutes}:${seconds}`,
      timeNumber
    };
    dispatch(saveTime(data, token));
  }

  useEffect(() => {
    userItem?.imgEvidence === '' ? setErrorEvidence(true) : setErrorEvidence(false)
    userItem?.imgPhoto === '' ? setErrorPhoto(true) : setErrorPhoto(false)
  }, [userItem])
  

  useEffect(() => {
    hours === '' ? setErrorHours(true) : setErrorHours(false);
    minutes === '' ? setErrorMinutes(true) : setErrorMinutes(false);
    seconds === '' ? setErrorSeconds(true) : setErrorSeconds(false);
    errorPhoto === 413 ? setErrorSize(true) : setErrorSize(false);
    errorEvidence === 413 ? setErrorSize(true) : setErrorSize(false);
  }, [hours, minutes, seconds, errorPhoto, errorEvidence, errorSize, userResp])
  
  const [modalIsOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (userResp === 'evidence') {
      if((errorEvidence === 200 || errorEvidence === null) && (errorPhoto === 200 || errorPhoto === null) && errorSize === false) {
        setIsOpen(true)
      }else{
        setOk('Verifica los errores')
      }
    }
  }, [userResp, errorEvidence, errorPhoto, errorSize])
  
  const regresar = () => {
    router.push("/home")
    dispatch(userRespFunc(''))
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  useEffect(() => {
    if(modalIsOpen){
      setTimeout(() => {
        router.back()
      }, 2000);
    }
  }, [modalIsOpen])

  
    

  return (
    <>
      <div className='flex justify-center items-center h-screen text-center p-2'>

      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Personaliza tu foto"
      >
        <div className=''>
          <div className='font-light text-xl text-gray-800 text-center mb-4'>
            Se han guardado con
            <span className='font-bold mx-2'>éxito</span>los tiempos y las evidencias
          </div>
          
          <div className='flex justify-center'>
            <button className='font-bold text-md flex justify-center bg-greenCustom text-white p-2 rounded-lg' onClick={() => setIsOpen(false)}>
              Cerrar
            </button>
          </div>
        </div>
      </Modal>

        <div className='flex justify-center flex-col pb-5 m-auto'>
          <Image 
            src='/logo.png' 
            width={300}
            height={230}
            alt="Picture of the author"
            className='m-auto'
          />

          <div className='label mt-5 text-xl' onClick={() => setIsOpen(true)}>Tiempo de la carrera</div>
          <div className='flex text-center m-auto mb-10'>
            <div>
              Horas
              <input type="number" name="hours" className='text-center p-1' onChange={changeHours} />
              {errorHours && ( <div className='text-redCustom'>*Campo obligatorio</div>)}
            </div>
            <div className='mx-2'>
              * Minutos
              <input type="number" name="minutes" className='text-center p-1' onChange={changeMinutes} />
              {errorMinutes && (<div className='text-redCustom'>*Campo obligatorio</div>)}
            </div>
            <div>
              Segundos
              <input type="number" name="seconds" className='text-center p-1' onChange={changeSeconds}/>
              {errorSeconds && (<div className='text-redCustom'>*Campo obligatorio</div>)}
            </div>
          </div>

          <div className='flex flex-col md:flex-row m-auto'>
            <div className='bg-gray-100 p-2 rounded-md shadow-md'>
              <div className='m-auto font-bold text-blueCustom text-3xl mt-2'>Foto de la Evidencia</div>
              <div className='text-sm -mt-1 text-gray-800 mb-2 italic'>Imagen de máximo (5Mb) de peso</div>
              {!evidence.imagen && userItem?.imgEvidence && (
                <img src={userItem?.imgEvidence} width={200} className='m-auto py-5' alt="evidence" />
              )}
              
              {evidence.imagen && (
                <img src={evidence.imagen} width={200} className='m-auto py-5' alt="evidence preview" />
              )}
              <input type="file" onChange={(e) => handleEvidence(e)} className='p-1' />
              {errorEvidenceState && (<div className='text-redCustom'>*Campo obligatorio</div>)}
              {errorEvidence === 413 && ( <div className='text-redCustom'>La foto pesa más de 5Mb</div> )}
            </div>

            <div className='bg-gray-100 p-2 rounded-md shadow-md mt-6 md:mt-0 ml-0 md:ml-8'>
              <div className='m-auto font-bold text-greenCustom text-3xl mt-2'>Foto de la Carrera</div>
              <div className='text-sm -mt-1 text-gray-800 mb-2 italic'>Imagen de máximo (5Mb) de peso</div>
              

              <div className='p-5'>
                <EvidenceEditor ref={editorRef} />
              </div>

              {!photo.imagen && userItem?.imgPhoto && (
                <img src={userItem?.imgPhoto} width={200} className='m-auto pb-5' alt="user photo" />
              )}
              
              {photo.imagen && (
                <img src={photo.imagen} width={200} className='m-auto py-5' alt="photo preview" />
              )}
            </div>
          </div>

          <button className='bg-redCustom text-white w-12/12 text-center m-auto font-extrabold p-3 rounded-md flex items-center justify-center hover:scale-105 transition transform duration-200 cursor-pointer mt-6 disabled:bg-gray-300'
            disabled={errorHours || errorMinutes || errorSeconds || errorEvidenceState  }
            onClick={handleSave}
          >
            {(photoLoading || evidenceLoading) ? ( <Loader />) : 'Guardar resultados'}
          </button>

          <div className='mt-3 text-center'>{ok}</div>
          
          <button className='bg-blueCustom text-white w-12/12 text-center m-auto font-extrabold p-3 rounded-md flex items-center justify-center hover:scale-105 transition transform duration-200 cursor-pointer mt-6 disabled:bg-gray-300'
            onClick={regresar}
          >
            Regresar
          </button>
        </div>

      </div>
    </>
  )
}

export default Evidence
