"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InfoIcon as InfoCircle, ArrowRight } from "lucide-react"

export default function AuthPage() {
  const [apiKey, setApiKey] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Em uma aplicação real, aqui teria a validação da API Key
    if (apiKey.trim()) {
      router.push("/invoices")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
      <div className="w-full max-w-md p-8 bg-slate-800 rounded-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Autenticação Gateway</h1>
          <p className="text-slate-400">Insira sua API Key para acessar o sistema</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="apiKey" className="block mb-2 text-sm">
              API Key
            </label>
            <div className="flex gap-2">
              <Input
                id="apiKey"
                type="text"
                placeholder="Digite sua API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="bg-slate-700"
              />
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <ArrowRight size={20} />
              </Button>
            </div>
          </div>
        </form>

        <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
          <div className="flex gap-2 items-start">
            <InfoCircle size={20} className="text-blue-400 mt-0.5" />
            <div>
              <h3 className="font-medium mb-1">Como obter uma API Key?</h3>
              <p className="text-sm text-slate-400">
                Para obter sua API Key, você precisa criar uma conta de comerciante. Entre em contato com nosso suporte
                para mais informações.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
