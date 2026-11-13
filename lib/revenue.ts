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

export const formatDollars = (value: number) => dollars.format(value);
export const formatPatients = (value: number) => `${count.format(value)} ${value === 1 ? "patient" : "patients"}`;

export const revenueInputs = {
  patients: { label: "Patients enrolled", min: 1, max: 500, step: 1, default: 50, format: count.format },
  fee: { label: "Per patient each month", min: 25, max: 1000, step: 1, default: 299, format: formatDollars },
} as const satisfies Record<keyof RevenueInputs, InputSpec>;

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

export function revenue({ patients, fee }: RevenueInputs): { monthly: number; annual: number } {
  const monthly = patients * fee;
  return { monthly, annual: monthly * 12 };
}
