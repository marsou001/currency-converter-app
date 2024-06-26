import { ChangeEvent } from "react";
import Currency from "./Currency"

type ConversionSectionProps = {
  currency: Currency;
  currencyUnavailable: Currency;
  handleCurrencyChange: (currency: Currency) => void;
  amount: number;
  handleAmountChange: (event: ChangeEvent<HTMLInputElement>) => void;
  showMenu: boolean;
  toggleMenu: () => void;
}

export default ConversionSectionProps;