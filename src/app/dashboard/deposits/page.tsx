"use client"

import { motion } from "framer-motion"
import { DepositStats } from "@/components/deposit-stats"
import { DepositCharts } from "@/components/deposit-charts"
import { DepositPrediction } from "@/components/deposit-prediction"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw, Filter } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
}

export default function DepositsPage() {
  return (
    <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        variants={itemVariants}
      >
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Dashboard de Depósitos
          </h1>
          <p className="text-gray-600 mt-2">Análisis completo de depósitos y predicciones basadas en IA</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="hover:bg-blue-50">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Button variant="outline" className="hover:bg-blue-50">
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualizar
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants}>
        <DepositStats />
      </motion.div>

      {/* Charts */}
      <motion.div variants={itemVariants}>
        <DepositCharts />
      </motion.div>

      {/* Prediction */}
      <motion.div variants={itemVariants}>
        <DepositPrediction />
      </motion.div>
    </motion.div>
  )
}
