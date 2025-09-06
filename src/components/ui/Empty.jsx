import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data available",
  description = "Get started by adding some content.",
  actionLabel = "Get Started",
  onAction,
  icon = "Image",
  type = "default"
}) => {
  const getEmptyContent = () => {
    switch (type) {
      case "upload":
        return {
          icon: "Upload",
          title: "No Image Uploaded",
          description: "Upload a photo to get started with generating your professional headshot.",
          actionLabel: "Upload Photo",
        };
      case "headshots":
        return {
          icon: "Users",
          title: "No Headshots Generated",
          description: "You haven't generated any headshots yet. Upload a photo to create your first professional headshot.",
          actionLabel: "Create First Headshot",
        };
      case "history":
        return {
          icon: "Clock",
          title: "No History",
          description: "Your generation history will appear here once you start creating headshots.",
          actionLabel: "Generate Headshot",
        };
      default:
        return { icon, title, description, actionLabel };
    }
  };

  const content = getEmptyContent();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center p-12"
    >
      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-surface rounded-full flex items-center justify-center">
        <ApperIcon name={content.icon} size={40} className="text-slate-400" />
      </div>
      
      <h3 className="text-2xl font-display font-semibold text-slate-800 mb-3">
        {content.title}
      </h3>
      
      <p className="text-slate-600 mb-8 max-w-md mx-auto text-lg">
        {content.description}
      </p>
      
      {onAction && (
        <motion.button
          onClick={onAction}
          className="bg-gradient-primary text-white px-8 py-4 rounded-lg font-medium text-lg hover:shadow-medium transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ApperIcon name="Plus" size={20} className="inline mr-2" />
          {content.actionLabel}
        </motion.button>
      )}
    </motion.div>
  );
};

export default Empty;