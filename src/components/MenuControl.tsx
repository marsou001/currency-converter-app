import { MenuControlProps } from '@/types';
import { getCountry, getCurrencyIcon } from '@/utils';
import Image from 'next/image';

export default function MenuControl(props: MenuControlProps) {
  const flagIconURL = getCurrencyIcon(props.currency);
  const country = getCountry(props.currency);
  const arrowDown = '/arrow-down.png';

  return (
    <div className='dropdown-control absolute top-2 right-2 inline-flex cursor-pointer' onClick={props.toggleShowMenu}>
      <Image src={flagIconURL} width={15} height={15} alt={`${country} flag icon`} className='inline-block mr-1' />
      <span className='text-gray-400'>{ props.currency }</span>
      <Image src={arrowDown} width={25} height={1} alt='Arrow down icon' className='inline-block transform scale-50' />
    </div>
  )
}