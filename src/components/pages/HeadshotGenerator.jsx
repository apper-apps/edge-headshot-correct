import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import UploadZone from "@/components/molecules/UploadZone";
import StyleSelector from "@/components/organisms/StyleSelector";
import ResultsPanel from "@/components/organisms/ResultsPanel";
import GenerationProgress from "@/components/molecules/GenerationProgress";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { stylesService } from "@/services/api/stylesService";

const HeadshotGenerator = () => {
  const [styles, setStyles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // App state
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  // Load styles on mount
  useEffect(() => {
    loadStyles();
  }, []);

  const loadStyles = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await stylesService.getAll();
      setStyles(data);
    } catch (err) {
      setError("Failed to load styles. Please try again.");
      console.error("Error loading styles:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (file) => {
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    setGeneratedImage(null);
    setSelectedStyle(null);
    toast.success("Photo uploaded successfully!");
  };

  const handleStyleSelect = (style) => {
    setSelectedStyle(style);
    toast.info(`${style.name} style selected`);
  };

  const handleGenerate = async (style) => {
    if (!uploadedImage || !style) {
      toast.error("Please upload an image and select a style");
      return;
    }

    setIsGenerating(true);
    setShowProgress(true);
    
    try {
      // Simulate AI generation with progress
      await new Promise(resolve => setTimeout(resolve, 8000));
      
      // For demo purposes, use a generated headshot image
      const generatedUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face";
      setGeneratedImage(generatedUrl);
      
      toast.success("Professional headshot generated successfully!");
      
    } catch (err) {
      toast.error("Failed to generate headshot. Please try again.");
      console.error("Generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerationComplete = () => {
    setShowProgress(false);
  };

  const handleRegenerate = async () => {
    return handleGenerate(selectedStyle);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setSelectedStyle(null);
    setGeneratedImage(null);
    setIsGenerating(false);
    setShowProgress(false);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Error message={error} onRetry={loadStyles} />
      </div>
    );
  }

  if (styles.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Empty 
          type="headshots"
          onAction={loadStyles}
          actionLabel="Reload Styles"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8 text-sm">
            <div className={`flex items-center space-x-2 ${
              uploadedImage ? "text-primary" : "text-slate-400"
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                uploadedImage ? "bg-primary text-white" : "bg-slate-200"
              }`}>
                {uploadedImage ? <ApperIcon name="Check" size={16} /> : "1"}
              </div>
              <span className="font-medium">Upload Photo</span>
            </div>
            
            <div className={`w-12 h-px ${uploadedImage ? "bg-primary" : "bg-slate-300"}`} />
            
            <div className={`flex items-center space-x-2 ${
              selectedStyle ? "text-primary" : uploadedImage ? "text-slate-600" : "text-slate-400"
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                selectedStyle ? "bg-primary text-white" : uploadedImage ? "bg-slate-600 text-white" : "bg-slate-200"
              }`}>
                {selectedStyle ? <ApperIcon name="Check" size={16} /> : "2"}
              </div>
              <span className="font-medium">Choose Style</span>
            </div>
            
            <div className={`w-12 h-px ${generatedImage ? "bg-primary" : "bg-slate-300"}`} />
            
            <div className={`flex items-center space-x-2 ${
              generatedImage ? "text-primary" : "text-slate-400"
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                generatedImage ? "bg-primary text-white" : "bg-slate-200"
              }`}>
                {generatedImage ? <ApperIcon name="Check" size={16} /> : "3"}
              </div>
              <span className="font-medium">Download</span>
            </div>
          </div>
        </div>

        {!generatedImage ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Upload */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">
                  Upload Your Photo
                </h2>
                <p className="text-slate-600">
                  Start by uploading a clear photo of yourself. Our AI works best with well-lit photos where your face is clearly visible.
                </p>
              </div>

              <UploadZone
                onFileSelect={handleFileSelect}
                disabled={isGenerating}
              />

              {uploadedImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative"
                >
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full h-64 object-cover rounded-xl shadow-soft"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    Original
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Right Column - Style Selection */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">
                  Professional Styles
                </h2>
                <p className="text-slate-600">
                  Choose from our curated selection of professional headshot styles, each optimized for different use cases.
                </p>
              </div>

              <StyleSelector
                styles={styles}
                selectedStyle={selectedStyle}
                onStyleSelect={handleStyleSelect}
                onGenerate={handleGenerate}
                disabled={!uploadedImage}
                isGenerating={isGenerating}
              />
            </motion.div>
          </div>
        ) : (
          /* Results View */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ResultsPanel
              originalImage={uploadedImage}
              generatedImage={generatedImage}
              style={selectedStyle}
              onReset={handleReset}
              onRegenerate={handleRegenerate}
            />
          </motion.div>
        )}

        {/* Generation Progress Modal */}
        <GenerationProgress
          isVisible={showProgress}
          onComplete={handleGenerationComplete}
          style={selectedStyle}
        />
      </div>
    </div>
  );
};

export default HeadshotGenerator;