"use client"
import React from 'react'
import { MetricsData } from "@/components/metrics-data"

export default function metricsPage() {
  return (
    <div className="space-y-8">
        <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Métricas
            </h1>
        </div>
        <MetricsData />
    </div>
  )
}

