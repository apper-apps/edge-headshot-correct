import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ImageComparison from "@/components/molecules/ImageComparison";
import DownloadOptions from "@/components/molecules/DownloadOptions";

const ResultsPanel = ({ 
  originalImage, 
  generatedImage, 
  style,
  onReset,
  onRegenerate 
}) => {
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      await onRegenerate();
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleDownload = (downloadInfo) => {
    console.log("Downloaded:", downloadInfo);
    // Here you would typically track download analytics
  };

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-success to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="Check" size={32} className="text-white" />
        </div>
        <h2 className="text-3xl font-display font-bold text-slate-800 mb-2">
          Your Headshot is Ready!
        </h2>
        <p className="text-slate-600 text-lg">
          Generated in {style.name} style • Ready for professional use
        </p>
      </motion.div>

      {/* Image Comparison */}
      <ImageComparison
        originalImage={originalImage}
        generatedImage={generatedImage}
      />

      {/* Action Buttons */}
      <Card className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            onClick={() => setShowDownloadOptions(!showDownloadOptions)}
            variant="default"
            className="w-full"
          >
            <ApperIcon name="Download" size={20} className="mr-2" />
            Download
          </Button>
          
          <Button
            onClick={handleRegenerate}
            loading={isRegenerating}
            variant="outline"
            className="w-full"
          >
            <ApperIcon name="RefreshCw" size={20} className="mr-2" />
            Regenerate
          </Button>
          
          <Button
            onClick={onReset}
            variant="ghost"
            className="w-full"
          >
            <ApperIcon name="ArrowLeft" size={20} className="mr-2" />
            New Photo
          </Button>
        </div>
      </Card>

      {/* Download Options */}
      {showDownloadOptions && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <DownloadOptions
            image={generatedImage}
            onDownload={handleDownload}
          />
        </motion.div>
      )}

      {/* Tips */}
      <Card className="p-6 bg-gradient-surface">
        <h4 className="font-display font-semibold text-slate-800 mb-4 flex items-center">
          <ApperIcon name="Lightbulb" size={20} className="mr-2 text-primary" />
          Pro Tips
        </h4>
        <div className="space-y-3 text-sm text-slate-600">
          <div className="flex items-start space-x-3">
            <ApperIcon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span>Use LinkedIn size (400×400) for professional social media profiles</span>
          </div>
          <div className="flex items-start space-x-3">
            <ApperIcon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span>PNG format preserves the highest quality and supports transparency</span>
          </div>
          <div className="flex items-start space-x-3">
            <ApperIcon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span>Try regenerating with the same style for subtle variations</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResultsPanel;