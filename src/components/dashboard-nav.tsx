"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, CreditCard, Home, Settings } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function DashboardNav({ className }: { className?: string }) {
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
    <nav className={cn("grid gap-1", className)}>
      {routes.map((route, i) => (
        <Button key={i} asChild variant={route.active ? "secondary" : "ghost"} className="justify-start">
          <Link href={route.href}>
            <route.icon className="mr-2 h-4 w-4" />
            {route.label}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
