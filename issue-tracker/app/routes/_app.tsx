import { createFileRoute, Outlet } from "@tanstack/react-router"
import { JazzProvider, PasskeyAuthBasicUI } from "jazz-react"
import { JazzInspector } from "jazz-inspector"
import { JazzAccount } from "~/schema"
import { SidebarProvider } from "~/components/ui/sidebar"
import { Header } from "~/components/header"
import { Footer } from "~/components/footer"

// We use this to identify the app in the passkey auth
export const APPLICATION_NAME = "Issue Tracker"

declare module "jazz-react" {
  export interface Register {
    Account: JazzAccount
  }
}

function LayoutComponent() {
  return (
    <>
      <JazzProvider
        sync={{
          peer: "wss://cloud.jazz.tools/?key=react-passkey-auth@garden.co",
          when: "signedUp", // makes users who have not signed up, store data only locally
        }}
        AccountSchema={JazzAccount}
      >
        <PasskeyAuthBasicUI appName="Issue Tracker">
          <main className="min-h-screen flex flex-col">
            <SidebarProvider>
              <Header />
              <div className="flex flex-col min-h-screen w-full pt-14">
                <div className="flex flex-1 w-full">
                  <Outlet />
                </div>
                <Footer />
              </div>
            </SidebarProvider>
          </main>
          {/* TODO: does not hide it for some reason */}
          {/* <div className="hidden">
            <JazzInspector />
          </div> */}
        </PasskeyAuthBasicUI>
      </JazzProvider>
    </>
  )
}

export const Route = createFileRoute("/_app")({
  component: LayoutComponent,
})
