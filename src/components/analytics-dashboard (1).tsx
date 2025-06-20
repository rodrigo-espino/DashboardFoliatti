"use client";
import {
  Users,
  MousePointer,
  Clock,
  Target,
  Search,
  Eye,
  Activity,
  Zap,
  Settings,
  Globe,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { ChartTooltip } from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Datos de Google Analytics 4
const metricsData = [
  {
    title: "Usuarios activos (28 días)",
    value: "6,420",
    change: "+12.5%",
    icon: Users,
    period: "Últimos 28 días",
    isPositive: true,
    textColor: "text-violet-900",
    color: "bg-violet-900",
  },
  {
    title: "Usuarios activos",
    value: "1,580",
    change: "+8.2%",
    icon: Eye,
    period: "Período actual",
    isPositive: true,
    textColor: "text-violet-900",
    color: "bg-violet-900",
  },
  {
    title: "Sesiones totales",
    value: "11,890",
    change: "+15.3%",
    icon: Activity,
    period: "Sesiones iniciadas",
    isPositive: true,
    textColor: "text-violet-900",
    color: "bg-violet-900",
  },
  {
    title: "Duración promedio",
    value: "2m 45s",
    change: "+5.7%",
    icon: Clock,
    period: "Tiempo por sesión",
    isPositive: true,
    textColor: "text-violet-900",
    color: "bg-violet-900",
  },
];

const behaviorMetrics = [
  {
    title: "Porcentaje de rebote",
    value: "27.6%",
    change: "-3.2%",
    icon: Target,
    period: "Sesiones sin participación",
    isPositive: true,
    textColor: "text-violet-900",
    color: "bg-violet-900",
  },
  {
    title: "CTR búsqueda orgánica",
    value: "5.88%",
    change: "+2.1%",
    icon: Search,
    period: "Clics desde Google",
    isPositive: true,
    textColor: "text-violet-900",
    color: "bg-violet-900",
  },
  {
    title: "Clics en anuncios",
    value: "5,790",
    change: "+18.7%",
    icon: MousePointer,
    period: "Eventos ad_click",
    isPositive: true,
    textColor: "text-violet-900",
    color: "bg-violet-900",
  },
  {
    title: "Participación total",
    value: "847h",
    change: "+22.4%",
    icon: Zap,
    period: "Tiempo en primer plano",
    isPositive: true,
    textColor: "text-violet-900",
    color: "bg-violet-900",
  },
];

// Datos de sesiones por día
const sessionsData = [
  { day: "Lun", sessions: 1200, users: 980 },
  { day: "Mar", sessions: 1450, users: 1150 },
  { day: "Mié", sessions: 1320, users: 1080 },
  { day: "Jue", sessions: 1680, users: 1340 },
  { day: "Vie", sessions: 1890, users: 1520 },
  { day: "Sáb", sessions: 2100, users: 1680 },
  { day: "Dom", sessions: 1950, users: 1580 },
];

// Datos de campañas
const campaignsData = [
  { day: "1", "Campaña Verano": 2000, "Black Friday": 2400, "Año Nuevo": 1800 },
  { day: "2", "Campaña Verano": 1800, "Black Friday": 2200, "Año Nuevo": 1600 },
  { day: "3", "Campaña Verano": 2200, "Black Friday": 2600, "Año Nuevo": 2000 },
  { day: "4", "Campaña Verano": 2400, "Black Friday": 2800, "Año Nuevo": 2200 },
  { day: "5", "Campaña Verano": 2600, "Black Friday": 3000, "Año Nuevo": 2400 },
  { day: "6", "Campaña Verano": 2800, "Black Friday": 3200, "Año Nuevo": 2600 },
  { day: "7", "Campaña Verano": 3000, "Black Friday": 3400, "Año Nuevo": 2800 },
  { day: "8", "Campaña Verano": 2800, "Black Friday": 3200, "Año Nuevo": 2600 },
  { day: "9", "Campaña Verano": 2600, "Black Friday": 3000, "Año Nuevo": 2400 },
  {
    day: "10",
    "Campaña Verano": 2400,
    "Black Friday": 2800,
    "Año Nuevo": 2200,
  },
  {
    day: "11",
    "Campaña Verano": 2200,
    "Black Friday": 2600,
    "Año Nuevo": 2000,
  },
  {
    day: "12",
    "Campaña Verano": 2400,
    "Black Friday": 2800,
    "Año Nuevo": 2200,
  },
  {
    day: "13",
    "Campaña Verano": 2600,
    "Black Friday": 3000,
    "Año Nuevo": 2400,
  },
  {
    day: "14",
    "Campaña Verano": 2800,
    "Black Friday": 3200,
    "Año Nuevo": 2600,
  },
  {
    day: "15",
    "Campaña Verano": 3200,
    "Black Friday": 3600,
    "Año Nuevo": 3000,
  },
];

// Datos de fuentes de tráfico
const trafficSourcesData = [
  {
    source: "Google Orgánico",
    clicks: 3450,
    impressions: 58700,
    ctr: 5.88,
    status: "Active",
  },
  {
    source: "Facebook Ads",
    clicks: 2340,
    impressions: 45200,
    ctr: 5.18,
    status: "Active",
  },
  {
    source: "Instagram Ads",
    clicks: 1890,
    impressions: 38900,
    ctr: 4.86,
    status: "Active",
  },
  {
    source: "Bing Orgánico",
    clicks: 890,
    impressions: 22100,
    ctr: 4.03,
    status: "Pending",
  },
  {
    source: "YouTube Ads",
    clicks: 1560,
    impressions: 31200,
    ctr: 5.0,
    status: "Active",
  },
];

// Datos de campañas detalladas
const campaignDetailsData = [
  {
    name: "Campaña Verano 2024",
    clicks: 2340,
    sessions: 1890,
    users: 1520,
    ctr: "5.2%",
  },
  {
    name: "Black Friday",
    clicks: 1890,
    sessions: 1450,
    users: 1180,
    ctr: "4.8%",
  },
  { name: "Año Nuevo", clicks: 1560, sessions: 1200, users: 980, ctr: "4.5%" },
  {
    name: "Promoción Primavera",
    clicks: 1230,
    sessions: 980,
    users: 780,
    ctr: "4.1%",
  },
  {
    name: "Descuento Estudiantes",
    clicks: 890,
    sessions: 720,
    users: 580,
    ctr: "3.9%",
  },
];

export default function AnalyticsDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="max-w-full mx-auto rounded-3xl overflow-hidden">
        <div>
          {/* Main Content */}
          <div className="w-full p-8">
            {/* Metrics Cards - Usuarios */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Audiencia
              </h2>
              <div className="grid grid-cols-4 gap-6">
                {metricsData.map((metric, index) => {
                  const IconComponent = metric.icon;
                  return (
                    <Card
                      key={index}
                      className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-40"
                    >
                      <CardContent className="p-4">
                        {" "}
                        {/* Cambiado de p-6 a p-4 */}
                        {/* Título e ícono alineados */}
                        <div className="flex items-start justify-between mb-2">
                          {" "}
                          {/* mb-4 → mb-2 */}
                          <h3 className="text-sm font-medium text-gray-600 leading-tight flex-1">
                            {metric.title}
                          </h3>
                          <IconComponent
                            className={`w-5 h-5 ${metric.textColor} ml-3 flex-shrink-0`} // w-6 h-6 → w-5 h-5
                          />
                        </div>
                        {/* Valor principal */}
                        <div className="flex items-baseline gap-2 mb-2">
                          {" "}
                          {/* mb-3 → mb-2 */}
                          <span className="text-3xl font-bold text-gray-900">
                            {metric.value}
                          </span>
                        </div>
                        {/* Parte inferior: descripción + cambio */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {metric.period}
                          </span>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            <span className="text-sm font-semibold text-green-700">
                              {metric.change}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Behavior Metrics */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Comportamiento
              </h2>
              <div className="grid grid-cols-4 gap-6">
                {behaviorMetrics.map((metric, index) => {
                  const IconComponent = metric.icon;
                  return (
                    <Card
                      key={index}
                      className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-40"
                    >
                      <CardContent className="p-4">
                        {/* Título e ícono alineados */}
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-sm font-medium text-gray-600 leading-tight flex-1">
                            {metric.title}
                          </h3>
                          <IconComponent
                            className={`w-5 h-5 ${metric.textColor} ml-3 flex-shrink-0`}
                          />
                        </div>

                        {/* Valor principal */}
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-3xl font-bold text-gray-900">
                            {metric.value}
                          </span>
                        </div>

                        {/* Parte inferior: descripción + cambio */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {metric.period}
                          </span>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            <span className="text-sm font-semibold text-green-700">
                              {metric.change}
                            </span>
                          </div>
                        </div>

                        {/* Línea decorativa inferior */}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Sessions Chart */}
              <Card className="bg-white border-0">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Sesiones por día
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      7 días <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sessionsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="day" stroke="#888" />
                        <YAxis stroke="#888" />
                        <ChartTooltip
                          contentStyle={{
                            backgroundColor: "#1f2937",
                            border: "none",
                            borderRadius: "8px",
                            color: "white",
                          }}
                        />
                        <Bar
                          dataKey="sessions"
                          fill="#5d0ec0"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg text-violet-900 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Sesiones: 11,890</span>
                      <span className="text-violet-900">
                        ↗ 15.3% vs período anterior
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Campaigns Chart */}
              <Card className="bg-white border-0">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Rendimiento de campañas
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      15 días <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={campaignsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="day" stroke="#888" />
                        <YAxis stroke="#888" />
                        <ChartTooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "none",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="Campaña Verano"
                          stroke="#008236"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="Black Friday"
                          stroke="#f0b100"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="Año Nuevo"
                          stroke="#7008e7"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-700"></div>
                      <span className="text-gray-600">Campaña Verano</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-gray-600">Black Friday</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-violet-900"></div>
                      <span className="text-gray-600">Año Nuevo</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tables */}
            <div className="grid grid-cols-2 gap-6">
              {/* Traffic Sources */}
              <Card className="bg-white border-0">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Fuentes de tráfico
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 text-sm font-medium text-gray-600">
                            Fuente
                          </th>
                          <th className="text-left py-3 text-sm font-medium text-gray-600">
                            Clics
                          </th>
                          <th className="text-left py-3 text-sm font-medium text-gray-600">
                            CTR
                          </th>
                          <th className="text-left py-3 text-sm font-medium text-gray-600">
                            Estado
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {trafficSourcesData.map((item, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-3 text-sm text-gray-900">
                              {item.source}
                            </td>
                            <td className="py-3 text-sm text-gray-900">
                              {item.clicks.toLocaleString()}
                            </td>
                            <td className="py-3 text-sm font-medium text-gray-900">
                              {item.ctr}%
                            </td>
                            <td className="py-3">
                              <Badge
                                variant="secondary"
                                className={`text-xs ${
                                  item.status === "Active"
                                    ? "text-green-700 bg-green-50"
                                    : "text-violet-900 bg-violet-50"
                                }`}
                              >
                                {item.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Campaign Details */}
              <Card className="bg-white border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Detalle de campañas
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      Este mes <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 text-sm font-medium text-gray-600">
                            Campaña
                          </th>
                          <th className="text-left py-3 text-sm font-medium text-gray-600">
                            Clics
                          </th>
                          <th className="text-left py-3 text-sm font-medium text-gray-600">
                            Sesiones
                          </th>
                          <th className="text-left py-3 text-sm font-medium text-gray-600">
                            CTR
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {campaignDetailsData.map((item, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-3 text-sm text-gray-900">
                              {item.name}
                            </td>
                            <td className="py-3 text-sm text-gray-900">
                              {item.clicks.toLocaleString()}
                            </td>
                            <td className="py-3 text-sm text-gray-600">
                              {item.sessions.toLocaleString()}
                            </td>
                            <td className="py-3">
                              <Badge
                                variant="secondary"
                                className="text-xs text-green-700 bg-green-50"
                              >
                                {item.ctr}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
