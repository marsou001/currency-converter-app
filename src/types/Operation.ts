import Currency from "./Currency"

type Operation = {
  source: Currency;
  target: Currency;
  exchangeRate: number;
  inverseRate: number;
  timestamp: number;
}

export default Operation;