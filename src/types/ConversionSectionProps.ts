import Currency from "./Currency"

type ConversionSectionProps = {
  currency: Currency;
  currencyUnavailable: Currency;
  handleCurrencyChange: (currency: Currency) => void;
  amount: number;
  handleAmountChange: (amount: number) => void;
}

export default ConversionSectionProps;