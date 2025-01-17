import { LucideIcon } from "lucide-react";

export default function InputStartIcon({
  children,
  icon: Icon,
}: {
  children: React.ReactNode;
  icon: LucideIcon;
}) {
  return (
    <div className="space-y-2">
      <div className="relative">
        {children}
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Icon size={16} strokeWidth={2} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
