import { Currency, Operation } from "@/types";

export default function getOperation(
  source: Currency,
  target: Currency,
  history: Record<string, Operation>
): Operation | undefined {
  const operation = `${source} to ${target}`;
  return history[operation];
}