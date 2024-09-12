import Currency from "./Currency"

type ConversionSectionProps = {
  currency: Currency;
  currencyUnavailable: Currency;
  handleCurrencyChange: (currency: Currency) => void;
  amount: string;
  handleAmountChange: (amount: string) => void;
}

export default ConversionSectionProps;