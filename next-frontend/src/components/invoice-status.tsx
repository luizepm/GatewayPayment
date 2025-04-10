interface InvoiceStatusProps {
  status: string
}

export function InvoiceStatus({ status }: InvoiceStatusProps) {
  let bgColor = ""
  let text = ""

  switch (status) {
    case "aprovado":
      bgColor = "bg-green-500/20 text-green-500"
      text = "Aprovado"
      break
    case "pendente":
      bgColor = "bg-yellow-500/20 text-yellow-500"
      text = "Pendente"
      break
    case "rejeitado":
      bgColor = "bg-red-500/20 text-red-500"
      text = "Rejeitado"
      break
    default:
      bgColor = "bg-slate-500/20 text-slate-500"
      text = status
  }

  return <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${bgColor}`}>{text}</span>
}
