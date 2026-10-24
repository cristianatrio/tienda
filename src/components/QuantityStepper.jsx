import { Minus, Plus } from "lucide-react";

export function QuantityStepper({
  value,
  max,
  onChange,
  lessLabel,
  moreLabel,
  valueLabel,
  compact = false,
}) {
  return (
    <div className={compact ? "stepper compact" : "stepper"}>
      <button
        type="button"
        aria-label={lessLabel}
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
      >
        <Minus aria-hidden="true" size={compact ? 16 : 18} />
      </button>
      <output aria-label={valueLabel}>{value}</output>
      <button
        type="button"
        aria-label={moreLabel}
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
      >
        <Plus aria-hidden="true" size={compact ? 16 : 18} />
      </button>
    </div>
  );
}
