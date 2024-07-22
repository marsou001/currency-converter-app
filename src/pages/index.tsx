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
  const [operationsHistory, setHistorysHistory] = useState<Record<string, Operation>>({});

  useEffect(() => {
    // setHistory(amountFrom, 'to', setNewAmount)
    // Asynchronous action to get rate
    const exchangeRate = 77
    setOperation(currencyFrom, currencyTo, exchangeRate)
    setAmountTo(amountFrom * exchangeRate)
  }, [])

  function setConversionOption(from: Currency, to: Currency) {
    // handleCurrencyFromChange(from);
    // handleCurrencyToChange(to);
    setCurrencyFrom(from)
    setCurrencyTo(to)
    setHistory(amountFrom, 'to', setAmountTo)
  }

  function setNewAmount(newAmount: number, field: 'from' | 'to') {
    if (field === 'from') {
      setAmountFrom(newAmount)
    } else setAmountTo(newAmount)
  }

  function setHistory(
    amount: number,
    field: 'from' | 'to',
    // callback: Dispatch<SetStateAction<number>>,
    callback: (newAmount: number, field: 'from' | 'to') => void,
  ) {
    const operation = getOperation(currencyFrom, currencyTo, operationsHistory)

    if (operation) {
      let exchangeRate: number;
      const isOperationInverse = currencyFrom === operation.target;
      
      if (isOperationInverse) {
        exchangeRate = operation.inverseRate;
      } else {
        console.log(22)
        exchangeRate = operation.exchangeRate;
      }

      if (isRateStillValid(operation.timestamp)) {
        callback(amount * exchangeRate, field)
      } else {
        // Asynchronous action to get new rate
        exchangeRate = 333
        // Update exchange rate
        if (isOperationInverse) {
          operation.inverseRate = exchangeRate
          operation.exchangeRate = 1 / exchangeRate
        } else {
          operation.exchangeRate = exchangeRate
          operation.inverseRate = 1 / exchangeRate
        }
       
        callback(amount * exchangeRate, field)
      }
    } else {
      // Asynchronous action to get rate
      const exchangeRate = 77
      callback(amount * exchangeRate, field)
      console.log(operationsHistory)
      setOperation(currencyFrom, currencyTo, exchangeRate)
      // const inverseRate = 1 / exchangeRate
      // operationsHistory[`${currencyFrom} to ${currencyTo}`] = { 
      //   source: currencyFrom,
      //   target: currencyTo,
      //   exchangeRate,
      //   inverseRate,
      //   timestamp: Date.now(),
      // }
      console.log(operationsHistory)
    }
  }

  function setOperation(source: Currency, target: Currency, exchangeRate: number) {
    const inverseRate = 1 / exchangeRate

    operationsHistory[`${source} to ${target}`] = { 
      source,
      target,
      exchangeRate,
      inverseRate,
      timestamp: Date.now(),
    }
  }

  function handleAmountFromChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const newAmountFrom = Number(target.value);
    setAmountFrom(newAmountFrom);
    setHistory(newAmountFrom, 'to', setNewAmount)
  }

  function handleAmountToChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const newAmountTo = Number(target.value);
    setAmountTo(newAmountTo);
    setHistory(newAmountTo, 'from', setAmountFrom)
  }

  function handleCurrencyFromChange(newCurrency: Currency) {
    setCurrencyFrom(newCurrency);
    setHistory(amountFrom, 'to', setNewAmount)
  }

  function handleCurrencyToChange(newCurrency: Currency) {
    setCurrencyTo(newCurrency);
    setHistory(amountFrom, 'to', setNewAmount)
  }

  function toggleFromMenu() {
    setShowFromMenu(show => !show);
  }

  function toggleToMenu() {
    setShowToMenu(show => !show);
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
