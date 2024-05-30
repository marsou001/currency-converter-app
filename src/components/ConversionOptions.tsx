import ConversionOptionChip from '@/components/ConversionOptionChip';
import { Currency } from '@/types';

export default function ConversionOptions() {
  const options: Currency[][] = [['USD', 'CAD'], ['USD', 'GBP'], ['USD', 'AUD'], ['USD', 'EUR']];

  return (
    <div className='whitespace-nowrap overflow-x-scroll no-scrollbar flex items-center gap-3 absolute right-0 left-0 h-16 px-8'>
      {options.map((option) => (
        <ConversionOptionChip currencyFrom={option[0]} currencyTo={option[1]} />
      ))}
    </div>
  )
}