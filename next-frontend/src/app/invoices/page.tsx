"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Eye, Download, ChevronLeft, ChevronRight } from "lucide-react"
import { InvoiceStatus } from "@/components/invoice-status"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// Dados de exemplo
const invoices = [
  {
    id: "#INV-001",
    date: new Date("2025-03-30"),
    description: "Compra Online #123",
    value: 1500.0,
    status: "aprovado",
  },
  {
    id: "#INV-002",
    date: new Date("2025-03-29"),
    description: "Serviço Premium",
    value: 15000.0,
    status: "pendente",
  },
  {
    id: "#INV-003",
    date: new Date("2025-03-28"),
    description: "Assinatura Mensal",
    value: 99.9,
    status: "rejeitado",
  },
]

export default function InvoicesPage() {
  const [status, setStatus] = useState("todos")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Faturas</h1>
            <p className="text-slate-400">Gerencie suas faturas e acompanhe os pagamentos</p>
          </div>
          <Link href="/invoices/create">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Plus size={16} className="mr-2" />
              Nova Fatura
            </Button>
          </Link>
        </div>

        <div className="bg-slate-700/50 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm mb-1">Status</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="aprovado">Aprovado</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="rejeitado">Rejeitado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm mb-1">Data Inicial</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-slate-700 border-slate-600"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Data Final</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-slate-700 border-slate-600"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Buscar</label>
              <Input
                type="text"
                placeholder="ID ou descrição"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-700 border-slate-600"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs uppercase text-slate-400 border-b border-slate-700">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">DATA</th>
                <th className="py-3 px-4">DESCRIÇÃO</th>
                <th className="py-3 px-4">VALOR</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-slate-700 hover:bg-slate-700/30">
                  <td className="py-4 px-4">{invoice.id}</td>
                  <td className="py-4 px-4">{format(invoice.date, "dd/MM/yyyy", { locale: ptBR })}</td>
                  <td className="py-4 px-4">{invoice.description}</td>
                  <td className="py-4 px-4">
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(invoice.value)}
                  </td>
                  <td className="py-4 px-4">
                    <InvoiceStatus status={invoice.status} />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <Link href={`/invoices/${invoice.id.replace("#", "")}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye size={16} />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="text-slate-400">Mostrando 1 - 3 de 50 resultados</div>
          <div className="flex gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronLeft size={16} />
            </Button>
            <Button variant="default" size="sm" className="h-8 w-8 bg-indigo-600 text-white">
              1
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8">
              2
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8">
              3
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
