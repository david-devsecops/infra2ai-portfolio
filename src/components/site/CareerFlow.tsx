import { careerTransition } from "@/data/site";
import { koreanCareerTransition } from "@/data/localization";
import type { Language } from "@/lib/language";

const stateStyle: Record<string, string> = {
  Foundation: "text-status-done border-status-done/40",
  Current: "text-status-done border-status-done/40",
  "In Progress": "text-status-progress border-status-progress/40",
  Target: "text-status-planned border-status-planned/40",
};

export function CareerFlow({ language = "en" }: { language?: Language }) {
  const steps =
    language === "ko"
      ? koreanCareerTransition
      : careerTransition.map((step) => ({ ...step, stateLabel: step.state }));

  return (
    <ol className="grid gap-4 md:grid-cols-5">
      {steps.map((step, index) => (
        <li
          key={step.stage}
          className="relative flex flex-col rounded-lg border border-border bg-card p-5"
        >
          <span className="font-mono text-xs text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 text-sm font-semibold text-card-foreground">{step.stage}</h3>
          <span
            className={`mt-2 inline-flex w-fit rounded-full border px-2 py-0.5 font-mono text-[0.65rem] tracking-wider uppercase ${
              stateStyle[step.state] ?? "text-muted-foreground border-border"
            }`}
          >
            {step.stateLabel}
          </span>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{step.detail}</p>
          {index < steps.length - 1 ? (
            <span
              aria-hidden="true"
              className="absolute top-1/2 -right-2.5 hidden font-mono text-border-strong md:block"
            >
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
