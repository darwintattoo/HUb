import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Wand2, RotateCcw, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import logoPath from '@assets/1Asset 1zzz.png';

const translations = {
  es: {
    title: "Generador de Stencils",
    subtitle: "Convierte cualquier imagen en un stencil profesional para tatuajes",
    uploadArea: "Arrastra una imagen aquí o haz clic para seleccionar",
    supportedFormats: "Formatos soportados: JPG, PNG, WEBP",
    generating: "Generando stencil...",
    downloadStencil: "Descargar Stencil",
    tryAgain: "Intentar de nuevo",
    reset: "Restablecer",
    backToHome: "Volver al inicio",
    adjustments: "Ajustes",
    threshold: "Umbral",
    blur: "Desenfoque",
    contrast: "Contraste",
    originalImage: "Imagen Original",
    stencilResult: "Resultado del Stencil",
    processing: "Procesando imagen...",
    error: "Error al procesar la imagen",
    dragDropHint: "Arrastra y suelta tu imagen aquí",
    selectFile: "Seleccionar archivo"
  },
  en: {
    title: "Stencil Generator",
    subtitle: "Convert any image into a professional tattoo stencil",
    uploadArea: "Drag an image here or click to select",
    supportedFormats: "Supported formats: JPG, PNG, WEBP",
    generating: "Generating stencil...",
    downloadStencil: "Download Stencil",
    tryAgain: "Try Again",
    reset: "Reset",
    backToHome: "Back to Home",
    adjustments: "Adjustments",
    threshold: "Threshold",
    blur: "Blur",
    contrast: "Contrast",
    originalImage: "Original Image",
    stencilResult: "Stencil Result",
    processing: "Processing image...",
    error: "Error processing image",
    dragDropHint: "Drag and drop your image here",
    selectFile: "Select file"
  }
};

interface StencilGeneratorProps {
  params?: any;
}

const StencilGenerator: React.FC<StencilGeneratorProps> = ({ params }) => {
  const language = 'en'; // Default language, can be extended later
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [stencilImage, setStencilImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [threshold, setThreshold] = useState([128]);
  const [blur, setBlur] = useState([2]);
  const [contrast, setContrast] = useState([1.2]);
  const [dragActive, setDragActive] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language as keyof typeof translations];
    for (const k of keys) {
      value = value?.[k];
    }
    return (value as string) || key;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setOriginalImage(result);
      generateStencil(result);
    };
    reader.readAsDataURL(file);
  };

  const generateStencil = async (imageUrl: string) => {
    setIsProcessing(true);
    
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        // Set canvas size
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw original image
        ctx.drawImage(img, 0, 0);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Convert to grayscale and apply threshold
        for (let i = 0; i < data.length; i += 4) {
          const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
          const adjusted = gray * contrast[0];
          const thresholded = adjusted > threshold[0] ? 255 : 0;
          
          data[i] = thresholded;     // Red
          data[i + 1] = thresholded; // Green
          data[i + 2] = thresholded; // Blue
          // Alpha stays the same
        }

        // Apply blur effect (simple box blur)
        if (blur[0] > 0) {
          const blurRadius = Math.floor(blur[0]);
          const tempData = new Uint8ClampedArray(data);
          
          for (let y = blurRadius; y < canvas.height - blurRadius; y++) {
            for (let x = blurRadius; x < canvas.width - blurRadius; x++) {
              let r = 0, g = 0, b = 0, count = 0;
              
              for (let dy = -blurRadius; dy <= blurRadius; dy++) {
                for (let dx = -blurRadius; dx <= blurRadius; dx++) {
                  const idx = ((y + dy) * canvas.width + (x + dx)) * 4;
                  r += tempData[idx];
                  g += tempData[idx + 1];
                  b += tempData[idx + 2];
                  count++;
                }
              }
              
              const idx = (y * canvas.width + x) * 4;
              data[idx] = r / count;
              data[idx + 1] = g / count;
              data[idx + 2] = b / count;
            }
          }
        }

        // Put processed image data back
        ctx.putImageData(imageData, 0, 0);

        // Convert to stencil image
        const stencilDataUrl = canvas.toDataURL('image/png');
        setStencilImage(stencilDataUrl);
        setIsProcessing(false);
      };

      img.src = imageUrl;
    } catch (error) {
      console.error('Error generating stencil:', error);
      setIsProcessing(false);
    }
  };

  const handleParameterChange = () => {
    if (originalImage) {
      generateStencil(originalImage);
    }
  };

  const downloadStencil = () => {
    if (!stencilImage) return;

    const link = document.createElement('a');
    link.download = 'tattoo-stencil.png';
    link.href = stencilImage;
    link.click();
  };

  const reset = () => {
    setOriginalImage(null);
    setStencilImage(null);
    setThreshold([128]);
    setBlur([2]);
    setContrast([1.2]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black p-4 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <img 
            src={logoPath} 
            alt="TattooStencilPro Logo" 
            className="h-16 w-16"
          />
          <div>
            <h1 className="text-2xl font-bold">
              <span className="font-bold">Tattoo</span>
              <span className="font-light">Stencil</span>
              <span className="text-blue-400">Pro</span>
            </h1>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => window.location.href = '/'}
          className="text-white border-gray-600 hover:bg-gray-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('backToHome')}
        </Button>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Title */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <Wand2 className="inline-block w-12 h-12 mr-4 text-blue-400" />
            {t('title')}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Area */}
          <div className="lg:col-span-2">
            {!originalImage ? (
              <motion.div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
                  dragActive 
                    ? 'border-blue-400 bg-blue-400/10' 
                    : 'border-gray-600 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">{t('dragDropHint')}</h3>
                <p className="text-gray-400 mb-4">{t('supportedFormats')}</p>
                <Button variant="outline" className="text-white border-gray-600 hover:bg-gray-800">
                  <Upload className="w-4 h-4 mr-2" />
                  {t('selectFile')}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Original Image */}
                <Card className="p-4 bg-gray-900 border-gray-700">
                  <h3 className="text-lg font-semibold mb-4 text-center">{t('originalImage')}</h3>
                  <div className="relative">
                    <img
                      src={originalImage}
                      alt="Original"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </Card>

                {/* Stencil Result */}
                <Card className="p-4 bg-gray-900 border-gray-700">
                  <h3 className="text-lg font-semibold mb-4 text-center">{t('stencilResult')}</h3>
                  <div className="relative">
                    {isProcessing ? (
                      <div className="flex items-center justify-center h-64 bg-gray-800 rounded-lg">
                        <div className="text-center">
                          <motion.div
                            className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <p className="text-gray-400">{t('processing')}</p>
                        </div>
                      </div>
                    ) : stencilImage ? (
                      <img
                        src={stencilImage}
                        alt="Stencil"
                        className="w-full h-auto rounded-lg"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-64 bg-gray-800 rounded-lg">
                        <p className="text-gray-400">{t('processing')}</p>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <Card className="p-6 bg-gray-900 border-gray-700">
              <h3 className="text-lg font-semibold mb-6">{t('adjustments')}</h3>
              
              <div className="space-y-6">
                {/* Threshold */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('threshold')}: {threshold[0]}
                  </label>
                  <Slider
                    value={threshold}
                    onValueChange={(value) => {
                      setThreshold(value);
                      setTimeout(handleParameterChange, 100);
                    }}
                    max={255}
                    min={0}
                    step={1}
                    className="w-full"
                    disabled={!originalImage}
                  />
                </div>

                {/* Blur */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('blur')}: {blur[0]}
                  </label>
                  <Slider
                    value={blur}
                    onValueChange={(value) => {
                      setBlur(value);
                      setTimeout(handleParameterChange, 100);
                    }}
                    max={5}
                    min={0}
                    step={0.5}
                    className="w-full"
                    disabled={!originalImage}
                  />
                </div>

                {/* Contrast */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('contrast')}: {contrast[0].toFixed(1)}
                  </label>
                  <Slider
                    value={contrast}
                    onValueChange={(value) => {
                      setContrast(value);
                      setTimeout(handleParameterChange, 100);
                    }}
                    max={3}
                    min={0.5}
                    step={0.1}
                    className="w-full"
                    disabled={!originalImage}
                  />
                </div>
              </div>
            </Card>

            {/* Actions */}
            <Card className="p-6 bg-gray-900 border-gray-700">
              <div className="space-y-3">
                <Button
                  onClick={downloadStencil}
                  disabled={!stencilImage || isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t('downloadStencil')}
                </Button>
                
                <Button
                  onClick={reset}
                  variant="outline"
                  className="w-full text-white border-gray-600 hover:bg-gray-800"
                  disabled={isProcessing}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {t('reset')}
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Hidden canvas for image processing */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default StencilGenerator;