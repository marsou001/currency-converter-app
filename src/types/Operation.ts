import Currency from "./Currency"

type Operation = {
  source: Currency;
  target: Currency;
  exchangeRate: number;
  timestamp: number;
}

export default Operation;