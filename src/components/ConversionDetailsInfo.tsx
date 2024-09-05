import { ConversionDetailsInfoProps } from "@/types";

export default function ConversionDetailsInfo({ exchangeRate }: ConversionDetailsInfoProps) {
  return (
    <div className='realtime-info text-xs my-4'>
      <p>
        <span className='text-blue text-base font-bold inline-block mr-2 tranform translate-y-0.5'>x</span>
        { exchangeRate } guaranteed rate for 5 min
      </p>
      
      <p>
        <span className='text-blue text-base font-bold inline-block mr-2 tranform translate-y-0.5'>+</span>
        $0.00 fee
      </p>
    </div>
  )
}