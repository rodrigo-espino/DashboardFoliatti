import { Building, CreditCard, DollarSign, TrendingUp } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DepositStats() {
  const stats = [
    {
      title: "Total de depósitos",
      value: "29,390",
      icon: Building,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      change: "+12.5%",
      changeType: "positive" as const,
    },
    {
      title: "Promedio de depósitos por día",
      value: "95",
      icon: CreditCard,
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-50 to-emerald-100",
      change: "+8.2%",
      changeType: "positive" as const,
    },
    {
      title: "Promedio de Monto",
      value: "$346.98",
      icon: DollarSign,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
      change: "+15.3%",
      changeType: "positive" as const,
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          className="relative overflow-hidden border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-50`} />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.gradient}`}>
              <stat.icon className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className="flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">{stat.change}</span>
              <span className="text-gray-500 ml-1">vs mes anterior</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
