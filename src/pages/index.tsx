import cad from '../../public/currencies/canada.svg';
import eur from '../../public/currencies/european union.svg';
import arrowDown from '../../public/arrow-down.png';
import Image from 'next/image';
import { useState } from 'react';
import Currency from '@/types/currency';
import ConversionOptionChip from '@/components/ConversionOptionChip';

export default function Home() {
  const currenciesList = useState<Currency[]>(['USD', 'GBP']);
  const currencyFrom = useState<Currency>('USD');
  const currencyTo = useState<Currency>('EUR');

  const [showMenu, setShowMenu] = useState(false);

  function toggleMenu() {
    setShowMenu(show => !show);
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
          <div className='relative'>
            <input type='number' value={1000} className='text-lg font-bold w-full py-2 pl-8 border border-gray-300 rounded-lg' />
            <span className='absolute top-2 left-4'>$</span>
            <div className='dropdown-control absolute top-2 right-2 inline-flex' onClick={toggleMenu}>
              <Image src={eur} width={15} height={15} alt='European Union Flag' className='inline-block mr-1' />
              <span className='text-gray-400'>EUR</span>
              <Image src={arrowDown} width={25} height={1} alt='European Union Flag' className='inline-block transform scale-50' />
            </div>

            <div className={`dropdown-menu bg-white absolute right-0 overflow-y-scroll w-2/5 ${showMenu ? 'h-28' : 'h-0'} z-10 shadow-gray-200 shadow-lg transition-all ease-in-out duration-150`}>
              <ul className='pt-2'>
                <li className='text-sm flex py-2 px-2'>
                  <Image src={eur} width={15} height={15} alt='European Union Flag' className='inline-block mr-1' />
                  <span>EUR</span>
                </li>
                <li className='text-sm flex py-2 px-2'>
                  <Image src={eur} width={15} height={15} alt='European Union Flag' className='inline-block mr-1' />
                  <span>EUR</span>
                </li>
                <li className='text-sm flex py-2 px-2'>
                  <Image src={eur} width={15} height={15} alt='European Union Flag' className='inline-block mr-1' />
                  <span>EUR</span>
                </li>
                <li className='text-sm flex py-2 px-2'>
                  <Image src={eur} width={15} height={15} alt='European Union Flag' className='inline-block mr-1' />
                  <span>EUR</span>
                </li>
              </ul>
            </div>
          </div>

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
