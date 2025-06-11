// import { Building, CreditCard, DollarSign, TrendingUp } from "lucide-react"
import { Building, CreditCard, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { getDepositStats } from "@/lib/actions/deposits"

export async function DepositStats({ filters }: { filters?: any }) {
  const stats = await getDepositStats()
  const statsData = [
    {
      title: "Total de depósitos",
      value: stats.totalDeposits.toLocaleString(),
      icon: Building,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",

    },
    {
      title: "Promedio de depósitos por día",
      value: Math.round(stats.averageDepositsPerDay).toString(),
      icon: CreditCard,
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-50 to-emerald-100",

    }, 
    {
      title: "Promedio de Monto",
      value: `$${stats.averageAmount.toFixed(2)}`,
      icon: DollarSign,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",

    }
  ]
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {statsData.map((stat, index) => (
        <Card
          key={stat.title}
          className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-50`} />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.gradient} shadow-lg`}>
              <stat.icon className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className="flex items-center text-sm">
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
