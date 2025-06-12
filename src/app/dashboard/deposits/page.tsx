import { DepositStats } from "@/components/deposit-stats"
import { DepositCharts } from "@/components/deposit-charts"
import { DepositPrediction } from "@/components/deposit-prediction"
import { Suspense } from "react"

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

export default function DepositsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Dashboard de Depósitos
          </h1>
        </div>
        {/* <div className="flex gap-3">
          <Button variant="outline" className="hover:bg-blue-50">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Depósito
          </Button>
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
        </div> */}
      </div>

      {/* Stats */}
      <div >
        <Suspense fallback={<LoadingCard />}>
          <DepositStats />
        </Suspense>
      </div>

      {/* Charts */}
      <div >
        <DepositCharts />
      </div>

      {/* Recent Deposits and Prediction */}
      <div className="grid gap-6 ">
        <Suspense fallback={<LoadingCard />}>
        </Suspense>
        <DepositPrediction />
      </div>
    </div>
  )
}
