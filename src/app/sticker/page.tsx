'use client'
import React, { useEffect, useState, useRef } from 'react';
import { PiTrashLight } from "react-icons/pi";
import Modal from 'react-modal';
import { FaSave } from 'react-icons/fa';


const smallStickers = [
  '/logo-runners',
  '/sticker1',
  '/sticker2',
  '/sticker3',
  '/sticker4',
]

const backgroundStickers = [
  // '/fondo1.png', 
]

const EvidenceEditor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<any>(null);
  const [userImage, setUserImage] = useState<string>('');

  // Subir imagen del usuario
  const handleUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setUserImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Agregar fondo decorativo
  const addBackgroundSticker = (url: string) => {
    if (!fabricCanvas) return;
    const fabric = (window as any).fabric;
    fabric.Image.fromURL(url, (bg: any) => {
      bg.set({
        left: 50,
        top: 50,
        scaleX: 0.8,
        scaleY: 0.8,
        selectable: true,
        evented: true,
        perPixelTargetFind: true
      });
      bg.customType = 'background';
      fabricCanvas.add(bg);
      fabricCanvas.renderAll();
    });
  };

  // Agregar sticker pequeño
  const addSmallSticker = (url: string) => {
    if (!fabricCanvas) return;
    const fabric = (window as any).fabric;
    fabric.Image.fromURL(url, (sticker: any) => {
      sticker.set({
        left: 100,
        top: 100,
        scaleX: 0.2,
        scaleY: 0.2,
        selectable: true,
        evented: true,
        perPixelTargetFind: true
      });
      sticker.customType = 'sticker';
      fabricCanvas.add(sticker);
      fabricCanvas.bringToFront(sticker);
      fabricCanvas.setActiveObject(sticker);
      fabricCanvas.renderAll();
    });
  };

  // Eliminar objeto seleccionado
  const removeSelected = () => {
    if (!fabricCanvas) return;
    const activeObject = fabricCanvas.getActiveObject();
    if (activeObject) {
      fabricCanvas.remove(activeObject);
      fabricCanvas.renderAll();
    }
  };

  // Guardar imagen final
 // reemplaza tu saveCanvas por esta función
const saveCanvas = async () => {
  if (!fabricCanvas) return;
  fabricCanvas.discardActiveObject();

  // Exportar con mayor resolución para evitar pixelado
  const multiplier = Math.max(2, Math.round(window.devicePixelRatio || 2));
  const dataUrl = fabricCanvas.toDataURL({ format: 'png', multiplier });

  // Convertir dataURL a Blob
  const res = await fetch(dataUrl);
  const blob = await res.blob();

  const fileName = 'evidence-highres.png';
  const blobUrl = URL.createObjectURL(blob);

  // Detectar iOS (no respeta download para blobs)
  const isIOS = /iP(hone|od|ad)/.test(navigator.userAgent);

  if (isIOS) {
    // iOS: abrir en nueva pestaña para que el usuario haga "guardar imagen"
    window.open(blobUrl, '_blank');
    // liberar URL después de un tiempo
    setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
    return;
  }

  // Desktop / Android (intentar forzar descarga)
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = fileName;
  // Por seguridad/accessibilidad
  a.rel = 'noopener';
  // Firefox necesita que el <a> esté en el DOM para disparar click
  document.body.appendChild(a);
  a.click();
  a.remove();

  // liberar URL después de un rato
  setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
};


  // Inicializar canvas cuando el usuario sube su imagen
  useEffect(() => {
    if (!userImage) return;

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.0/fabric.min.js';
    script.onload = () => {
      const fabric = (window as any).fabric;
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 360,
        height: 540,
        selection: true,
        subTargetCheck: true // permite seleccionar objetos detrás de otros
      });

      // Imagen del usuario (base) — ya NO seleccionable ni evented: queda fija
      fabric.Image.fromURL(userImage, (img: any) => {
        const scale = 400 / img.width;
        img.set({
          left: 0,
          top: 0,
          scaleX: scale,
          scaleY: scale,
          selectable: false,    // <-- bloqueado: no se puede seleccionar ni mover
          evented: false,       // <-- no recibe eventos de pointer
          hasControls: false,
          perPixelTargetFind: false
        });
        img.customType = 'userImage';
        canvas.add(img);
        canvas.moveTo(img, 0); // capa base fija
        canvas.renderAll();
      });

      setFabricCanvas(canvas);
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
      fabricCanvas?.dispose();
    };
  }, [userImage]);

  const [modalIsOpen, setIsOpen] = React.useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  useEffect(() => {
    openModal()
  }, [])
  
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

  return (
    <div className="flex flex-col items-center p-4">

      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        
        {/* <button className='font-bold text-2xl w-full flex justify-end text-red-500' onClick={closeModal}>
          <IoMdCloseCircle />
        </button> */}

        <div className=''>
          <div className='font-light text-3xl text-gray-800 text-center mb-4'>
            <span className='font-bold'>Personaliza</span> tu foto de la carrera
          </div>
          <div className='text-sm font-light text-gray-700'>
            
          <div className='font-bold'>1. Selecciona tu foto</div>
            <li className='ml-3'> Da clic en el botón “Seleccionar archivo” para elegir la imagen que quieras editar.</li>

          <div className='mt-2 font-bold'>2. Elige un sticker desde las miniaturas</div>
            
            <div className='flex my-2'>
            {smallStickers.map((sticker) => (
              <div className='flex' key={sticker}>
                <img
                  src={`${sticker}-min.png`}
                  className="w-10 h-12 cursor-pointer mx-2 rounded-md flex"
                  onClick={() => addSmallSticker(`${sticker}.png`)}
                />
              </div>
            ))}
            </div>

            <li className='ml-3'>Haz clic en cualquiera de las miniaturas para agregar ese sticker a tu foto.</li>

          <div className='mt-2 font-bold'>3. Mueve, rota y cambia el tamaño de los stickers</div>
            <span className='ml-3'>Una vez colocado el sticker, puedes:</span>
            <li className='ml-3'>Moverlo arrastrándolo con el cursor.</li>
            <li className='ml-3'>Rotarlo usando el control de rotación.</li>
            <li className='ml-3'>Ajustar su tamaño jalando desde las esquinas.</li>

          <div className='mt-2 font-bold text-greenCustom'>4. Eliminar un sticker</div>
            <li className='ml-3'>Selecciona el sticker que quieres quitar.</li>
            <li className='ml-3'>Presiona el botón “Eliminar” Sticker para removerlo.</li>

          {/* <div className='mt-2 font-bold'>6. Finaliza tu edición</div>
            <li className='ml-3'>Cuando tu diseño esté listo, da clic en “Descargar imagen” para guardar tu foto editada en tu dispositivo.</li> */}
              
          <div className='mt-2 font-bold text-blueCustom'>5. Envía tu evidencia</div>
            <li className='ml-3'>Al finalizar súbe tu imagen como evidencia.</li>
          
          </div>
          
          <div className='flex justify-center'>
            <button className='font-bold text-md flex justify-center bg-greenCustom text-white p-2 mt-2 rounded-lg' onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      </Modal>


      {!userImage && (
        <input type="file" onChange={handleUpload} className='mt-3' />
      )}
      <div className='w-[360px] m-auto mt-2'>
      {userImage && (
        <canvas
          ref={canvasRef}
          style={{ borderRadius: '10px' }}
        />
      )}
      </div>

      <div className="mt-4">
        <div className='flex'>
          {/* Botones para agregar stickers pequeños */}
          {smallStickers.map((sticker) => (
            <div className='flex' key={sticker}>
            <img
              src={`${sticker}-min.png`}
              className="w-10 h-12 cursor-pointer mx-2 rounded-md"
              onClick={() => addSmallSticker(`${sticker}.png`)}
            />
            </div>
          ))}
        </div>

        <div className='mt-3 flex'>
          {/* Botones de control */}
          <button className="flex items-center px-3 py-1 bg-red-400 text-white rounded" onClick={removeSelected}>
            <PiTrashLight className='mr-1' /> Borrar Sticker
          </button>
          
          <button className="flex items-center px-3 py-1 bg-green-500 text-white rounded ml-2" onClick={saveCanvas}>
            <FaSave className='mr-1' /> Enviar evidencia
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvidenceEditor;
