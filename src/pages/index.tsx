import { useState, ChangeEvent } from 'react';
import Currency from '@/types/Currency';
import ConversionSection from '@/components/ConversionSection';
import ConversionOptions from '@/components/ConversionOptions';
import ConversionDetailsInfo from '@/components/ConversionDetailsInfo';

export default function Home() {
  const [currencyFrom, setCurrencyFrom] = useState<Currency>('USD');
  const [amountFrom, setAmountFrom] = useState(1000);
  const [showFromMenu, setShowFromMenu] = useState(false);
  const [currencyTo, setCurrencyTo] = useState<Currency>('CAD');
  const [amountTo, setAmountTo] = useState(1000);
  const [showToMenu, setShowToMenu] = useState(false);

  function setConversionOption(from: Currency, to: Currency) {
    handleCurrencyFromChange(from);
    handleCurrencyToChange(to);
  }

  function handleAmountFromChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    setAmountFrom(Number(target.value));
  }

  function handleAmountToChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    setAmountTo(Number(target.value));
  }

  function handleCurrencyFromChange(newCurrency: Currency) {
    setCurrencyFrom(newCurrency);
  }

  function handleCurrencyToChange(newCurrency: Currency) {
    setCurrencyTo(newCurrency);
  }

  function toggleFromMenu() {
    setShowFromMenu(show => !show);
  }

  function toggleToMenu() {
    setShowToMenu(show => !show);
  }

  return (
    <>
      <h1 className="font-bold">Complete Global Coverage</h1>
      
      <ConversionOptions currencyFrom={currencyFrom} currencyTo={currencyTo} setConversionOption={setConversionOption} />

      <h2 className='text-xl font-bold mt-16'>Compare Foreign Exchange Rates and Save Money</h2>

      <div className='bg-white my-8 p-8 rounded-lg shadow-gray-200 shadow-lg'>
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

          <ConversionDetailsInfo />
          
          <h3 className='text-xs font-bold mb-2'>You Send</h3>
          <ConversionSection
            amount={amountTo}
            handleAmountChange={handleAmountToChange}
            currency={currencyTo}
            currencyUnavailable={currencyFrom}
            handleCurrencyChange={handleCurrencyToChange}
            showMenu={showToMenu}
            toggleMenu={toggleToMenu}
          />
        </div>
      </div>

      <div className='benefits text-gray-500'>
        <h3 className='text-sm'>Get the best exchange rates from leading providers and save money on your international payments</h3>
        <ul className='text-xs list-disc mt-3 mb-5 pl-3'>
          <li>Compare exchange rates from leading providers to find the best deal.</li>
          <li>Save money on your international payments by using a reputable foreign exchange company.</li>
          <li>Get the most out of your money by comparing foreign exchange rates and choosing the best deal.</li>
        </ul>

        <button className='text-white bg-blue text-xs py-2 px-5 rounded-md'>Learn More</button>
      </div>
    </>
  )
}
