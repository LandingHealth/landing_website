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

export const revenueInputs = {
  recoveryPatients: { label: "Patients using Landing in recovery", min: 1, max: 500, step: 1, default: 20, format: count.format },
  monitoringPerPatient: { label: "Your estimate of monitoring reimbursement per patient each month", min: 0, max: 300, step: 1, default: 50, format: formatDollars },
  programPatients: { label: "Patients on your program after discharge", min: 1, max: 500, step: 1, default: 10, format: count.format },
  programFee: { label: "Monthly program fee per patient", min: 25, max: 1000, step: 1, default: 50, format: formatDollars },
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

export function revenueStreams(inputs: Record<InputKey, number>) {
  const { recoveryPatients, monitoringPerPatient, programPatients, programFee } = inputs;
  const recovery = recoveryPatients * monitoringPerPatient;
  const afterDischarge = programPatients * programFee;
  const total = recovery + afterDischarge;
  return {
    recovery,
    afterDischarge,
    total,
    recoveryFormula: `${count.format(recoveryPatients)} patients × ${formatDollars(monitoringPerPatient)} = ${formatDollars(recovery)}`,
    afterDischargeFormula: `${count.format(programPatients)} patients × ${formatDollars(programFee)} = ${formatDollars(afterDischarge)}`,
    totalFormula: `${formatDollars(recovery)} + ${formatDollars(afterDischarge)} = ${formatDollars(total)}`,
  };
}
