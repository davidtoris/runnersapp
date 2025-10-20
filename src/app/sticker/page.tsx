'use client'
import React, { useEffect, useState, useRef } from 'react';

const smallStickers = [
  '/logo-runners.png',
]

const backgroundStickers = [
  '/fondo1.png', // sticker grande de fondo
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
  const saveCanvas = () => {
    if (!fabricCanvas) return;
    fabricCanvas.discardActiveObject();
    const dataUrl = fabricCanvas.toDataURL({ format: 'png', quality: 0.9 });
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'evidence.png';
    link.click();
  };

  // Funciones de control de capas
  const moveToBack = () => {
    const obj = fabricCanvas?.getActiveObject();
    if (obj) {
      fabricCanvas.sendToBack(obj);
      fabricCanvas.renderAll();
    }
  };

  const moveToFront = () => {
    const obj = fabricCanvas?.getActiveObject();
    if (obj) {
      fabricCanvas.bringToFront(obj);
      fabricCanvas.renderAll();
    }
  };

  const moveBackward = () => {
  if (!fabricCanvas) return;
  const obj = fabricCanvas.getActiveObject();
  if (!obj) return;

  const objects = fabricCanvas.getObjects();
  const baseIndex = objects.findIndex((o:any) => o.customType === 'userImage');

  let currentIndex = objects.indexOf(obj);

  // Evitar que la imagen base o sticker superior se pase de sus límites
  if (obj.customType === 'background' && currentIndex > baseIndex + 1) {
    fabricCanvas.sendBackwards(obj);
    fabricCanvas.renderAll();
  } else if (obj.customType === 'sticker' && currentIndex > 0) {
    fabricCanvas.sendBackwards(obj);
    fabricCanvas.renderAll();
  }
};

const moveForward = () => {
  if (!fabricCanvas) return;
  const obj = fabricCanvas.getActiveObject();
  if (!obj) return;

  const objects = fabricCanvas.getObjects();
  const lastIndex = objects.length - 1;

  let currentIndex = objects.indexOf(obj);

  // Stickers siempre pueden ir hasta la cima
  if (currentIndex < lastIndex) {
    fabricCanvas.bringForward(obj);
    fabricCanvas.renderAll();
  }
};

  // Inicializar canvas cuando el usuario sube su imagen
  useEffect(() => {
    if (!userImage) return;

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.0/fabric.min.js';
    script.onload = () => {
      const fabric = (window as any).fabric;
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 500,
        height: 500,
        selection: true,
        subTargetCheck: true // permite seleccionar objetos detrás de otros
      });

      // Imagen del usuario (base)
      fabric.Image.fromURL(userImage, (img: any) => {
        const scale = 500 / img.width;
        img.set({
          left: 0,
          top: 0,
          scaleX: scale,
          scaleY: scale,
          selectable: true,
          evented: true,
          perPixelTargetFind: true
        });
        img.customType = 'userImage';
        canvas.add(img);
        canvas.moveTo(img, 0); // capa base
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
    <div className="flex flex-col items-center">
      <input type="file" onChange={handleUpload} />

      {userImage && (
        <canvas
          ref={canvasRef}
          style={{ border: '1px solid #ccc', marginTop: '10px' }}
        />
      )}

      <div className="flex gap-2 mt-4 flex-wrap">
        {/* Botones para agregar fondos */}
        {backgroundStickers.map((bg) => (
          <img
            key={bg}
            src={bg}
            className="w-16 h-16 cursor-pointer"
            onClick={() => addBackgroundSticker(bg)}
          />
        ))}

        {/* Botones para agregar stickers pequeños */}
        {smallStickers.map((sticker) => (
          <img
            key={sticker}
            src={sticker}
            className="w-12 h-12 cursor-pointer"
            onClick={() => addSmallSticker(sticker)}
          />
        ))}

        {/* Botones de control */}
        <button className="px-3 py-1 bg-gray-300 rounded" onClick={removeSelected}>
          Eliminar
        </button>
        <button className="px-3 py-1 bg-gray-300 rounded" onClick={moveToBack}>
          Enviar atrás
        </button>
        <button className="px-3 py-1 bg-gray-300 rounded" onClick={moveToFront}>
          Traer al frente
        </button>
        <button className="px-3 py-1 bg-gray-300 rounded" onClick={moveBackward}>
          Mover atrás
        </button>
        <button className="px-3 py-1 bg-gray-300 rounded" onClick={moveForward}>
          Mover adelante
        </button>

        <button className="px-3 py-1 bg-green-500 text-white rounded" onClick={saveCanvas}>
          Guardar imagen final
        </button>
      </div>
    </div>
  );
};

export default EvidenceEditor;
