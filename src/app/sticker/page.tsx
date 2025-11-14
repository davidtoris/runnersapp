// EvidenceEditor.tsx
'use client'
import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { PiTrashLight } from "react-icons/pi";
import Modal from 'react-modal';

const smallStickers = [
  '/logo-runners',
  '/sticker1',
  '/sticker2',
  '/sticker3',
  '/sticker4',
];

type ExportHandle = {
  exportImage: () => Promise<File | null>;
}

const EvidenceEditor = forwardRef<ExportHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [fabricCanvas, setFabricCanvas] = useState<any>(null);
  const [userImage, setUserImage] = useState<string>('');
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  // Exponer exportImage al padre
  useImperativeHandle(ref, () => ({
    exportImage: async (): Promise<File | null> => {
      if (!fabricCanvas) return null;
      try {
        fabricCanvas.discardActiveObject();
        const multiplier = Math.max(2, Math.round(window.devicePixelRatio || 2));
        const dataUrl = fabricCanvas.toDataURL({ format: 'png', multiplier });
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const fileName = 'evidence-highres.png';
        const file = new File([blob], fileName, { type: blob.type });
        return file;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('exportImage error:', err);
        return null;
      }
    }
  }), [fabricCanvas]);

  // Subir imagen del usuario (base)
  const handleUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setUserImage(reader.result as string);
    reader.readAsDataURL(file);
  };

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

  const removeSelected = () => {
    if (!fabricCanvas) return;
    const activeObject = fabricCanvas.getActiveObject();
    if (activeObject) {
      fabricCanvas.remove(activeObject);
      fabricCanvas.renderAll();
    }
  };

  // Inicializar fabric cuando el usuario sube su imagen
  useEffect(() => {
    if (!userImage) return;

    // Evitar añadir el script varias veces
    if (!scriptRef.current) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.0/fabric.min.js';
      scriptRef.current = script;
      script.onload = () => {
        const fabric = (window as any).fabric;
        const canvas = new fabric.Canvas(canvasRef.current, {
          width: 360,
          height: 540,
          selection: true,
          subTargetCheck: true
        });

        fabric.Image.fromURL(userImage, (img: any) => {
          // Escalar para caber en el canvas
          const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
          img.set({
            left: 0,
            top: 0,
            scaleX: scale,
            scaleY: scale,
            selectable: false,
            evented: false,
            hasControls: false,
            perPixelTargetFind: false
          });
          img.customType = 'userImage';
          canvas.add(img);
          canvas.moveTo(img, 0);
          canvas.renderAll();
        });

        setFabricCanvas(canvas);
      };
      document.body.appendChild(scriptRef.current);
    } else {
      // script ya existe: crear canvas inmediatamente si fabric ya está cargado
      const tryInit = () => {
        const fabric = (window as any).fabric;
        if (!fabric) return false;
        const canvas = new fabric.Canvas(canvasRef.current, {
          width: 360,
          height: 540,
          selection: true,
          subTargetCheck: true
        });

        fabric.Image.fromURL(userImage, (img: any) => {
          const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
          img.set({
            left: 0,
            top: 0,
            scaleX: scale,
            scaleY: scale,
            selectable: false,
            evented: false,
            hasControls: false,
            perPixelTargetFind: false
          });
          img.customType = 'userImage';
          canvas.add(img);
          canvas.moveTo(img, 0);
          canvas.renderAll();
        });

        setFabricCanvas(canvas);
        return true;
      };
      // si fabric no está listo, esperar un poco
      if (!(window as any).fabric) {
        const t = setInterval(() => {
          if (tryInit()) clearInterval(t);
        }, 150);
      } else {
        tryInit();
      }
    }

    // Cleanup: remover el canvas y script sólo si fue creado por este componente
    return () => {
      try {
        fabricCanvas?.dispose?.();
      } catch (err) {
        // noop
      }
      // NO removemos el script si otros componentes pueden usarlo; si quieres removerlo descomenta:
      // if (scriptRef.current) { document.body.removeChild(scriptRef.current); scriptRef.current = null; }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userImage]);

  const [modalIsOpen, setIsOpen] = useState(false)
  useEffect(() => { setIsOpen(true); }, [])

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
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Personaliza tu foto"
      >
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

            <div className='mt-2 font-bold text-blueCustom'>5. Envía tu evidencia</div>
            <li className='ml-3'>Al finalizar, presiona "Guardar resultados" (en la pantalla principal) para subir la imagen.</li>
          </div>

          <div className='flex justify-center'>
            <button className='font-bold text-md flex justify-center bg-greenCustom text-white p-2 mt-2 rounded-lg' onClick={() => setIsOpen(false)}>
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
          <button className="flex items-center px-3 py-1 bg-red-400 text-white rounded" onClick={removeSelected}>
            <PiTrashLight className='mr-1' /> Borrar Sticker
          </button>

          {/* Botón "Enviar evidencia" removido intencionalmente.
              Ahora el padre llamará exportImage() en su handleSave. */}
        </div>
      </div>
    </div>
  );
});

export default EvidenceEditor;
