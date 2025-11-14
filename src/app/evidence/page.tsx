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

  // refs para ambos editors
  const editorRef = useRef<EditorHandle | null>(null); // para foto de la carrera
  const evidenceEditorRef = useRef<EditorHandle | null>(null); // para foto de la evidencia

  // flags que indican si el editor local tiene imagen (antes de subir)
  const [evidenceEditorHasImage, setEvidenceEditorHasImage] = useState(false);
  const [raceEditorHasImage, setRaceEditorHasImage] = useState(false);

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

  const [hours, setHours] = useState<any>('')
  const [minutes, setMinutes] = useState<any>('')
  const [seconds, setSeconds] = useState<any>('')
  const [errorHours, setErrorHours] = useState(true)
  const [errorMinutes, setErrorMinutes] = useState(true)
  const [errorSeconds, setErrorSeconds] = useState(true)
  const [errorEvidenceState, setErrorEvidence] = useState(true)
  const [errorPhotoState, setErrorPhoto] = useState(true)
  const [errorSize, setErrorSize] = useState(false)

  // handlers simples — no añaden ceros (permiten "045")
  const changeHours = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, ''); // solo dígitos
    setHours(raw);
  };

  const changeMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 2); // limitar a 2 dígitos
    setMinutes(raw);
  };

  const changeSeconds = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 2);
    setSeconds(raw);
  };

  const normalizePart = (raw: string, clamp59 = false) => {
    const digits = (raw ?? '').toString().replace(/\D/g, '');
    if (digits === '') return '00';
    let n = Number(digits);
    if (clamp59) n = Math.max(0, Math.min(59, n));
    return String(n).padStart(2, '0');
  };

  const handleSave = async () => {
    if (!token) return;

    // ---------- EVIDENCE (editor) ----------
    if (evidenceEditorRef.current && typeof evidenceEditorRef.current.exportImage === 'function') {
      try {
        console.log('Exportando imagen desde EvidenceEditor (evidence)...');
        const evidenceImg = await evidenceEditorRef.current.exportImage();
        if (evidenceImg) {
          console.log('Archivo evidence recibido, subiendo...');
          const fd = new FormData();
          fd.append('image', evidenceImg as Blob);
          dispatch(uploadEvidenceService(fd, token, 'imgEvidence'));
        } else {
          console.log('No hay imagen en EvidenceEditor (evidence).');
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error exportEvidence:', err);
      }
    } else {
      console.log('evidenceEditorRef no disponible o exportImage no implementado.');
    }

    // ---------- RACE PHOTO (editor) ----------
    if (editorRef.current && typeof editorRef.current.exportImage === 'function') {
      try {
        console.log('Exportando imagen desde EvidenceEditor (race)...');
        const raceImg = await editorRef.current.exportImage();
        if (raceImg) {
          console.log('Archivo race recibido, subiendo...');
          const fd2 = new FormData();
          fd2.append('image', raceImg as Blob);
          dispatch(uploadPhotoService(fd2, token, 'imgPhoto'));
        } else {
          console.log('No hay imagen en EvidenceEditor (race).');
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error exportRace:', err);
      }
    } else {
      console.log('editorRef no disponible o exportImage no implementado.');
    }

    // ---------- GUARDAR TIEMPO ----------
    const hh = normalizePart(hours, false);
    const mm = normalizePart(minutes, true);
    const ss = normalizePart(seconds, true);

    setHours(hh);
    setMinutes(mm);
    setSeconds(ss);

    const timeNumber = (Number(hh) * 3600) + (Number(mm) * 60) + Number(ss);
    const data = { time: `${hh}:${mm}:${ss}`, timeNumber };
    dispatch(saveTime(data, token));
  }

  useEffect(() => {
    const hasEvidenceFromUser = !!(userItem?.imgEvidence && userItem.imgEvidence !== '');
    const hasEvidenceFromState = !!(evidence?.imagen && evidence.imagen !== '');
    const hasEvidence = hasEvidenceFromUser || hasEvidenceFromState || evidenceEditorHasImage;

    const hasPhotoFromUser = !!(userItem?.imgPhoto && userItem.imgPhoto !== '');
    const hasPhotoFromState = !!(photo?.imagen && photo.imagen !== '');
    const hasPhoto = hasPhotoFromUser || hasPhotoFromState || raceEditorHasImage;

    setErrorEvidence(!hasEvidence);
    setErrorPhoto(!hasPhoto);

    // debug
    // console.log('validación imágenes ->', { hasEvidence, hasPhoto, evidenceEditorHasImage, raceEditorHasImage });
  }, [userItem, evidence, photo, evidenceEditorHasImage, raceEditorHasImage]);

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

  
  useEffect(() => {
    // si userItem.time existe y no es cadena vacía, parseamos HH:MM:SS
    if (userItem?.time && typeof userItem.time === 'string' && userItem.time.trim() !== '') {
      const parts = userItem.time.split(':'); // espera "HH:MM:SS"
      const [h = '00', m = '00', s = '00'] = parts;
      setHours(h.padStart(2, '0'));
      setMinutes(m.padStart(2, '0'));
      setSeconds(s.padStart(2, '0'));

      // actualizar validaciones si quieres (opcional)
      setErrorHours(false);
      setErrorMinutes(false);
      setErrorSeconds(false);
    }
    // si no hay userItem.time no hacemos nada (los inputs quedan vacíos y editables)
  }, [userItem]);

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

          <div className='label mt-5 text-xl'>Tiempo de la carrera</div>
          <div className='flex justify-center text-center ml-[15%] mb-10  w-[70%]'>
            <div className='flex flex-col items-center '>
              Horas
              <input
                type="text"
                name="hours"
                className='text-center p-1 w-[80%]'
                onChange={changeHours}
                value={hours}
                min={0}
                max={99}
              />
              {errorHours && ( <div className='text-redCustom'>*Campo obligatorio</div>)}
            </div>

            <div className='flex flex-col items-center '>
              Minutos
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={2}
                name="minutes"
                className='text-center p-1 w-[80%]'
                onChange={changeMinutes}
                value={minutes}
                min={0}
                max={59}
              />
              {errorMinutes && ( <div className='text-redCustom'>*Campo obligatorio</div>)}
            </div>

            <div className='flex flex-col items-center '>
              Segundos
              <input
                type="text"
                name="seconds"
                className='text-center p-1 w-[80%]'
                onChange={changeSeconds}
                value={seconds}
                min={0}
                max={59}
              />
              {errorSeconds && ( <div className='text-redCustom'>*Campo obligatorio</div>)}
            </div>
          </div>

          <div className='flex flex-col md:flex-row m-auto'>
            <div className='bg-gray-100 p-2 rounded-md shadow-md'>
              <div className='m-auto font-bold text-blueCustom text-3xl mt-2'>Foto de la Evidencia</div>
              <div className='text-sm -mt-1 text-gray-800 mb-2 italic'>Imagen de máximo (5Mb) de peso</div>
              {errorEvidenceState && (
                <div className='text-redCustom mt-2'>*Campo obligatorio</div>
              )}

              <div className='p-5'>
                {/* Evidence editor para la evidencia */}
                <EvidenceEditor ref={evidenceEditorRef} onHasImage={setEvidenceEditorHasImage} />
              </div>

              {!evidence.imagen && userItem?.imgEvidence && (
                <img src={userItem?.imgEvidence} width={200} className='m-auto py-5' alt="evidence" />
              )}
              
              {evidence.imagen && (
                <img src={evidence.imagen} width={200} className='m-auto py-5' alt="evidence preview" />
              )}

            </div>

            <div className='bg-gray-100 p-2 rounded-md shadow-md mt-6 md:mt-0 ml-0 md:ml-8'>
              <div className='m-auto font-bold text-greenCustom text-3xl mt-2'>Foto de la Carrera</div>
              <div className='text-sm -mt-1 text-gray-800 mb-2 italic'>Imagen de máximo (5Mb) de peso</div>
              {errorPhotoState && (
                <div className='text-redCustom mt-2'>*Campo obligatorio</div>
              )}              

              <div className='p-5'>
                <EvidenceEditor ref={editorRef} onHasImage={setRaceEditorHasImage} />
              </div>

              {!photo.imagen && userItem?.imgPhoto && (
                <img src={userItem?.imgPhoto} width={200} className='m-auto pb-5' alt="user photo" />
              )}
              
              {photo.imagen && (
                <img src={photo.imagen} width={200} className='m-auto py-5' alt="photo preview" />
              )}

              
            </div>
          </div>
          
          <div className='mt-6'>
          {(errorHours || errorMinutes || errorSeconds || errorEvidenceState || errorPhotoState) && (
            <div className='text-red-500 font-bold italic text-xs mb-2'>Revisa que todos los campos estèn llenos, y que hayas agregado las fotos de evidencia y de la carrera</div>
          )}
          <button className='bg-redCustom text-white w-12/12 text-center m-auto font-extrabold p-3 rounded-md flex items-center justify-center hover:scale-105 transition transform duration-200 cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed'
            disabled={errorHours || errorMinutes || errorSeconds || errorEvidenceState || errorPhotoState }
            onClick={handleSave}
            >
            {(photoLoading || evidenceLoading) ? ( <Loader />) : 'Guardar resultados y evidencias'}
          </button>
          </div>

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
