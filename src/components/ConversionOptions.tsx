import ConversionOptionChip from '@/components/ConversionOptionChip';
import { ConversionOptionsProps, Currency } from '@/types';

export default function ConversionOptions(props: ConversionOptionsProps) {
  const options: [Currency, Currency][] = [['USD', 'CAD'], ['USD', 'GBP'], ['USD', 'AUD'], ['USD', 'EUR']];

  return (
    <div className='relative'>
      <div className='absolute md:static right-0 left-0 whitespace-nowrap overflow-x-scroll no-scrollbar flex items-center gap-3 max-w-[404px] box-content h-16'>
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
    </div>
    
  )
}