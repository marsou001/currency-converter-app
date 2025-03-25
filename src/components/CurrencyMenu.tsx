import { CurrencyMenuProps } from "@/types";

export default function CurrencyMenu(props: CurrencyMenuProps) {
  return (
    <div className={`dropdown-menu bg-white absolute right-0 overflow-y-scroll w-2/5 ${props.show ? 'h-28' : 'h-0'} z-10 shadow-gray-200 shadow-lg transition-all ease-in-out duration-150`}>
      <ul className='pt-2'>
        {props.children}
      </ul>
    </div>
  )
}