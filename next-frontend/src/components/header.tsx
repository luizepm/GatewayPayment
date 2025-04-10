"use client"

import Link from "next/link"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Header() {
  const router = useRouter()

  const handleLogout = () => {
    // Em uma aplicação real, aqui teria a lógica de logout
    router.push("/auth")
  }

  return (
    <header className="w-full bg-slate-900 border-b border-slate-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/invoices" className="text-xl font-bold">
          Full Cycle Gateway
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-300">Olá, usuário</span>
          <Button variant="destructive" size="sm" onClick={handleLogout} className="flex items-center gap-1">
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
