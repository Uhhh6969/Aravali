import React, { useRef, useState } from 'react';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number; // in MB
  multiple?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = "*/*",
  maxSize = 10,
  multiple = false,
  className = "",
  children
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setErrorMessage(`File size must be less than ${maxSize}MB`);
      setUploadStatus('error');
      return false;
    }

    // Check file type if accept is specified
    if (accept !== "*/*") {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      const mimeType = file.type;
      
      const isValidType = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return fileExtension === type;
        }
        return mimeType.match(type.replace('*', '.*'));
      });

      if (!isValidType) {
        setErrorMessage(`File type not supported. Accepted types: ${accept}`);
        setUploadStatus('error');
        return false;
      }
    }

    return true;
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    
    if (!validateFile(file)) return;

    setUploadStatus('uploading');
    setErrorMessage('');

    // Simulate upload process
    setTimeout(() => {
      try {
        onFileSelect(file);
        setUploadStatus('success');
        setTimeout(() => setUploadStatus('idle'), 2000);
      } catch (error) {
        setErrorMessage('Failed to process file');
        setUploadStatus('error');
      }
    }, 1000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case 'uploading':
        return <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent" />;
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return <Upload className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStatusMessage = () => {
    switch (uploadStatus) {
      case 'uploading':
        return 'Uploading...';
      case 'success':
        return 'Upload successful!';
      case 'error':
        return errorMessage || 'Upload failed';
      default:
        return 'Click to upload or drag and drop';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200
          ${isDragOver 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
          ${uploadStatus === 'error' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : ''}
          ${uploadStatus === 'success' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''}
        `}
      >
        <div className="flex flex-col items-center space-y-3">
          {getStatusIcon()}
          
          <div>
            <p className={`font-medium ${
              uploadStatus === 'error' ? 'text-red-700 dark:text-red-300' :
              uploadStatus === 'success' ? 'text-green-700 dark:text-green-300' :
              'text-gray-700 dark:text-gray-300'
            }`}>
              {getStatusMessage()}
            </p>
            
            {uploadStatus === 'idle' && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Max file size: {maxSize}MB
                {accept !== "*/*" && ` • Accepted: ${accept}`}
              </p>
            )}
          </div>

          {children}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;