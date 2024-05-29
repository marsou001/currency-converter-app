import cad from '../../public/currencies/canada.svg';
import eur from '../../public/currencies/european union.svg';
import arrowDown from '../../public/arrow-down.png';
import Image from 'next/image';
import { useState, ChangeEvent } from 'react';
import Currency from '@/types/Currency';
import ConversionOptionChip from '@/components/ConversionOptionChip';
import CurrencyFromMenuItem from '@/components/CurrencyFromMenuItem';
import CurrencyMenu from '@/components/CurrencyFromMenu';
import MenuControl from '@/components/MenuControl';
import ConversionSection from '@/components/ConversionSection';

export default function Home() {
  const [currenciesList, _] = useState<Currency[]>(['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'RMB', 'MYR', 'INR', 'KES']);
  const [currencyFrom, setCurrencyFrom] = useState<Currency>('USD');
  const [amountFrom, setAmountFrom] = useState(1000);
  const [showFromMenu, setShowFromMenu] = useState(false);
  const [currencyTo, setCurrencyTo] = useState<Currency>('EUR');
  const [amountTo, setAmountTo] = useState(1000);
  const [showToMenu, setShowToMenu] = useState(false);

  function toggleFromMenu() {
    setShowFromMenu(show => !show);
  }

  function toggleShowToMenu() {
    setShowToMenu(show => !show);
  }

  function handleAmountFromChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    setAmountFrom(Number(target.value));
  }

  function handleCurrencyFromChange(newCurrency: Currency) {
    setCurrencyFrom(newCurrency);
  }

  function handleCurrencyToChange(newCurrency: Currency) {
    setCurrencyTo(newCurrency);
  }

  return (
    <>
      <h1 className="font-bold">Complete Global Coverage</h1>
      
      <div className='whitespace-nowrap overflow-x-scroll no-scrollbar flex items-center gap-3 absolute right-0 left-0 h-16 px-8'>
        <ConversionOptionChip currencyFrom='USD' currencyTo='CAD' flagIconURL={cad} altText='Canada Flag' />
        <ConversionOptionChip currencyFrom='USD' currencyTo='CAD' flagIconURL={cad} altText='Canada Flag' />
        <ConversionOptionChip currencyFrom='USD' currencyTo='CAD' flagIconURL={cad} altText='Canada Flag' />
        <ConversionOptionChip currencyFrom='USD' currencyTo='CAD' flagIconURL={cad} altText='Canada Flag' />
      </div>

      <h2 className='text-xl font-bold my-16'>Compare Foreign Exchange Rates and Save Money</h2>

      <div className='bg-white p-8 rounded-lg shadow-gray-200 shadow-lg'>
        <h3 className='font-bold text-center w-3/4 mx-auto mb-8'>Save up to 50% on foreign exchange rates</h3>
      
        <div className="exchange">
          <h3 className='text-xs font-bold mb-2'>Recipient Gets</h3>
          <ConversionSection
            amount={amountFrom}
            handleAmountChange={handleAmountFromChange}
            currency={currencyFrom}
            currencyUnavailable={currencyTo}
            handleCurrencyChange={handleCurrencyFromChange}
            showMenu={showFromMenu}
            toggleMenu={toggleFromMenu}
          />

          <div className='realtime-info text-xs my-4'>
            <p>
              <span className='text-blue text-base font-bold inline-block mr-2 tranform translate-y-0.5'>x</span>
              1.081681 guaranteed rate for 5 min
            </p>
            
            <p>
              <span className='text-blue text-base font-bold inline-block mr-2 tranform translate-y-0.5'>+</span>
              $0.00 fee
            </p>
          </div>

          <h3 className='text-xs font-bold mb-2'>You Send</h3>
          <div className='relative'>
            <input type='number' value={1000} className='text-lg font-bold w-full py-2 pl-8 border border-gray-300 rounded-lg' />
            <span className='absolute top-2 left-4'>$</span>
            <div className="dropdown-control absolute top-2 right-2 inline-flex">
              <Image src={eur} width={15} height={15} alt='European Union Flag' className='inline-block mr-1' />
              <span className='text-gray-400'>EUR</span>
              <Image src={arrowDown} width={25} height={1} alt='European Union Flag' className='inline-block transform scale-50' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
