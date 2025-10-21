'use client'
import React, { useEffect, useState, useRef } from 'react';
import { PiTrashLight } from "react-icons/pi";

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
        width: 400,
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

  return (
    <div className="flex flex-col items-center p-4">

      <div>
        <div className='font-light text-3xl text-gray-800 text-center mb-4'>
          <span className='font-bold'>Personaliza</span> tu foto
        </div>
        <div className='text-sm font-light text-gray-700'>
          Selecciona tu foto y da clic en las miniaturas para agregar los stickers, estos los puedes mover, rotar y cambiar de tamaño,
          al finalizar envía tu evidencia
        </div>
      </div>

    {!userImage && (
      <input type="file" onChange={handleUpload} className='mt-3' />
    )}

      {userImage && (
        <canvas
          ref={canvasRef}
          style={{ border: '1px solid #ccc', marginTop: '10px' }}
        />
      )}

      <div className="mt-4">
        <div className='flex'>
          {/* Botones para agregar stickers pequeños */}
          {smallStickers.map((sticker) => (
            <div className='flex' key={sticker}>
            <img
              src={`${sticker}-min.png`}
              className="w-10 h-12 cursor-pointer mx-2"
              onClick={() => addSmallSticker(`${sticker}.png`)}
            />
            </div>
          ))}
        </div>

        <div className='mt-2 flex'>
          {/* Botones de control */}
          <button className="flex items-center px-3 py-1 bg-gray-300 rounded" onClick={removeSelected}>
            <PiTrashLight className='mr-1' /> Eliminar Sticker
          </button>
          
          <button className="px-3 py-1 bg-green-500 text-white rounded ml-2" onClick={saveCanvas}>
            Enviar evidencia
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvidenceEditor;
