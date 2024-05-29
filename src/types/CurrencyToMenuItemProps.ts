import Currency from "./Currency";
import CurrencyMenuItemProps from "./CurrencyMenuItemProps";

type CurrencyToMenuItemProps = CurrencyMenuItemProps & {
  handleCurrencyToChange: (currency: Currency) => void;
}

export default CurrencyToMenuItemProps ;
