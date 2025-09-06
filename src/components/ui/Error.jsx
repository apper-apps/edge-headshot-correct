import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  type = "default" 
}) => {
  const getErrorContent = () => {
    switch (type) {
      case "upload":
        return {
          icon: "Upload",
          title: "Upload Failed",
          description: "There was an error uploading your image. Please try again.",
        };
      case "generation":
        return {
          icon: "Zap",
          title: "Generation Failed",
          description: "We couldn't generate your headshot. Please try again.",
        };
      case "network":
        return {
          icon: "Wifi",
          title: "Connection Error",
          description: "Please check your internet connection and try again.",
        };
      default:
        return {
          icon: "AlertCircle",
          title: "Error",
          description: message,
        };
    }
  };

  const { icon, title, description } = getErrorContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center p-8"
    >
      <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
        <ApperIcon name={icon} size={32} className="text-red-500" />
      </div>
      
      <h3 className="text-xl font-display font-semibold text-slate-800 mb-2">
        {title}
      </h3>
      
      <p className="text-slate-600 mb-6 max-w-md mx-auto">
        {description}
      </p>
      
      {onRetry && (
        <motion.button
          onClick={onRetry}
          className="bg-gradient-primary text-white px-6 py-3 rounded-lg font-medium hover:shadow-medium transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
};

export default Error;