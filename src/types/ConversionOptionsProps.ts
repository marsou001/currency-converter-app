import Currency from "./Currency"

type ConversionOptionsProps = {
  sourceCurrency: Currency;
  targetCurrency: Currency;
  setConversionOption: (from: Currency, to: Currency) => void;
}

export default ConversionOptionsProps;