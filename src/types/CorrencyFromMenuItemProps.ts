import Currency from "./Currency";
import CurrencyMenuItemProps from "./CurrencyMenuItemProps";

type CurrencyFromMenuItemProps = CurrencyMenuItemProps & {
  handleCurrencyFromChange: (currency: Currency) => void;
}

export default CurrencyFromMenuItemProps;
