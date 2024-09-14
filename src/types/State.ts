import Currency from "./Currency";

type State = {
  amount: string;
  currency: Currency;
  isFetchingRate: boolean;
}
export default State;