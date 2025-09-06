import { motion } from "framer-motion";

const Loading = ({ type = "default" }) => {
  if (type === "upload") {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <motion.div
            className="w-12 h-12 mx-auto mb-4 border-4 border-primary/20 border-t-primary rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-slate-600">Processing your upload...</p>
        </div>
      </div>
    );
  }

  if (type === "generation") {
    return (
      <div className="text-center p-8">
        <motion.div
          className="w-16 h-16 mx-auto mb-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-full h-full rounded-full bg-gradient-primary opacity-20" />
          <motion.div
            className="w-full h-full rounded-full bg-gradient-primary -mt-16"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{
              background: "conic-gradient(from 0deg, #2563eb, #7c3aed, #06b6d4, #2563eb)",
            }}
          />
        </motion.div>
        <h3 className="text-xl font-display font-semibold text-slate-800 mb-2">
          Generating Your Headshot
        </h3>
        <p className="text-slate-600">
          Our AI is creating your professional headshot...
        </p>
      </div>
    );
  }

  return (
    <div className="animate-pulse space-y-4 p-6">
      <div className="bg-slate-200 h-4 rounded w-3/4"></div>
      <div className="bg-slate-200 h-4 rounded w-1/2"></div>
      <div className="bg-slate-200 h-32 rounded-lg"></div>
      <div className="flex space-x-2">
        <div className="bg-slate-200 h-10 rounded flex-1"></div>
        <div className="bg-slate-200 h-10 rounded w-20"></div>
      </div>
    </div>
  );
};

export default Loading;