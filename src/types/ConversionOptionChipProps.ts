import Currency from "./Currency"

type ConversionOptionChipProps = {
  from: Currency;
  to: Currency;
  currencyFrom: Currency;
  currencyTo: Currency;
  setConversionOption: (from: Currency, to: Currency) => void;
}

export default ConversionOptionChipProps;