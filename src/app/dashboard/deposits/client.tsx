"use client"

import { useState, Suspense } from "react"
import { DateFilter } from "@/components/date-filter"
import { DepositCharts } from "@/components/deposit-charts"
import { DepositPerDay } from "@/components/deposit-per-day"
import { DepositStats } from "@/components/deposit-stats"

export default function DepositsClient({ session }: { session: any }) {
  const [dateFilter, setDateFilter] = useState<{ startDate?: string; endDate?: string }>({})
  const [refreshKey, setRefreshKey] = useState(0)

  const handleFilterChange = (startDate?: string, endDate?: string) => {
    setDateFilter({ startDate, endDate })
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Dashboard de Depósitos
        </h1>
        
        <DateFilter
          onFilterChange={handleFilterChange}
          startDate={dateFilter.startDate}
          endDate={dateFilter.endDate}
        />
      </div>
      <DepositStats startDate={dateFilter.startDate} endDate={dateFilter.endDate}/>
      <DepositCharts startDate={dateFilter.startDate} endDate={dateFilter.endDate}/>
      <Suspense fallback={<LoadingCard />}>
        <DepositPerDay startDate={dateFilter.startDate} endDate={dateFilter.endDate}/>
      </Suspense>
    </div>
  )
}

function LoadingCard() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="h-32 bg-gray-100 rounded"></div>
      </div>
    </div>
  )
}
