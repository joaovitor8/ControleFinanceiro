// Arquivo que define funções personalizada para exibir notificações.

import { toast as sonnerToast } from "sonner"

type ToastProps = {
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}


function toast({ title, description, variant, ...props }: ToastProps) {
  if (variant === "destructive") {
    return sonnerToast.error(title, {
      description: description,
      action: props.action,
      ...props,
    })
  }

  return sonnerToast(title, {
    description: description,
    action: props.action,
    ...props,
  })
}


function useToast() {
  return {
    toast,
    dismiss: (toastId?: string) => sonnerToast.dismiss(toastId),
  }
}

export { useToast, toast }
