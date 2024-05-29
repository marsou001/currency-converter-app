import Currency from "./Currency";

type CurrencyMenuItemProps = {
  currency: Currency;
  isCurrencyChosen: boolean;
  isCurrencyAvailable: boolean;
  handleCurrencyChange: (currency: Currency) => void;
}

export default CurrencyMenuItemProps;
