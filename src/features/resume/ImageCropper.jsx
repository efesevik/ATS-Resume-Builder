import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../../utils/cropImage';
import { X, Check, ZoomIn, Scissors } from 'lucide-react';

const ImageCropper = ({ image, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = useCallback((crop) => {
    setCrop(crop);
  }, []);

  const onCropEnd = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      onCropComplete(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [image, croppedAreaPixels, onCropComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-zinc-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-black text-white rounded-xl shadow-lg">
              <Scissors size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black text-zinc-900 uppercase tracking-tight">Fotoğrafı Düzenle</h3>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">En iyi görünüm için alanı ayarlayın</p>
            </div>
          </div>
          <button 
            onClick={onCancel}
            className="p-2 hover:bg-zinc-200 rounded-full transition-colors text-zinc-400 hover:text-zinc-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cropping Area */}
        <div className="relative flex-1 bg-zinc-100 min-h-[350px]">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={onCropChange}
            onCropComplete={onCropEnd}
            onZoomChange={setZoom}
            classes={{
                containerClassName: "bg-zinc-100",
                mediaClassName: "max-h-full",
                cropAreaClassName: "border-2 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.6)]"
            }}
          />
        </div>

        {/* Controls */}
        <div className="p-8 space-y-8 bg-zinc-50 border-t">
          {/* Zoom Control */}
          <div className="flex items-center gap-6">
            <ZoomIn size={18} className="text-zinc-400 shrink-0" />
            <div className="flex-1 relative h-6 flex items-center">
                <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-black hover:accent-zinc-700 transition-all"
                />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onCancel}
              className="flex-1 px-8 py-4 rounded-2xl font-black text-zinc-600 border-2 border-zinc-200 hover:bg-zinc-100 transition-all uppercase tracking-widest text-[11px]"
            >
              İptal
            </button>
            <button
              onClick={showCroppedImage}
              className="flex-[2] bg-black text-white px-8 py-4 rounded-2xl font-black hover:bg-zinc-800 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-2 uppercase tracking-widest text-[11px]"
            >
              <Check size={18} />
              Kaydet ve Devam Et
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
