import ActionTypes from "@/enums/ActionTypes.enum";
import { ReactNode } from "react";

export type Action = 
| {
    type: ActionTypes.SET_AMOUNT;
    payload: {
      amount: State["amount"];
    };
  }
| {
    type: ActionTypes.SET_CURRENCY;
    payload: {
      currency: State["currency"];
    };
  }
| {
    type: ActionTypes.SET_IS_FETCHING_RATE;
    payload: {
      isFetchingRate: State["isFetchingRate"];
    };
  }
;

export type ConversionDetailsInfoProps = {
  exchangeRate: number;
}

export type ConversionOptionChipProps = {
  from: Currency;
  to: Currency;
  sourceCurrency: Currency;
  targetCurrency: Currency;
  setConversionOption: (from: Currency, to: Currency) => void;
}

export type ConversionOptionsProps = {
  sourceCurrency: Currency;
  targetCurrency: Currency;
  setConversionOption: (from: Currency, to: Currency) => void;
}

export type ConversionSectionProps = {
  isFetchingRate: boolean;
  amount: string;
  currency: Currency;
  currencyUnavailable: Currency;
  handleAmountChange: (amount: string) => void;
  handleCurrencyChange: (currency: Currency) => void;
}

export type Currency = 'USD' | 'EUR' | 'GBP' | 'AUD' | 'CAD' | 'CHF' | 'INR' | 'RMB' | 'KES' | 'MYR';

export type CurrencyMenuItemProps = {
  currency: Currency;
  isCurrencyChosen: boolean;
  isCurrencyAvailable: boolean;
  handleCurrencyChange: (currency: Currency) => void;
}

export type CurrencyMenuProps = {
  show: boolean;
  children: ReactNode;
}

export type MenuControlProps = {
  currency: Currency;
  toggleShowMenu: () => void;
}

export type Operation = {
  source: Currency;
  target: Currency;
  exchangeRate: number;
  timestamp: number;
}

export type State = {
  amount: string;
  currency: Currency;
  isFetchingRate: boolean;
}

export type StateReducer = (state: State, action: Action) => State;