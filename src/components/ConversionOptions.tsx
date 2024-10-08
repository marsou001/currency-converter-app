import ConversionOptionChip from '@/components/ConversionOptionChip';
import { ConversionOptionsProps, Currency } from '@/types';

export default function ConversionOptions(props: ConversionOptionsProps) {
  const options: [Currency, Currency][] = [['USD', 'CAD'], ['USD', 'GBP'], ['USD', 'AUD'], ['USD', 'EUR']];

  return (
    <div className='relative'>
      <div className='absolute md:static right-0 left-0 whitespace-nowrap overflow-x-scroll no-scrollbar flex items-center gap-3 max-w-[404px] box-content h-16'>
        {options.map((option) => (
          <ConversionOptionChip
            key={option[1]}
            from={option[0]}
            sourceCurrency={props.sourceCurrency}
            to={option[1]}
            targetCurrency={props.targetCurrency}
            setConversionOption={props.setConversionOption}
          />
        ))}
      </div>
    </div>
    
  )
}