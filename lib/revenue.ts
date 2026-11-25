type InputSpec = {
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
  format: (value: number) => string;
};

const count = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const dollars = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const hours = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

export const formatDollars = (value: number) => dollars.format(value);
export const formatHours = (value: number) => `${hours.format(value)} ${value === 1 ? "hour" : "hours"}`;
const formatMinutes = (value: number) => `${count.format(value)} min`;

export const revenueInputs = {
  visits: { label: "Visits each week", min: 1, max: 1000, step: 1, default: 40, format: count.format },
  minutesSaved: { label: "Your estimate of minutes saved per visit", min: 0, max: 60, step: 1, default: 0, format: formatMinutes },
  patients: { label: "Patients enrolled", min: 1, max: 500, step: 1, default: 20, format: count.format },
  fee: { label: "Monthly program fee per patient", min: 50, max: 1000, step: 1, default: 50, format: formatDollars },
  reviewMinutes: { label: "Review time per patient each month", min: 0, max: 240, step: 1, default: 15, format: formatMinutes },
} as const satisfies Record<string, InputSpec>;

export type InputKey = keyof typeof revenueInputs;

export function clampInput(key: InputKey, value: number): number {
  const spec = revenueInputs[key];
  if (!Number.isFinite(value)) return spec.default;
  const stepped = Math.round(value / spec.step) * spec.step;
  return Math.min(spec.max, Math.max(spec.min, stepped));
}

export function parseInput(key: InputKey, raw: string): number {
  const digits = raw.replace(/\D/g, "");
  return clampInput(key, digits === "" ? NaN : Number(digits));
}

export function timeSaved({ visits, minutesSaved }: { visits: number; minutesSaved: number }) {
  const weeklyHours = (visits * minutesSaved) / 60;
  return {
    weeklyHours,
    formula: `${count.format(visits)} visits × ${count.format(minutesSaved)} min ÷ 60 = ${formatHours(weeklyHours)}`,
  };
}

export function program({ patients, fee, reviewMinutes }: { patients: number; fee: number; reviewMinutes: number }) {
  const monthly = patients * fee;
  const reviewHours = (patients * reviewMinutes) / 60;
  return {
    monthly,
    revenueFormula: `${count.format(patients)} patients × ${formatDollars(fee)} = ${formatDollars(monthly)}`,
    reviewHours,
    reviewFormula: `${count.format(patients)} patients × ${count.format(reviewMinutes)} min ÷ 60 = ${formatHours(reviewHours)}`,
  };
}
