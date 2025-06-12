"use client"

import {
  Bar, 
  BarChart, 
  CartesianGrid, 
  LabelList, 
  XAxis, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  YAxis,
  Tooltip,
  
} from "recharts"
import { useEffect, useState } from "react"
import { getAvgTransactionsWeekday, type WeekDayDeposits, getAvgTransactionsDayMonth, type DayMonthDeposits } from "@/lib/actions/deposits"
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "-1var(--chart)",
  },
} satisfies ChartConfig

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

export function DepositPerDay() {

    const [WeekDayData, setWeekDayData] = useState<WeekDayDeposits[]>([]);
    const [DayMonthData, setDayMonthData] = useState<DayMonthDeposits[]>([]);
    const [loading, setLoading] = useState(true)



  useEffect(() => {
    async function fetchData() {
      try {
        const dataWeekDay = await getAvgTransactionsWeekday()
        const dataDayMonth = await getAvgTransactionsDayMonth()

        setWeekDayData(dataWeekDay)
        setDayMonthData(dataDayMonth)


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
      {/* Gráfico: Promedio de Montos */}
      <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            Promedio de Depósitos por Día de la Semana 
          </CardTitle>
          <p className="text-sm text-gray-600">Montos promedio por día</p>
        </CardHeader>
        <CardContent className="h-80">
           <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
            accessibilityLayer
            data={WeekDayData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="dayname"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="transactions" fill="#1d4ed8" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
          </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>


      <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            Promedio de Depósitos por Día
          </CardTitle>
          <p className="text-sm text-gray-600">Depósitos realizados por día</p>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={DayMonthData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorDeposits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }}  domain={['dataMin - 5', 'dataMax + 5']}/>
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="transactions"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#colorDeposits)"
                name="Depósitos"
                dot={false}  
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
