"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Building2, LogOut, Menu, User, Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { DashboardNav } from "@/components/dashboard-nav"

import { logout } from "@/lib/auth"

export function DashboardHeader() {
  const router = useRouter()
  

  const handleLogout = async () => {
    await logout()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center gap-4 px-4 md:px-6">
        <div className="flex items-center gap-2 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0 hover:bg-blue-50">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 pr-0 bg-white">
              <div className="flex items-center gap-2 border-b pb-4 pt-2">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Dashboard
                </span>
              </div>
              <DashboardNav className="py-4" />
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:flex md:items-center md:gap-3">
          <Link href="/dashboard" className="flex items-center gap-3 transition-transform hover:scale-105">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg shadow-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </Link>
        </div>

        {/* Right side */}
        <div className="flex flex-1 items-center justify-end gap-3">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative hover:bg-blue-50">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 hover:bg-red-500">3</Badge>
            <span className="sr-only">Notifications</span>
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 hover:from-blue-200 hover:to-cyan-200 transition-all duration-200"
              >
                <User className="h-5 w-5 text-blue-700" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-sm">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Usuario</p>
                  <p className="text-xs leading-none text-muted-foreground">usuario@empresa.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-blue-50">
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-blue-50">
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:bg-red-50 hover:text-red-700">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
