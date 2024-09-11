import { ChangeEvent, useState } from "react";
import { Currency, ConversionSectionProps } from "@/types";
import MenuControl from "./MenuControl";
import CurrencyMenu from "./CurrencyMenu";
import CurrencyMenuItem from "./CurrencyMenuItem";
import { getCurrencySymbol } from "@/utils";

export default function ConversionSection(props: ConversionSectionProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showInvalidInputError, setShowInvalidInputError] = useState<boolean>(false);
  const [currenciesList, _] = useState<Currency[]>(['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'RMB', 'MYR', 'INR', 'KES']);
  const symbol = getCurrencySymbol(props.currency);

  function onAmountChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    // Don't proceed if there are non-numerical values in input
    if (target.validity.patternMismatch) {
      setShowInvalidInputError(true);
      return;
    }
    
    setShowInvalidInputError(false);
    
    const newAmount = Number(target.value);

    props.handleAmountChange(newAmount)
  }

  function toggleMenu() {
    setShowMenu(show => !show);
  }

  return (
    <div className='relative'>
      <input type='text' inputMode="decimal" pattern="\d+((\.)?(\d+))?" value={props.amount} onChange={onAmountChange} className='text-lg font-bold w-full py-2 pl-8 border border-gray-300 rounded-lg' />
      <span className='absolute top-2 left-4'>{ symbol }</span>
      <MenuControl currency={props.currency} toggleShowMenu={toggleMenu} />
      { showInvalidInputError && <span role="alert" className="text-red-500 text-xs absolute -bottom-4 left-0">Please enter a valid number!</span> }

      <CurrencyMenu show={showMenu}>
        {currenciesList.map((currency) => (
          <CurrencyMenuItem key={currency} currency={currency} isCurrencyChosen={currency === props.currency} isCurrencyAvailable={currency !== props.currencyUnavailable} handleCurrencyChange={props.handleCurrencyChange} />
        ))}
      </CurrencyMenu>
    </div>
  )
}