import { useState } from "react";
import { Currency, ConversionSectionProps } from "@/types";
import MenuControl from "./MenuControl";
import CurrencyMenu from "./CurrencyMenu";
import CurrencyMenuItem from "./CurrencyMenuItem";
import { getCurrencySymbol } from "@/utils";

export default function ConversionSection(props: ConversionSectionProps) {
  const [currenciesList, _] = useState<Currency[]>(['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'RMB', 'MYR', 'INR', 'KES']);
  const symbol = getCurrencySymbol(props.currency)

  return (
    <div className='relative'>
      <input type='text' inputMode="decimal" pattern="\d+(\.\d+)?" value={props.amount} onChange={props.handleAmountChange} className='text-lg font-bold w-full py-2 pl-8 border border-gray-300 rounded-lg' />
      <span className='absolute top-2 left-4'>{ symbol }</span>
      <MenuControl currency={props.currency} toggleShowMenu={props.toggleMenu} />

      <CurrencyMenu show={props.showMenu}>
        {currenciesList.map((currency) => (
          <CurrencyMenuItem key={currency} currency={currency} isCurrencyChosen={currency === props.currency} isCurrencyAvailable={currency !== props.currencyUnavailable} handleCurrencyChange={props.handleCurrencyChange} />
        ))}
      </CurrencyMenu>
    </div>
  )
}