"use client"

import { useState } from "react"
import { Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DateFilterProps {
  onFilterChange: (startDate?: string, endDate?: string) => void
  startDate?: string
  endDate?: string
}

export function DateFilter({ onFilterChange, startDate, endDate }: DateFilterProps) {
  const [localStartDate, setLocalStartDate] = useState(startDate || "")
  const [localEndDate, setLocalEndDate] = useState(endDate || "")

  const handleApplyFilter = () => {
    onFilterChange(localStartDate || undefined, localEndDate || undefined)
  }

  const handleClearFilter = () => {
    setLocalStartDate("")
    setLocalEndDate("")
    onFilterChange(undefined, undefined)
  }

  const hasActiveFilter = startDate || endDate

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={`hover:bg-blue-50 ${hasActiveFilter ? "bg-blue-50 border-blue-300" : ""}`}>
          <Calendar className="mr-2 h-4 w-4" />
          Filtrar por fecha
          {hasActiveFilter && (
            <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">Activo</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              Filtrar por Fecha
              {hasActiveFilter && (
                <Button variant="ghost" size="sm" onClick={handleClearFilter} className="h-8 w-8 p-0 hover:bg-red-50">
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="start-date" className="text-sm font-medium">
                Fecha de inicio
              </Label>
              <Input
                id="start-date"
                type="date"
                value={localStartDate}
                onChange={(e) => setLocalStartDate(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end-date" className="text-sm font-medium">
                Fecha de fin
              </Label>
              <Input
                id="end-date"
                type="date"
                value={localEndDate}
                onChange={(e) => setLocalEndDate(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleApplyFilter}
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                Aplicar Filtro
              </Button>
              <Button variant="outline" onClick={handleClearFilter} className="flex-1">
                Limpiar
              </Button>
            </div>

            {hasActiveFilter && (
              <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                <strong>Filtro activo:</strong>
                <br />
                {startDate && `Desde: ${new Date(startDate).toLocaleDateString("es-ES")}`}
                {startDate && endDate && <br />}
                {endDate && `Hasta: ${new Date(endDate).toLocaleDateString("es-ES")}`}
              </div>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
