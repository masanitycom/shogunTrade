import type React from "react"
import { motion } from "framer-motion"

export const AnimatedLogo: React.FC = () => (
  <motion.div
    className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full shadow-lg"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
  >
    <motion.span
      className="text-3xl font-bold text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      MLM
    </motion.span>
  </motion.div>
)

