import { useSyncExternalStore } from "react"

function useHydrated() {
  return useSyncExternalStore(
    () => {
      return () => {}
    },
    () => true,
    () => false,
  )
}

export const ClientOnly = ({ children }: React.PropsWithChildren) => {
  const hydrated = useHydrated()
  return hydrated ? <>{children}</> : null
}
