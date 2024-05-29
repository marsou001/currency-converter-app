import cad from '../../public/currencies/canada.svg';
import { useState } from 'react';
import Currency from '@/types/Currency';
import ConversionOptionChip from '@/components/ConversionOptionChip';


export default function Home() {
  const currenciesList = useState<Currency[]>(['USD', 'GBP']);
  const currencyFrom = useState<Currency>('USD');
  const currencyTo = useState<Currency>('EUR');

  return (
    <>
      <h1 className="font-bold">Complete Global Coverage</h1>
      <div className='absolute right-0 left-0'>
        <div className='whitespace-nowrap overflow-x-scroll no-scrollbar flex items-center gap-3 absolute right-0 left-0 h-16 px-8'>
          <ConversionOptionChip currencyFrom='USD' currencyTo='CAD' flagIconURL={cad} altText='Canada Flag' />
          <ConversionOptionChip currencyFrom='USD' currencyTo='CAD' flagIconURL={cad} altText='Canada Flag' />
          <ConversionOptionChip currencyFrom='USD' currencyTo='CAD' flagIconURL={cad} altText='Canada Flag' />
          <ConversionOptionChip currencyFrom='USD' currencyTo='CAD' flagIconURL={cad} altText='Canada Flag' />
        </div>
      </div>


      <h2>Compare Foreign Exchange Rates and Save Money</h2>
    </>
  );
}
