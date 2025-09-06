import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const UploadZone = ({ onFileSelect, disabled = false, maxSize = 10 }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith("image/"));
    
    if (imageFile) {
      handleFileSelect(imageFile);
    }
  }, [disabled]);

  const handleFileSelect = async (file) => {
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      onFileSelect(file);
      setIsProcessing(false);
    }, 800);
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <Card 
      className={`p-8 border-2 border-dashed transition-all duration-200 cursor-pointer ${
        isDragOver 
          ? "border-primary bg-blue-50 scale-105" 
          : "border-slate-300 hover:border-slate-400"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
        id="file-upload"
        disabled={disabled || isProcessing}
      />
      
      <label htmlFor="file-upload" className="cursor-pointer">
        <motion.div
          className="text-center"
          animate={isDragOver ? { scale: 1.05 } : { scale: 1 }}
        >
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            isDragOver ? "bg-primary/20" : "bg-slate-100"
          }`}>
            {isProcessing ? (
              <motion.div
                className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <ApperIcon 
                name={isDragOver ? "Download" : "Upload"} 
                size={32} 
                className={isDragOver ? "text-primary" : "text-slate-400"} 
              />
            )}
          </div>
          
          <h3 className="text-xl font-display font-semibold text-slate-800 mb-2">
            {isProcessing 
              ? "Processing..." 
              : isDragOver 
              ? "Drop your photo here" 
              : "Upload your photo"
            }
          </h3>
          
          <p className="text-slate-600 mb-4">
            {isProcessing 
              ? "Preparing your image for processing..." 
              : "Drag and drop or click to select a photo"
            }
          </p>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
            <span>• PNG, JPG up to {maxSize}MB</span>
            <span>• Best results with clear face photos</span>
          </div>
        </motion.div>
      </label>
    </Card>
  );
};

export default UploadZone;