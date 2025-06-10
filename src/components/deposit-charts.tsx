"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();


async function getData(): Promise<string> {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  const sql = neon(process.env.DATABASE_URL);
  const response = await sql`SELECT version()`;
  return response[0].version;
}
// Datos de ejemplo mejorados
const depositData = [
  { date: "Jun 1", deposits: 50, trend: 52 },
  { date: "Jun 15", deposits: 60, trend: 58 },
  { date: "Jul 1", deposits: 70, trend: 65 },
  { date: "Jul 15", deposits: 85, trend: 73 },
  { date: "Ago 1", deposits: 100, trend: 82 },
  { date: "Ago 15", deposits: 120, trend: 92 },
  { date: "Sep 1", deposits: 140, trend: 103 },
  { date: "Sep 15", deposits: 160, trend: 115 },
  { date: "Oct 1", deposits: 180, trend: 128 },
  { date: "Oct 15", deposits: 200, trend: 142 },
]

const amountData = [
  { date: "Jun 1", amount: 300, trend: 310 },
  { date: "Jun 15", amount: 320, trend: 315 },
  { date: "Jul 1", amount: 310, trend: 320 },
  { date: "Jul 15", amount: 340, trend: 325 },
  { date: "Ago 1", amount: 360, trend: 330 },
  { date: "Ago 15", amount: 350, trend: 335 },
  { date: "Sep 1", amount: 370, trend: 340 },
  { date: "Sep 15", amount: 390, trend: 345 },
  { date: "Oct 1", amount: 380, trend: 350 },
  { date: "Oct 15", amount: 400, trend: 355 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg">
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

export async function DepositCharts() {
    try {
    const data = await getData();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-0 hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            📈 Total de Depósitos
          </CardTitle>
          <p className="text-sm text-gray-600">Depósitos realizados por día con línea de tendencia</p>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={depositData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorDeposits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="deposits"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#colorDeposits)"
                name="Depósitos"
              />
              <Line
                type="monotone"
                dataKey="trend"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                name="Tendencia"
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-3 text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              R² = 0.77 • Tendencia Polinomial
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            💰 Evolución de Montos
          </CardTitle>
          <p className="text-sm text-gray-600">Montos por categoría con análisis de tendencia</p>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={amountData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#10b981"
                strokeWidth={3}
                fill="url(#colorAmount)"
                name="Monto ($)"
              />
              <Line
                type="monotone"
                dataKey="trend"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={false}
                name="Tendencia"
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-3 text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
              R² = 0.65 • Tendencia Polinomial
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
