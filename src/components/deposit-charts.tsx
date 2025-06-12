"use client"

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart
} from "recharts"
import { useEffect, useState } from "react"
import { getTransactionsRecord, type ChartData } from "@/lib/actions/deposits"
import { fitTrendline } from "@/lib/utils/trendline"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900">{`Fecha: ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function DepositCharts() {
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  
  const [r2Deposits, setR2Deposits] = useState<number | null>(null)
  const [r2Amounts, setR2Amounts] = useState<number | null>(null)
  
  const [modelDeposits, setmodelDeposits] = useState<string | null>(null);
  const [modelAmounts, setmodelAmounts] = useState<string | null>(null);



  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTransactionsRecord()

        // === Tendencia para "Deposits"
        const xTimestamps = data.map((d) => new Date(d.Date).getTime())
        const yDeposits = data.map((d) => d.Deposits)
        const { yPred: depositTrend, model: modelDeposits, r2:r2Deposits } = fitTrendline(xTimestamps, yDeposits)
        setR2Deposits(r2Deposits)
        setmodelDeposits(modelDeposits)

        // === Tendencia para "Amount"
        const yAmounts = data.map((d) => d.Amount)
        const { yPred: amountTrend, model: modelAmounts, r2: r2Amounts } = fitTrendline(xTimestamps, yAmounts)
        setR2Amounts(r2Amounts)
        setmodelAmounts(modelAmounts)
        // === Agrega ambas tendencias a los datos
        const enrichedData = data.map((d, i) => ({
          ...d,
          DepositTrend: depositTrend[i],
          AmountTrend: amountTrend[i],
        }))

        setChartData(enrichedData)
      } catch (error) {
        console.error("Error fetching chart data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2].map((i) => (
          <Card key={i} className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="h-6 bg-gray-200 rounded animate-pulse" />
            </CardHeader>
            <CardContent className="h-80">
              <div className="h-full bg-gray-100 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Gráfico: Total de Depósitos */}
      <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            Total de Depósitos
          </CardTitle>
          <p className="text-sm text-gray-600">Depósitos realizados por día</p>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorDeposits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="Date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="Deposits"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#colorDeposits)"
                name="Depósitos"
                dot={false}  
              />
              <Line
                type="monotone"
                dataKey="DepositTrend"
                stroke="#f70505"
                strokeWidth={2}
                dot={false}
                name="Tendencia"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-3 text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {
                r2Deposits !== null && (
                  <span className="...">
                    R² = {r2Deposits.toFixed(4)} • Tendencia {modelDeposits}
                  </span>
              )}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico: Promedio de Montos */}
      <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            Promedio de Montos
          </CardTitle>
          <p className="text-sm text-gray-600">Montos promedio por día</p>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="Date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="Amount"
                stroke="#10b981"
                strokeWidth={3}
                fill="url(#colorAmount)"
                name="Monto Promedio ($)"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="AmountTrend"
                stroke="#f70505"
                strokeWidth={2}
                dot={false}
                name="Tendencia"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-3 text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {
                r2Amounts !== null && (
                  <span className="...">
                    R² = {r2Amounts.toFixed(4)} • Tendencia {modelAmounts}
                  </span>
              )}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
