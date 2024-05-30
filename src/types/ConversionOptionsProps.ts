import Currency from "./Currency"

type ConversionOptionsProps = {
  currencyFrom: Currency;
  currencyTo: Currency;
  setConversionOption: (from: Currency, to: Currency) => void;
}

export default ConversionOptionsProps;