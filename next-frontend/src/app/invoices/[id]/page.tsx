"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download } from "lucide-react"
import { InvoiceStatus } from "@/components/invoice-status"
import { TransactionTimeline } from "@/components/transaction-timeline"

interface InvoiceDetailsPageProps {
  params: {
    id: string
  }
}

export default function InvoiceDetailsPage({ params }: InvoiceDetailsPageProps) {
  const invoiceId = `#${params.id.toUpperCase()}`

  // Em uma aplicação real, esses dados viriam de uma API
  const invoice = {
    id: invoiceId,
    value: 1500.0,
    createdAt: "30/03/2025 14:30",
    updatedAt: "30/03/2025 14:35",
    description: "Compra Online #123",
    status: "aprovado",
    paymentMethod: {
      type: "Cartão de Crédito",
      lastDigits: "1234",
      holder: "João da Silva",
    },
    additionalData: {
      accountId: "ACC-12345",
      clientIp: "192.168.1.1",
      device: "Desktop - Chrome",
    },
    timeline: [
      {
        title: "Fatura Criada",
        time: "30/03/2025 14:30",
        status: "success",
      },
      {
        title: "Pagamento Processado",
        time: "30/03/2025 14:32",
        status: "success",
      },
      {
        title: "Transação Aprovada",
        time: "30/03/2025 14:35",
        status: "success",
      },
    ],
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <Link href="/invoices">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft size={16} />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Fatura {invoiceId}</h1>
              <p className="text-slate-400 text-sm">Criada em {invoice.createdAt}</p>
            </div>
            <div className="ml-2">
              <InvoiceStatus status={invoice.status} />
            </div>
          </div>

          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            Download PDF
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-700/30 p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Informações da Fatura</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">ID da Fatura</span>
                <span>{invoice.id}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Valor</span>
                <span>R$ {invoice.value.toFixed(2).replace(".", ",")}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Data de Criação</span>
                <span>{invoice.createdAt}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Última Atualização</span>
                <span>{invoice.updatedAt}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Descrição</span>
                <span>{invoice.description}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-700/30 p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Status da Transação</h2>

            <TransactionTimeline timeline={invoice.timeline} />
          </div>

          <div className="bg-slate-700/30 p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Método de Pagamento</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Tipo</span>
                <span>{invoice.paymentMethod.type}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Últimos Dígitos</span>
                <span>**** **** **** {invoice.paymentMethod.lastDigits}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Titular</span>
                <span>{invoice.paymentMethod.holder}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-700/30 p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Dados Adicionais</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">ID da Conta</span>
                <span>{invoice.additionalData.accountId}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">IP do Cliente</span>
                <span>{invoice.additionalData.clientIp}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Dispositivo</span>
                <span>{invoice.additionalData.device}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
