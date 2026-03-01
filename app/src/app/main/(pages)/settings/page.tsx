import { AppShell } from "@/src/components/app-shell"
import { SettingsView } from "@/src/components/settings/settingsView"


// Configurações do usuário - Página
export default function SettingsPage() {

  return (
    <AppShell>
      <SettingsView />
    </AppShell>
  )
}
