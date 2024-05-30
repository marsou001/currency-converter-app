import Currency from "./Currency"

type ConversionOptionChipProps = {
  currencyFrom: Currency;
  currencyTo: Currency;
  setConversionOption: (from: Currency, to: Currency) => void;
}

export default ConversionOptionChipProps;