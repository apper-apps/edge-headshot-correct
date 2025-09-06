import { useState, useRef } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const ImageComparison = ({ 
  originalImage, 
  generatedImage, 
  showToggle = true 
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState("split"); // "split", "original", "generated"
  const containerRef = useRef(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const toggleView = () => {
    const modes = ["split", "original", "generated"];
    const currentIndex = modes.indexOf(viewMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setViewMode(modes[nextIndex]);
  };

  const getViewModeLabel = () => {
    switch (viewMode) {
      case "original": return "Original";
      case "generated": return "Generated";
      default: return "Split View";
    }
  };

  const getViewModeIcon = () => {
    switch (viewMode) {
      case "original": return "User";
      case "generated": return "Sparkles";
      default: return "Split";
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <h3 className="font-display font-semibold text-slate-800">
          Before & After Comparison
        </h3>
        {showToggle && (
          <motion.button
            onClick={toggleView}
            className="flex items-center space-x-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-700 transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ApperIcon name={getViewModeIcon()} size={16} />
            <span>{getViewModeLabel()}</span>
          </motion.button>
        )}
      </div>
      
      <div 
        ref={containerRef}
        className="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-ew-resize"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Original Image */}
        <div 
          className={`absolute inset-0 ${
            viewMode === "generated" ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
          style={{
            clipPath: viewMode === "split" 
              ? `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
              : "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
          }}
        >
          <img
            src={originalImage}
            alt="Original"
            className="w-full h-full object-cover"
          />
          {viewMode === "original" && (
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
              Original
            </div>
          )}
        </div>
        
        {/* Generated Image */}
        <div 
          className={`absolute inset-0 ${
            viewMode === "original" ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
          style={{
            clipPath: viewMode === "split" 
              ? `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`
              : "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
          }}
        >
          <img
            src={generatedImage}
            alt="Generated"
            className="w-full h-full object-cover"
          />
          {viewMode === "generated" && (
            <div className="absolute bottom-4 right-4 bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
              Generated
            </div>
          )}
        </div>
        
        {/* Slider */}
        {viewMode === "split" && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg cursor-ew-resize z-10"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={handleMouseDown}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-primary">
              <ApperIcon name="GripHorizontal" size={14} className="text-primary" />
            </div>
          </div>
        )}
        
        {/* Labels */}
        {viewMode === "split" && (
          <>
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
              Original
            </div>
            <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
              Generated
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default ImageComparison;