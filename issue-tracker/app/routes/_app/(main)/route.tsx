import { Outlet, createFileRoute } from "@tanstack/react-router"
import { MainSidebar } from "~/components/main-sidebar"
import { SidebarInset } from "~/components/ui/sidebar"

export const Route = createFileRoute("/_app/(main)")({
  component: Component,
})

function Component() {
  return (
    <div className="flex w-full h-[calc(100vh-3.5rem)]">
      <MainSidebar />
      <SidebarInset className="w-full">
        <main className="flex-1 overflow-auto w-full">
          <Outlet />
        </main>
      </SidebarInset>
    </div>
  )
}
