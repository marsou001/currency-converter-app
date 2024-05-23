import Image from 'next/image';
import cad from '../../public/currencies/canada.svg';

export default function Home() {
  return (
    <>
      <h1 className="font-bold">Complete Global Coverage</h1>
      <span>
        <Image src={cad} width={15} height={15} alt="Canada flag" className='inline-block' />
        USD to CAD
      </span>
      <span>USD to CAD</span>
      <span>USD to CAD</span>
      <span>USD to CAD</span>
    </>
  )
}
