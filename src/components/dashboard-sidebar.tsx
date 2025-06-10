"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Building2, CreditCard, Home, Settings } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function DashboardSidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  const routes = [
    {
      label: "Inicio",
      icon: Home,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Depósitos",
      icon: CreditCard,
      href: "/dashboard/deposits",
      active: pathname === "/dashboard/deposits",
    },
    {
      label: "Reportes",
      icon: BarChart3,
      href: "/dashboard/reports",
      active: pathname === "/dashboard/reports",
    },
    {
      label: "Configuración",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ]

  return (
    <div className={cn("hidden border-r bg-gradient-to-b from-white to-blue-50/30 md:block md:w-64", className)}>
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-16 items-center border-b bg-white/50 px-4">
          <Link href="/dashboard" className="flex items-center gap-3 transition-transform hover:scale-105">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg shadow-lg">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid gap-2 px-3">
            {routes.map((route, i) => (
              <Button
                key={i}
                asChild
                variant={route.active ? "default" : "ghost"}
                className={cn(
                  "justify-start h-11 transition-all duration-200",
                  route.active
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg hover:from-blue-700 hover:to-cyan-700"
                    : "hover:bg-blue-50 hover:text-blue-700 text-gray-700",
                )}
              >
                <Link href={route.href} className="flex items-center">
                  <route.icon className="mr-3 h-5 w-5" />
                  <span className="font-medium">{route.label}</span>
                </Link>
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
