"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CreditCard, Lock } from "lucide-react"

export default function CreateInvoicePage() {
  const router = useRouter()
  const [value, setValue] = useState("")
  const [description, setDescription] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardName, setCardName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Em uma aplicação real, aqui teria a lógica de processamento do pagamento
    router.push("/invoices")
  }

  const handleCancel = () => {
    router.push("/invoices")
  }

  // Função para formatar o valor como moeda
  const formatCurrency = (value: string) => {
    // Remove tudo que não é número
    const numericValue = value.replace(/\D/g, "")

    // Converte para número e formata
    const floatValue = Number.parseFloat(numericValue) / 100
    return floatValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  // Função para formatar o número do cartão
  const formatCardNumber = (value: string) => {
    const numericValue = value.replace(/\D/g, "")
    const groups = numericValue.match(/.{1,4}/g)
    return groups ? groups.join(" ") : numericValue
  }

  // Calcula o valor da taxa e total
  const subtotal = Number.parseFloat(value.replace(/\D/g, "")) / 100 || 0
  const fee = subtotal * 0.02
  const total = subtotal + fee

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Criar Nova Fatura</h1>
          <p className="text-slate-400">Preencha os dados abaixo para processar um novo pagamento</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-4">
                <label htmlFor="value" className="block mb-2">
                  Valor
                </label>
                <Input
                  id="value"
                  type="text"
                  value={formatCurrency(value)}
                  onChange={(e) => setValue(e.target.value.replace(/\D/g, ""))}
                  className="bg-slate-700 border-slate-600"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block mb-2">
                  Descrição
                </label>
                <Textarea
                  id="description"
                  placeholder="Descreva o motivo do pagamento"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-slate-700 border-slate-600 min-h-[120px]"
                />
              </div>
            </div>

            <div className="bg-slate-700/50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Dados do Cartão</h2>

              <div className="mb-4">
                <label htmlFor="cardNumber" className="block mb-2">
                  Número do Cartão
                </label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={formatCardNumber(cardNumber)}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                    className="bg-slate-700 border-slate-600 pl-10"
                    maxLength={19}
                  />
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="expiryDate" className="block mb-2">
                    Data de Expiração
                  </label>
                  <Input
                    id="expiryDate"
                    type="text"
                    placeholder="MM/AA"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>

                <div>
                  <label htmlFor="cvv" className="block mb-2">
                    CVV
                  </label>
                  <div className="relative">
                    <Input
                      id="cvv"
                      type="text"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                      className="bg-slate-700 border-slate-600 pl-10"
                      maxLength={3}
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="cardName" className="block mb-2">
                  Nome no Cartão
                </label>
                <Input
                  id="cardName"
                  type="text"
                  placeholder="Como aparece no cartão"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="bg-slate-700 border-slate-600"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 border-t border-slate-700">
            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(subtotal)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Taxa de Processamento (2%)</span>
              <span>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(fee)}</span>
            </div>
            <div className="flex justify-between py-2 font-bold text-lg">
              <span>Total</span>
              <span>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(total)}</span>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Lock size={16} className="mr-2" />
              Processar Pagamento
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
