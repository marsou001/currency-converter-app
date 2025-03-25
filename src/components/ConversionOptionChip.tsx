import Image from 'next/image';
import { ConversionOptionChipProps } from "@/types";
import { getCountry, getCurrencyIcon } from '@/utils';

export default function ConversionOptionChip(props: ConversionOptionChipProps) {
  const country = getCountry(props.to);
  const flagIconURL = getCurrencyIcon(props.to);

  function setOption() {
    props.setConversionOption(props.from, props.to);
  }

  const isSelected = props.from === props.sourceCurrency && props.to === props.targetCurrency;

  return (
    <div
      className={`border-2 ${isSelected ? 'border-blue bg-blue-light' : 'border-transparent bg-white'} flex items-center gap-1 rounded-lg py-2 pl-2 pr-6 shadow-gray-200 shadow-lg cursor-pointer`}
      onClick={setOption}
    >
      <Image 
        src={flagIconURL}
        width={15}
        height={15}
        alt={`${country} flag icon`}
        className='inline-block'
      />
      <span className="text-xs transform translate-y-px">{ props.from } to { props.to }</span>
    </div>
  )
}