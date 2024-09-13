import Currency from "./Currency"

type ConversionOptionChipProps = {
  from: Currency;
  to: Currency;
  sourceCurrency: Currency;
  targetCurrency: Currency;
  setConversionOption: (from: Currency, to: Currency) => void;
}

export default ConversionOptionChipProps;