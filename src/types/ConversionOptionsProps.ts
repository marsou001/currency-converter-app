import Currency from "./Currency"

type ConversionOptionsProps = {
  setConversionOption: (from: Currency, to: Currency) => void;
}

export default ConversionOptionsProps;