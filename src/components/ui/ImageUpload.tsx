import React, { useState } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import FileUpload from './FileUpload';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (imageUrl: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  shape?: 'square' | 'circle';
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  currentImage,
  onImageChange,
  className = '',
  size = 'md',
  shape = 'square'
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48'
  };

  const shapeClasses = {
    square: 'rounded-xl',
    circle: 'rounded-full'
  };

  const handleFileSelect = (file: File) => {
    setIsUploading(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
      onImageChange(result);
      setIsUploading(false);
    };
    reader.onerror = () => {
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setPreviewUrl(null);
    onImageChange('');
  };

  const displayImage = previewUrl || currentImage;

  return (
    <div className={`relative ${className}`}>
      {displayImage ? (
        <div className="relative group">
          <img
            src={displayImage}
            alt="Upload preview"
            className={`${sizeClasses[size]} ${shapeClasses[shape]} object-cover border-2 border-gray-200 dark:border-gray-600`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/200x200?text=Error';
            }}
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-xl">
            <div className="flex space-x-2">
              <FileUpload
                onFileSelect={handleFileSelect}
                accept="image/*"
                maxSize={5}
                className="inline-block"
              >
                <button className="p-2 bg-white/90 hover:bg-white text-gray-900 rounded-lg transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </FileUpload>
              
              <button
                onClick={clearImage}
                className="p-2 bg-red-500/90 hover:bg-red-500 text-white rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
            </div>
          )}
        </div>
      ) : (
        <FileUpload
          onFileSelect={handleFileSelect}
          accept="image/*"
          maxSize={5}
          className={`${sizeClasses[size]} ${shapeClasses[shape]} border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors`}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <Upload className="h-6 w-6 text-gray-400 mb-2" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Upload Image</span>
          </div>
        </FileUpload>
      )}
    </div>
  );
};

export default ImageUpload;