import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const DownloadOptions = ({ 
  image, 
  onDownload, 
  className = "" 
}) => {
  const [selectedFormat, setSelectedFormat] = useState("png");
  const [selectedSize, setSelectedSize] = useState("linkedin");
  const [isDownloading, setIsDownloading] = useState(false);

  const formats = [
    { id: "png", label: "PNG", description: "Best quality, transparent background support" },
    { id: "jpg", label: "JPG", description: "Smaller file size, good for web use" }
  ];

  const sizes = [
    { id: "linkedin", label: "LinkedIn (400x400)", width: 400, height: 400 },
    { id: "square", label: "Square (500x500)", width: 500, height: 500 },
    { id: "portrait", label: "Portrait (600x800)", width: 600, height: 800 },
    { id: "standard", label: "Standard (1024x1024)", width: 1024, height: 1024 }
  ];

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      const selectedSizeConfig = sizes.find(s => s.id === selectedSize);
      
      // Simulate download processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create download link
      const link = document.createElement("a");
      link.href = image;
      link.download = `headshot-${selectedSize}.${selectedFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      if (onDownload) {
        onDownload({
          format: selectedFormat,
          size: selectedSizeConfig,
          timestamp: new Date()
        });
      }
      
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
          <ApperIcon name="Download" size={20} className="text-white" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-slate-800">
            Download Your Headshot
          </h3>
          <p className="text-sm text-slate-600">
            Choose format and size for your professional headshot
          </p>
        </div>
      </div>

      {/* Format Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-3">
          File Format
        </label>
        <div className="grid grid-cols-2 gap-3">
          {formats.map((format) => (
            <motion.div
              key={format.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedFormat === format.id
                  ? "border-primary bg-blue-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
              onClick={() => setSelectedFormat(format.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-medium text-slate-800">{format.label}</div>
              <div className="text-xs text-slate-600 mt-1">{format.description}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-3">
          Image Size
        </label>
        <div className="space-y-2">
          {sizes.map((size) => (
            <motion.div
              key={size.id}
              className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                selectedSize === size.id
                  ? "border-primary bg-blue-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
              onClick={() => setSelectedSize(size.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-800">{size.label}</span>
                <span className="text-sm text-slate-600">
                  {size.width}×{size.height}px
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Download Button */}
      <Button
        onClick={handleDownload}
        disabled={isDownloading}
        loading={isDownloading}
        className="w-full"
        size="lg"
      >
        {isDownloading ? (
          "Preparing Download..."
        ) : (
          <>
            <ApperIcon name="Download" size={20} className="mr-2" />
            Download Headshot
          </>
        )}
      </Button>

      <div className="mt-4 text-center">
        <p className="text-xs text-slate-500">
          Your headshot will be downloaded in {selectedFormat.toUpperCase()} format
          <br />
          Size: {sizes.find(s => s.id === selectedSize)?.width}×{sizes.find(s => s.id === selectedSize)?.height} pixels
        </p>
      </div>
    </Card>
  );
};

export default DownloadOptions;