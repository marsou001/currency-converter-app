import Image from 'next/image';
import { getCountry, getCurrencyIcon } from '@/utils';
import CurrencyMenuItemProps from '@/types/CurrencyMenuItemProps';

export default function CurrencyFromMenuItem(props: CurrencyMenuItemProps) {
  const flagIconURL = getCurrencyIcon(props.currency);
  const country = getCountry(props.currency);

  function handleCurrencyChange() {
    props.handleCurrencyChange(props.currency);
  }

  return (
    <li 
      className={`text-sm ${props.isCurrencyChosen && 'bg-blue-light'} ${!props.isCurrencyAvailable && 'opacity-30'} flex py-2 px-2`}
    >
      <button
        onClick={handleCurrencyChange}
        disabled={!props.isCurrencyAvailable}
      >
        <Image
          src={flagIconURL}
          width={15}
          height={15}
          alt={`${country} flag icon`}
          className='inline-block mr-1'
        />
        <span>{ props.currency }</span>
      </button>
    </li>
  )
}