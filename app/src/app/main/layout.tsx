// import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar"
// import { AppSidebar } from "@/src/components/appSidebar"

import { Toaster } from '@/src/components/ui/sonner'


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      {children}
      <Toaster richColors position="top-right" />
    </main>
  );
}
