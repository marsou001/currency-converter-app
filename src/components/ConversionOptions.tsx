import ConversionOptionChip from '@/components/ConversionOptionChip';
import { ConversionOptionsProps, Currency } from '@/types';

export default function ConversionOptions(props: ConversionOptionsProps) {
  const options: [Currency, Currency][] = [['USD', 'CAD'], ['USD', 'GBP'], ['USD', 'AUD'], ['USD', 'EUR']];

  return (
    <div className='whitespace-nowrap overflow-x-scroll no-scrollbar flex items-center gap-3 absolute right-0 left-0 h-16 px-8'>
      {options.map((option) => (
        <ConversionOptionChip
          from={option[0]}
          currencyFrom={props.currencyFrom}
          to={option[1]}
          currencyTo={props.currencyTo}
          setConversionOption={props.setConversionOption}
        />
      ))}
    </div>
  )
}