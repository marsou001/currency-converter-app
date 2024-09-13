import Currency from "./Currency"

type ConversionSectionProps = {
  isFetchingRate: boolean;
  amount: string;
  currency: Currency;
  currencyUnavailable: Currency;
  handleAmountChange: (amount: string) => void;
  handleCurrencyChange: (currency: Currency) => void;
}

export default ConversionSectionProps;