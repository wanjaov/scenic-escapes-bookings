import type { ReactNode } from "react";
import { MODES, type ModeId, type ModeMeta, type SearchValues } from "../lib/catalog";
import { cn } from "../lib/utils";

interface SearchDeskProps {
  mode: ModeMeta;
  values: SearchValues;
  onModeChange: (id: ModeId) => void;
  onChange: (patch: Partial<SearchValues>) => void;
  onSearch: () => void;
  summary: string | null;
  onClearSummary: () => void;
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-field bg-background px-4 py-3 ring-1 ring-border transition-shadow",
        "focus-within:ring-2 focus-within:ring-ring",
        className,
      )}
    >
      <span className="label-micro block text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

const inputClass =
  "w-full bg-transparent text-base font-medium text-foreground placeholder:text-muted-foreground focus:outline-none";

function Stepper({
  value,
  onChange,
  min = 1,
  max = 12,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label="Remove one traveller"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="grid size-7 place-items-center rounded-full ring-1 ring-border text-lg leading-none transition-colors hover:bg-secondary disabled:opacity-40"
        disabled={value <= min}
      >
        &minus;
      </button>
      <span className="min-w-6 text-center font-display text-lg font-semibold">{value}</span>
      <button
        type="button"
        aria-label="Add one traveller"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="grid size-7 place-items-center rounded-full ring-1 ring-border text-lg leading-none transition-colors hover:bg-secondary disabled:opacity-40"
        disabled={value >= max}
      >
        +
      </button>
    </div>
  );
}

export function SearchDesk({
  mode,
  values,
  onModeChange,
  onChange,
  onSearch,
  summary,
  onClearSummary,
}: SearchDeskProps) {
  const isStay = mode.unit === "night";

  return (
    <div className="mt-10 max-w-5xl overflow-hidden rounded-panel bg-card ring-1 ring-border">
      <div
        role="tablist"
        aria-label="Choose how you want to travel"
        className="flex items-center gap-1 overflow-x-auto px-3 pt-3"
      >
        {MODES.map((entry) => {
          const active = entry.id === mode.id;
          return (
            <button
              key={entry.id}
              role="tab"
              aria-selected={active}
              onClick={() => onModeChange(entry.id)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {entry.label}
            </button>
          );
        })}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSearch();
        }}
        className="flex flex-wrap items-end gap-3 p-3"
      >
        {!isStay && (
          <Field label={mode.fromLabel} className="basis-56 grow">
            <input
              className={inputClass}
              value={values.from}
              onChange={(event) => onChange({ from: event.target.value })}
              placeholder="Nairobi"
            />
          </Field>
        )}

        <Field label={mode.toLabel} className="basis-56 grow">
          <input
            className={inputClass}
            value={values.to}
            onChange={(event) => onChange({ to: event.target.value })}
            placeholder={isStay ? "Diani" : "Mombasa"}
          />
        </Field>

        {isStay ? (
          <>
            <Field label="Check in" className="basis-40 grow">
              <input
                type="date"
                className={inputClass}
                value={values.checkIn}
                onChange={(event) => onChange({ checkIn: event.target.value })}
              />
            </Field>
            <Field label="Check out" className="basis-40 grow">
              <input
                type="date"
                className={inputClass}
                value={values.checkOut}
                min={values.checkIn}
                onChange={(event) => onChange({ checkOut: event.target.value })}
              />
            </Field>
          </>
        ) : (
          <Field label="Departure" className="basis-40 grow">
            <input
              type="date"
              className={inputClass}
              value={values.depart}
              onChange={(event) => onChange({ depart: event.target.value })}
            />
          </Field>
        )}

        <Field label={isStay ? "Guests" : "Travellers"} className="basis-40 grow-0">
          <Stepper value={values.travellers} onChange={(next) => onChange({ travellers: next })} />
        </Field>

        <button
          type="submit"
          className="shrink-0 rounded-field bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-colors hover:bg-primary"
        >
          Search
        </button>
      </form>

      {summary && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3">
          <p className="text-sm font-medium text-foreground">{summary}</p>
          <button
            type="button"
            onClick={onClearSummary}
            className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
