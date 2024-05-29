import { useState } from "react";
import { Currency, ConversionSectionProps } from "@/types";
import MenuControl from "./MenuControl";
import CurrencyMenu from "./CurrencyMenu";
import CurrencyMenuItem from "./CurrencyMenuItem";

export default function ConversionSection(props: ConversionSectionProps) {
  const [currenciesList, _] = useState<Currency[]>(['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'RMB', 'MYR', 'INR', 'KES']);

  return (
    <div className='relative'>
      <input type='number' value={props.amount} onChange={props.handleAmountChange} className='text-lg font-bold w-full py-2 pl-8 border border-gray-300 rounded-lg' />
      <span className='absolute top-2 left-4'>$</span>
      <MenuControl currency={props.currency} toggleShowMenu={props.toggleMenu} />

      <CurrencyMenu show={props.showMenu}>
        {currenciesList.map((currency) => (
          <CurrencyMenuItem key={currency} currency={currency} isCurrencyChosen={currency === props.currency} isCurrencyAvailable={currency !== props.currencyUnavailable} handleCurrencyChange={props.handleCurrencyChange} />
        ))}
      </CurrencyMenu>
    </div>
  )
}