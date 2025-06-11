"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area } from "recharts"

// Datos de ejemplo mejorados para la predicción
const predictionData = [
  { date: "Jun", historical: 400, prediction: null, lowerBound: null, upperBound: null },
  { date: "Jul", historical: 420, prediction: null, lowerBound: null, upperBound: null },
  { date: "Ago", historical: 380, prediction: null, lowerBound: null, upperBound: null },
  { date: "Sep", historical: 450, prediction: null, lowerBound: null, upperBound: null },
  { date: "Oct", historical: 500, prediction: null, lowerBound: null, upperBound: null },
  { date: "Nov", historical: 480, prediction: null, lowerBound: null, upperBound: null },
  { date: "Dic", historical: 520, prediction: null, lowerBound: null, upperBound: null },
  { date: "Ene", historical: 550, prediction: null, lowerBound: null, upperBound: null },
  { date: "Feb", historical: 530, prediction: null, lowerBound: null, upperBound: null },
  { date: "Mar", historical: 580, prediction: null, lowerBound: null, upperBound: null },
  // Datos de predicción
  { date: "Abr", historical: null, prediction: 600, lowerBound: 550, upperBound: 650 },
  { date: "May", historical: null, prediction: 620, lowerBound: 560, upperBound: 680 },
  { date: "Jun", historical: null, prediction: 640, lowerBound: 570, upperBound: 710 },
  { date: "Jul", historical: null, prediction: 660, lowerBound: 580, upperBound: 740 },
  { date: "Ago", historical: null, prediction: 680, lowerBound: 590, upperBound: 770 },
  { date: "Sep", historical: null, prediction: 700, lowerBound: 600, upperBound: 800 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg ">
        <p className="font-medium text-gray-900 mb-2">{`Período: ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm flex items-center gap-2" style={{ color: entry.color }}>
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
            {`${entry.name}: $${entry.value}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function DepositPrediction() {
  return (
    <Card className="border-0 hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
          Predicción de Depósitos
        </CardTitle>
        <p className="text-sm text-gray-600">Análisis predictivo usando modelo SARIMA con intervalos de confianza</p>
      </CardHeader>
      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={predictionData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="confidenceInterval" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d1fae5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#d1fae5" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />

            {/* Área de confianza */}
            <Area
              type="monotone"
              dataKey="upperBound"
              stroke="none"
              fill="url(#confidenceInterval)"
              name="Intervalo Superior"
            />
            <Area
              type="monotone"
              dataKey="lowerBound"
              stroke="none"
              fill="url(#confidenceInterval)"
              name="Intervalo Inferior"
            />

            {/* Líneas principales */}
            <Line
              type="monotone"
              dataKey="historical"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4, fill: "#3b82f6" }}
              activeDot={{ r: 6, fill: "#3b82f6" }}
              name="Datos Históricos"
            />
            <Line
              type="monotone"
              dataKey="prediction"
              stroke="#10b981"
              strokeWidth={3}
              strokeDasharray="8 4"
              dot={{ r: 4, fill: "#10b981" }}
              activeDot={{ r: 6, fill: "#10b981" }}
              name="Predicción SARIMA"
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            📊 Modelo SARIMA
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            📈 Confianza: 95%
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            🎯 Precisión: 87%
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
