import { Avatar, AvatarFallback } from "@/src/components/ui/avatar"

export function RecentTransactions() {
  return (
    <div className="space-y-6">
      {/* Item 1 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-9 w-9 bg-zinc-800 border border-zinc-700">
            <AvatarFallback className="text-zinc-400 text-xs">NF</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium text-zinc-100 leading-none">Netflix</p>
            <p className="text-xs text-zinc-500">Assinatura</p>
          </div>
        </div>
        <div className="font-medium text-rose-500 text-sm">- R$ 55,90</div>
      </div>

      {/* Item 2 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-9 w-9 bg-zinc-800 border border-zinc-700">
            <AvatarFallback className="text-zinc-400 text-xs">Sal</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium text-zinc-100 leading-none">Salário</p>
            <p className="text-xs text-zinc-500">Receita</p>
          </div>
        </div>
        <div className="font-medium text-emerald-500 text-sm">+ R$ 4.500,00</div>
      </div>
       {/* Adicione mais itens mockados se quiser */}
    </div>
  )
}
