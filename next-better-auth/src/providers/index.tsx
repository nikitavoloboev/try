import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextTopLoader
        easing="ease"
        showSpinner={false}
        color="hsl(var(--primary))"
      />
      {children}
      <Toaster position="top-center" />
    </>
  );
}
