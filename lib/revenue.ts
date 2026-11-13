export type RevenueInputs = { patients: number; fee: number };

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

export const formatCount = (value: number) => count.format(value);
export const formatDollars = (value: number) => dollars.format(value);

export const revenueInputs = {
  patients: { label: "Patients enrolled", min: 1, max: 500, step: 1, default: 50, format: formatCount },
  fee: { label: "Per patient each month", min: 25, max: 1000, step: 1, default: 299, format: formatDollars },
  caseload: { label: "Active caseload", min: 1, max: 2000, step: 1, default: 200, format: formatCount },
  enrollmentRate: {
    label: "Share enrolled",
    min: 1,
    max: 100,
    step: 1,
    default: 25,
    format: (value) => `${count.format(value)}%`,
  },
} as const satisfies Record<string, InputSpec>;

export type InputKey = keyof typeof revenueInputs;

export function clampInput(key: InputKey, value: number): number {
  const spec = revenueInputs[key];
  if (!Number.isFinite(value)) return spec.default;
  const stepped = Math.round(value / spec.step) * spec.step;
  return Math.min(spec.max, Math.max(spec.min, stepped));
}

export function parseInput(key: InputKey, raw: string): number {
  return clampInput(key, raw.trim() === "" ? NaN : Number(raw));
}

export function enrolledPatients(caseload: number, enrollmentRate: number): number {
  return Math.max(1, Math.round((caseload * enrollmentRate) / 100));
}

export function revenue({ patients, fee }: RevenueInputs): { monthly: number; annual: number } {
  const monthly = patients * fee;
  return { monthly, annual: monthly * 12 };
}

export function cumulativeByMonth({ patients, fee }: RevenueInputs): number[] {
  const { monthly } = revenue({ patients, fee });
  return Array.from({ length: 12 }, (_, month) => monthly * (month + 1));
}
