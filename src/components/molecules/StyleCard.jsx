import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const StyleCard = ({ 
  style, 
  selected = false, 
  onSelect, 
  disabled = false 
}) => {
  const handleClick = () => {
    if (!disabled && onSelect) {
      onSelect(style);
    }
  };

  return (
    <motion.div
      whileHover={!disabled ? { y: -4 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      <Card
        className={`p-4 cursor-pointer transition-all duration-200 ${
          selected 
            ? "ring-2 ring-primary border-primary bg-blue-50" 
            : "hover:shadow-medium"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleClick}
        hover={!disabled}
      >
        <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-gradient-surface">
          <img
            src={style.previewUrl}
            alt={style.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        
        <div className="text-center">
          <h3 className="font-display font-semibold text-slate-800 mb-1">
            {style.name}
          </h3>
          <p className="text-sm text-slate-600 mb-3">
            {style.description}
          </p>
          
          {selected && (
            <div className="flex items-center justify-center text-primary">
              <ApperIcon name="Check" size={16} className="mr-1" />
              <span className="text-sm font-medium">Selected</span>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default StyleCard;