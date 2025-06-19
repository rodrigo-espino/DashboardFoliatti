"use client";

import type React from "react"

import {
  DollarSign,
  UserCheck,
  Target,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

interface MetricCardProps {
  title: string
  value: string
  change: number
  changeLabel: string
  icon: React.ReactNode
  trend: "up" | "down"
  color: "blue" | "green" | "red" | "purple" | "emerald" | "orange"
}

const colorVariants = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/20",
    icon: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    trend: "text-blue-600 dark:text-blue-400",
  },
  green: {
    bg: "bg-green-50 dark:bg-green-950/20",
    icon: "text-green-600 dark:text-green-400",
    iconBg: "bg-green-100 dark:bg-green-900/30",
    trend: "text-green-600 dark:text-green-400",
  },
  red: {
    bg: "bg-red-50 dark:bg-red-950/20",
    icon: "text-red-600 dark:text-red-400",
    iconBg: "bg-red-100 dark:bg-red-900/30",
    trend: "text-red-600 dark:text-red-400",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-950/20",
    icon: "text-purple-600 dark:text-purple-400",
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    trend: "text-purple-600 dark:text-purple-400",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    icon: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    trend: "text-emerald-600 dark:text-emerald-400",
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-950/20",
    icon: "text-orange-600 dark:text-orange-400",
    iconBg: "bg-orange-100 dark:bg-orange-900/30",
    trend: "text-orange-600 dark:text-orange-400",
  },
}

function MetricCard({ title, value, change, changeLabel, icon, trend, color }: MetricCardProps) {
  const colors = colorVariants[color]
  const isPositive = trend === "up"

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${colors.iconBg} transition-colors group-hover:scale-110 duration-300`}>
                <div className={`w-5 h-5 ${colors.icon}`}>{icon}</div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-3xl font-bold tracking-tight">{value}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function MetricsData() {
  const metrics = [
    {
      title: "ARPU",
      value: "$4.3",
      change: 12.3,
      changeLabel: "vs mes anterior",
      icon: <DollarSign className="w-5 h-5" />,
      trend: "up" as const,
      color: "blue" as const,
    },
    {
      title: "CLTV",
      value: "$24.5",
      change: 8.7,
      changeLabel: "vs mes anterior",
      icon: <Target className="w-5 h-5" />,
      trend: "up" as const,
      color: "green" as const,
    },
      {
      title: "Customer Lifespan",
      value: "5.68 Años",
      change: 8.7,
      changeLabel: "vs mes anterior",
      icon: <Target className="w-5 h-5" />,
      trend: "up" as const,
      color: "green" as const,
    },
    {
      title: "Tasa de Retención",
      value: "82.4%",
      change: 2.0,
      changeLabel: "vs mes anterior",
      icon: <UserCheck className="w-5 h-5" />,
      trend: "up" as const,
      color: "emerald" as const,
    },

  ]

  return (
    <div className="space-y-8">
      {/* Header mejorado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <p className="text-lg text-muted-foreground">Indicadores clave de rendimiento</p>
        </div>
      </div>

      {/* Grid de métricas mejorado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={metric.title} className="col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-2">
            <MetricCard {...metric} />
          </div>
        ))}
      </div>
    </div>
  )
}
