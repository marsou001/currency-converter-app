import Image from 'next/image';
import ConversionOptionChipProps from "@/types/ConversionOptionChipProps";

export default function ConversionOptionChip(props: ConversionOptionChipProps) {
  return (
    <div
      className={`border-2 ${true ? 'border-transparent bg-white' : ' border-blue bg-blue-light'} flex items-center gap-1 rounded-lg py-2 pl-2 pr-6 shadow-gray-200 shadow-lg`}
    >
      <Image 
        src={props.flagIconURL}
        width={15}
        height={15}
        alt={props.altText}
        className='inline-block'
      />
      <span className="text-xs transform translate-y-px">{ props.currencyFrom } to { props.currencyTo }</span>
    </div>
  )
}