import { useState, ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { Currency, Operation } from '@/types';
import ConversionSection from '@/components/ConversionSection';
import ConversionOptions from '@/components/ConversionOptions';
import ConversionDetailsInfo from '@/components/ConversionDetailsInfo';
import Benefits from '@/components/Benefits';
import { getOperation, isRateStillValid } from '@/utils';

export default function Home() {
  const [currencyFrom, setCurrencyFrom] = useState<Currency>('USD');
  const [amountFrom, setAmountFrom] = useState(1000);
  const [showFromMenu, setShowFromMenu] = useState(false);
  const [currencyTo, setCurrencyTo] = useState<Currency>('CAD');
  const [amountTo, setAmountTo] = useState(1000);
  const [showToMenu, setShowToMenu] = useState(false);
  const [updates, setUpdates] = useState<Record<string, Operation>>({});

  useEffect(() => {
    async function initSetup () {
      // Asynchronous action to get rate
      const exchangeRate = await fetchExchangeRate(currencyFrom, currencyTo);
      setOperations(currencyFrom, currencyTo, exchangeRate);

      const result = Number((amountFrom * exchangeRate).toFixed(2));
      setAmountTo(result);
    }

    initSetup()
  }, []);

  function setConversionOption(from: Currency, to: Currency) {
    setCurrencyFrom(from)
    setCurrencyTo(to)
    setupdates(amountFrom, setAmountTo, from, to)
  }

  async function setupdates(
    amount: number,
    callback: Dispatch<SetStateAction<number>>,
    source: Currency,
    target: Currency,
  ) {
    const operation = getOperation(source, target, updates)

    if (operation) {
      if (isRateStillValid(operation.timestamp)) {
        const result = Number((amount * operation.exchangeRate).toFixed(2));
        callback(result);
      } else {
        // Asynchronous action to get new rate
        const exchangeRate = await fetchExchangeRate(source, target);
        // Update exchange rate
        operation.exchangeRate = exchangeRate;
        // Get inverse operation to update its exchange rate as well
        const inverseOperation = getOperation(target, source, updates)!;
        // Update inverse rate
        inverseOperation.exchangeRate = 1 / operation.exchangeRate;
       
        const result = Number((amount * operation.exchangeRate).toFixed(2));
        callback(result);
      }
    } else {
      // Asynchronous action to get rate
      const exchangeRate = await fetchExchangeRate(source, target);
      
      const result = Number((amount * exchangeRate).toFixed(2));
      callback(result);
      
      setOperations(source, target, exchangeRate);
    }
  }

  function setOperations(source: Currency, target: Currency, exchangeRate: number) {
    const inverseRate = 1 / exchangeRate;
    const timestamp = Date.now();

    setUpdates({
      ...updates,
      [`${source} to ${target}`]: { source, target, timestamp, exchangeRate },
      [`${target} to ${source}`]: {
        source: target,
        target: source,
        timestamp,
        exchangeRate: inverseRate
      },
    })
  }

  function handleAmountFromChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const newAmountFrom = Number(target.value);
    setAmountFrom(newAmountFrom);
    setupdates(newAmountFrom, setAmountTo, currencyFrom, currencyTo)
  }

  function handleAmountToChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const newAmountTo = Number(target.value);
    setAmountTo(newAmountTo);
    setupdates(newAmountTo, setAmountFrom, currencyTo, currencyFrom)
  }

  function handleCurrencyFromChange(newCurrency: Currency) {
    setCurrencyFrom(newCurrency);
    setupdates(amountFrom, setAmountTo, currencyFrom, currencyTo)
  }

  function handleCurrencyToChange(newCurrency: Currency) {
    setCurrencyTo(newCurrency);
    setupdates(amountFrom, setAmountTo, currencyFrom, currencyTo)
  }

  function toggleFromMenu() {
    setShowFromMenu(show => !show);
  }

  function toggleToMenu() {
    setShowToMenu(show => !show);
  }

  function fetchExchangeRate(source: Currency, target: Currency): Promise<number> {
    // async operation, generating random number at the moment
    return new Promise((resolve) => {
      setTimeout(() => resolve(Math.random()), 500);
    });
  }

  return (
    <div className='max-w-[404px] md:max-w-none mx-auto'>
      <div className='md:flex md:justify-between md:items-center'>
        <h1 className='font-bold'>Complete Global Coverage</h1>
      
        <ConversionOptions currencyFrom={currencyFrom} currencyTo={currencyTo} setConversionOption={setConversionOption} />
      </div>

      <h2 className='text-xl font-bold md:hidden mt-16'>Compare Foreign Exchange Rates and Save Money</h2>

      <div className='md:flex md:justify-between md:items-center'>
        <div className='bg-white md:order-last max-w-[340px] md:w-[340px] box-content my-8 p-8 rounded-lg shadow-gray-200 shadow-lg'>
          <h3 className='font-bold text-center w-3/4 mx-auto mb-8'>Save up to 50% on foreign exchange rates</h3>
        
          <div className='exchange'>

            {/* choose source currency */}
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
            
            {/* choose destination currency */}
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

        <Benefits />
      </div>
    </div>
  )
}
