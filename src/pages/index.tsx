import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { Currency, Operation } from '@/types';
import ConversionSection from '@/components/ConversionSection';
import ConversionOptions from '@/components/ConversionOptions';
import ConversionDetailsInfo from '@/components/ConversionDetailsInfo';
import Benefits from '@/components/Benefits';
import { getOperation, isRateStillValid } from '@/utils';

export default function Home() {
  const [currencyFrom, setCurrencyFrom] = useState<Currency>('USD');
  const [amountFrom, setAmountFrom] = useState('1000');
  const [currencyTo, setCurrencyTo] = useState<Currency>('CAD');
  const [amountTo, setAmountTo] = useState('1000');
  const [history, setHistory] = useState<Record<string, Operation>>({});
  const [exchangeRate, setExchangeRate] = useState(1.081681);
  const [isFetchingExchangeRate, setIsFetchingExchangeRate] = useState(false);
  const [isFetchingReverseRate, setIsFetchingReverseRate] = useState(false);

  useEffect(() => {
    async function initSetup () {
      setIsFetchingExchangeRate(true);

      try {
        const exchangeRate = await fetchExchangeRate(currencyFrom, currencyTo);
        setOperations(currencyFrom, currencyTo, exchangeRate);

        const result = (Number(amountFrom) * exchangeRate).toFixed(2);
        setAmountTo(result);
      
        showNewExchangeRate(exchangeRate);
      } catch {
        console.log('Something went wrong!');
      }

      setIsFetchingExchangeRate(false);
    }

    initSetup()
  }, []);

  function setConversionOption(from: Currency, to: Currency) {
    setCurrencyFrom(from);
    setCurrencyTo(to);
    editHistory(amountFrom, from, to, setAmountTo, setIsFetchingExchangeRate);
  }

  async function editHistory(
    amount: string,
    source: Currency,
    target: Currency,
    callback: Dispatch<SetStateAction<string>>,
    setIsFetchingRate: Dispatch<SetStateAction<boolean>>,
  ) {
    const operation = getOperation(source, target, history)

    if (operation && isRateStillValid(operation.timestamp)) {
      // Show rate as 2 decimals number
      const result = (Number(amount) * operation.exchangeRate).toFixed(2);
      callback(result);

      // Display new rate
      showNewExchangeRate(operation.exchangeRate);
    } else {
      setIsFetchingRate(true);


      try {
        const exchangeRate = await fetchExchangeRate(source, target);
        // Cache new rate
        setOperations(source, target, exchangeRate);
        // Show rate as 2 decimals number
        const result = (Number(amount) * exchangeRate).toFixed(2);
        callback(result);
        
        // Display new rate
        showNewExchangeRate(exchangeRate);
      } catch {
        console.log('Something went wrong!')
      }

      setIsFetchingRate(false);
    }
  }

  function setOperations(source: Currency, target: Currency, exchangeRate: number) {
    const inverseRate = 1 / exchangeRate;
    const timestamp = Date.now();

    setHistory({
      ...history,
      [`${source} to ${target}`]: { source, target, timestamp, exchangeRate },
      [`${target} to ${source}`]: {
        source: target,
        target: source,
        timestamp,
        exchangeRate: inverseRate
      },
    })
  }

  function showNewExchangeRate(exchangeRate: number) {
    const newExchangeRate = Number((exchangeRate).toFixed(6));
    setExchangeRate(newExchangeRate);
  }

  function handleAmountFromChange(amount: string) { 
    setAmountFrom(amount);
    editHistory(amount, currencyFrom, currencyTo, setAmountTo, setIsFetchingExchangeRate);
  }
  
  function handleAmountToChange(amount: string) {
    setAmountTo(amount);
    editHistory(amount, currencyTo, currencyFrom, setAmountFrom, setIsFetchingReverseRate);
  }
  
  function handleCurrencyFromChange(newCurrency: Currency) {
    setCurrencyFrom(newCurrency);
    editHistory(amountFrom, newCurrency, currencyTo, setAmountTo, setIsFetchingExchangeRate);
  }
  
  function handleCurrencyToChange(newCurrency: Currency) {
    setCurrencyTo(newCurrency);
    editHistory(amountFrom, currencyFrom, newCurrency, setAmountTo, setIsFetchingExchangeRate);
  }

  async function fetchExchangeRate(source: Currency, target: Currency): Promise<number> {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/0000051db7c88797e2d42dce/pair/${source}/${target}`);
    const data = await response.json();
    return data.conversion_rate;
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
              isFetchingRate={isFetchingReverseRate}
              amount={amountFrom}
              currency={currencyFrom}
              currencyUnavailable={currencyTo}
              handleAmountChange={handleAmountFromChange}
              handleCurrencyChange={handleCurrencyFromChange}
            />

            <ConversionDetailsInfo exchangeRate={exchangeRate} />
            
            {/* choose destination currency */}
            <h3 className='text-xs font-bold mb-2'>You Send</h3>

            <ConversionSection
              isFetchingRate={isFetchingExchangeRate}
              amount={amountTo}
              currency={currencyTo}
              currencyUnavailable={currencyFrom}
              handleAmountChange={handleAmountToChange}
              handleCurrencyChange={handleCurrencyToChange}
            />
          </div>
        </div>

        <Benefits />
      </div>
    </div>
  )
}
