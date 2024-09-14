import { useState, useReducer, Dispatch, useEffect } from 'react';
import { getOperation, isRateStillValid } from '@/utils';
import { Action, Currency, Operation, State } from '@/types';
import ActionTypes from '@/enums/ActionTypes.enum';
import ConversionSection from '@/components/ConversionSection';
import ConversionOptions from '@/components/ConversionOptions';
import ConversionDetailsInfo from '@/components/ConversionDetailsInfo';
import Benefits from '@/components/Benefits';
import reducerFactory from '@/reducerFactory';

const sourceReducer = reducerFactory();
const targetReducer = reducerFactory();

export default function Home() {
  const [sourceState, sourceDispatch] = useReducer(sourceReducer, { amount: '1000', currency: 'USD', isFetchingRate: false });
  const [targetState, targetDispatch] = useReducer(targetReducer, { amount: '1000', currency: 'CAD', isFetchingRate: false });
  const [history, setHistory] = useState<Record<string, Operation>>({});
  const [exchangeRate, setExchangeRate] = useState(1.081681);

  useEffect(() => {
    async function initSetup () {
      targetDispatch({ type: ActionTypes.SET_IS_FETCHING_RATE, payload: { isFetchingRate: true } });

      try {
        const exchangeRate = await fetchExchangeRate(sourceState.currency, targetState.currency);
        setOperations(sourceState.currency, targetState.currency, exchangeRate);

        const result = (Number(sourceState.amount) * exchangeRate).toFixed(2);
        targetDispatch({ type: ActionTypes.SET_AMOUNT, payload: { amount: result }});
      
        showNewExchangeRate(exchangeRate);
      } catch {
        console.log('Something went wrong!');
      }

      targetDispatch({ type: ActionTypes.SET_IS_FETCHING_RATE, payload: { isFetchingRate: false } });
    }

    initSetup()
  }, []);

  // TODO: change parameters' names
  function setConversionOption(from: Currency, to: Currency) {
    sourceDispatch({ type: ActionTypes.SET_CURRENCY, payload: { currency: from }});
    targetDispatch({ type: ActionTypes.SET_CURRENCY, payload: { currency: to }});
    editHistory(sourceState.amount, from, to, targetDispatch);
  }

  async function editHistory(
    amount: string,
    source: Currency,
    target: Currency,
    callback: Dispatch<Action>,
  ) {
    const operation = getOperation(source, target, history)

    if (operation && isRateStillValid(operation.timestamp)) {
      // Show rate as 2 decimals number
      const result = (Number(amount) * operation.exchangeRate).toFixed(2);
      callback({ type: ActionTypes.SET_AMOUNT, payload: { amount: result }});

      // Display new rate
      showNewExchangeRate(operation.exchangeRate);
    } else {
      callback({ type: ActionTypes.SET_IS_FETCHING_RATE, payload: { isFetchingRate: true }});


      try {
        const exchangeRate = await fetchExchangeRate(source, target);
        // Cache new rate
        setOperations(source, target, exchangeRate);
        // Show rate as 2 decimals number
        const result = (Number(amount) * exchangeRate).toFixed(2);
        callback({ type: ActionTypes.SET_AMOUNT, payload: { amount: result }});
        
        // Display new rate
        showNewExchangeRate(exchangeRate);
      } catch {
        console.log('Something went wrong!')
      }

      callback({ type: ActionTypes.SET_IS_FETCHING_RATE, payload: { isFetchingRate: false }});
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

  function handleSourceAmountChange(amount: string) { 
    sourceDispatch({ type: ActionTypes.SET_AMOUNT, payload: { amount }});
    editHistory(amount, sourceState.currency, targetState.currency, targetDispatch);
  }
  
  function handleTargetAmountChange(amount: string) {
    targetDispatch({ type: ActionTypes.SET_AMOUNT, payload: { amount }});
    editHistory(amount, targetState.currency, sourceState.currency, sourceDispatch);
  }
  
  function handleSourceCurrencyChange(newCurrency: Currency) {
    sourceDispatch({ type: ActionTypes.SET_CURRENCY, payload: { currency: newCurrency }});
    editHistory(sourceState.amount, newCurrency, targetState.currency, targetDispatch);
  }
  
  function handleTargetCurrencyChange(newCurrency: Currency) {
    targetDispatch({ type: ActionTypes.SET_CURRENCY, payload: { currency: newCurrency }});
    editHistory(sourceState.amount, sourceState.currency, newCurrency, targetDispatch);
  }

  async function fetchExchangeRate(source: Currency, target: Currency): Promise<number> {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${source}/${target}`);
    const data = await response.json();
    return data.conversion_rate;
  }

  return (
    <div className='max-w-[404px] md:max-w-none mx-auto'>
      <div className='md:flex md:justify-between md:items-center'>
        <h1 className='font-bold'>Complete Global Coverage</h1>
      
        <ConversionOptions sourceCurrency={sourceState.currency} targetCurrency={targetState.currency} setConversionOption={setConversionOption} />
      </div>

      <h2 className='text-xl font-bold md:hidden mt-16'>Compare Foreign Exchange Rates and Save Money</h2>

      <div className='md:flex md:justify-between md:items-center'>
        <div className='bg-white md:order-last max-w-[340px] md:w-[340px] box-content my-8 p-8 rounded-lg shadow-gray-200 shadow-lg'>
          <h3 className='font-bold text-center w-3/4 mx-auto mb-8'>Save up to 50% on foreign exchange rates</h3>
        
          <div className='exchange'>

            {/* choose source currency */}
            <h3 className='text-xs font-bold mb-2'>Recipient Gets</h3>

            <ConversionSection
              isFetchingRate={sourceState.isFetchingRate}
              amount={sourceState.amount}
              currency={sourceState.currency}
              currencyUnavailable={targetState.currency}
              handleAmountChange={handleSourceAmountChange}
              handleCurrencyChange={handleSourceCurrencyChange}
            />

            <ConversionDetailsInfo exchangeRate={exchangeRate} />
            
            {/* choose destination currency */}
            <h3 className='text-xs font-bold mb-2'>You Send</h3>

            <ConversionSection
              isFetchingRate={targetState.isFetchingRate}
              amount={targetState.amount}
              currency={targetState.currency}
              currencyUnavailable={sourceState.currency}
              handleAmountChange={handleTargetAmountChange}
              handleCurrencyChange={handleTargetCurrencyChange}
            />
          </div>
        </div>

        <Benefits />
      </div>
    </div>
  )
}
