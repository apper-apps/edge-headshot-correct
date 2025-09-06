import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
            <ApperIcon name="Camera" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">
              HeadShot Pro
            </h1>
            <p className="text-sm text-slate-600">
              AI-Powered Professional Headshots
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="hidden sm:flex items-center space-x-6 text-sm text-slate-600">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Zap" size={16} className="text-primary" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2">
              <ApperIcon name="Clock" size={16} className="text-primary" />
              <span>5-10 seconds</span>
            </div>
            <div className="flex items-center space-x-2">
              <ApperIcon name="Shield" size={16} className="text-primary" />
              <span>Professional Quality</span>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;