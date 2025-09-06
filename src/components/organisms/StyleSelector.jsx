import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import StyleCard from "@/components/molecules/StyleCard";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const StyleSelector = ({ 
  styles, 
  selectedStyle, 
  onStyleSelect, 
  onGenerate,
  disabled = false,
  isGenerating = false 
}) => {
  const [hoveredStyle, setHoveredStyle] = useState(null);

  const handleGenerate = () => {
    if (selectedStyle && onGenerate) {
      onGenerate(selectedStyle);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
          <ApperIcon name="Palette" size={20} className="text-white" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-slate-800">
            Choose Your Style
          </h3>
          <p className="text-sm text-slate-600">
            Select a professional style for your headshot
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {styles.map((style) => (
          <motion.div
            key={style.id}
            onHoverStart={() => setHoveredStyle(style)}
            onHoverEnd={() => setHoveredStyle(null)}
          >
            <StyleCard
              style={style}
              selected={selectedStyle?.id === style.id}
              onSelect={onStyleSelect}
              disabled={disabled || isGenerating}
            />
          </motion.div>
        ))}
      </div>

      {/* Style Description */}
      {(selectedStyle || hoveredStyle) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-gradient-surface rounded-lg"
        >
          <h4 className="font-display font-semibold text-slate-800 mb-2">
            {(hoveredStyle || selectedStyle).name} Style
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            {(hoveredStyle || selectedStyle).description}
          </p>
          <div className="mt-3 flex items-center text-xs text-slate-500">
            <ApperIcon name="Info" size={14} className="mr-2" />
            Best for: {(hoveredStyle || selectedStyle).bestFor || "Professional profiles and business use"}
          </div>
        </motion.div>
      )}

      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        disabled={!selectedStyle || disabled || isGenerating}
        loading={isGenerating}
        className="w-full"
        size="lg"
        variant="accent"
      >
        {isGenerating ? (
          "Generating Your Headshot..."
        ) : (
          <>
            <ApperIcon name="Sparkles" size={20} className="mr-2" />
            Generate Professional Headshot
          </>
        )}
      </Button>

      {!selectedStyle && (
        <p className="text-center text-sm text-slate-500 mt-3">
          Select a style to generate your headshot
        </p>
      )}
    </Card>
  );
};

export default StyleSelector;