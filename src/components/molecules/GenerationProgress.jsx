import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Progress from "@/components/atoms/Progress";
import Card from "@/components/atoms/Card";

const GenerationProgress = ({ 
  isVisible, 
  onComplete,
  style,
  estimatedTime = 8 
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: "Analyzing your photo", icon: "Eye", duration: 2000 },
    { label: "Applying AI enhancements", icon: "Sparkles", duration: 3000 },
    { label: "Generating professional style", icon: "Palette", duration: 2000 },
    { label: "Finalizing your headshot", icon: "Check", duration: 1000 }
  ];

  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      setCurrentStep(0);
      return;
    }

    let progressInterval;
    let stepTimeout;
    
    const startGeneration = () => {
      let totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);
      let elapsed = 0;
      
      progressInterval = setInterval(() => {
        elapsed += 100;
        const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
        setProgress(newProgress);
        
        // Update current step based on elapsed time
        let cumulativeDuration = 0;
        for (let i = 0; i < steps.length; i++) {
          cumulativeDuration += steps[i].duration;
          if (elapsed <= cumulativeDuration) {
            setCurrentStep(i);
            break;
          }
        }
        
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
        }
      }, 100);
    };

    startGeneration();

    return () => {
      if (progressInterval) clearInterval(progressInterval);
      if (stepTimeout) clearTimeout(stepTimeout);
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <Card className="w-full max-w-md p-8 text-center">
        <motion.div
          className="w-20 h-20 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <ApperIcon name="Zap" size={32} className="text-white" />
        </motion.div>
        
        <h3 className="text-2xl font-display font-bold text-slate-800 mb-2">
          Creating Your Headshot
        </h3>
        
        <p className="text-slate-600 mb-8">
          Our AI is crafting the perfect professional headshot in the {style?.name} style.
        </p>
        
        <Progress 
          value={progress} 
          className="mb-6" 
          variant="accent"
        />
        
        <div className="flex items-center justify-center space-x-3 text-sm text-slate-600">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ApperIcon name={steps[currentStep]?.icon} size={16} className="text-primary" />
          </motion.div>
          <span>{steps[currentStep]?.label}</span>
        </div>
        
        <div className="mt-4 text-xs text-slate-500">
          {Math.round(progress)}% complete • {Math.ceil((100 - progress) * estimatedTime / 100)}s remaining
        </div>
      </Card>
    </motion.div>
  );
};

export default GenerationProgress;