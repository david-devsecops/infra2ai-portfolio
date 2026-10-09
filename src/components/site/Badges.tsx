import type { Status } from "@/data/types";
import type { Language } from "@/lib/language";
import { cn } from "@/lib/utils";

const styles: Record<Status, string> = {
  Completed: "border-status-done/40 text-status-done",
  "In Progress": "border-status-progress/40 text-status-progress",
  Planned: "border-status-planned/40 text-status-planned",
  "Case Study": "border-status-case/40 text-status-case",
};

const koreanLabels: Record<Status, string> = {
  Completed: "완료",
  "In Progress": "진행 중",
  Planned: "예정",
  "Case Study": "사례",
};

export function StatusBadge({
  status,
  className,
  language = "en",
}: {
  status: Status;
  className?: string;
  language?: Language;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border bg-background/40 px-2.5 py-0.5 font-mono text-xs tracking-wide uppercase",
        styles[status],
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {language === "ko" ? koreanLabels[status] : status}
    </span>
  );
}

export function TagList({ items, label }: { items: string[]; label?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {label ? <span className="eyebrow mr-1">{label}</span> : null}
      {items.map((item) => (
        <span
          key={item}
          className="rounded border border-border bg-secondary/60 px-2 py-0.5 font-mono text-xs text-secondary-foreground"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
