export const calculatorKeys = ["a", "b", "c"] as const;

export type CalculatorKey = (typeof calculatorKeys)[number];

export function calculatorKey(raw: string | string[] | undefined): CalculatorKey {
  return calculatorKeys.find((key) => key === raw) ?? "a";
}
