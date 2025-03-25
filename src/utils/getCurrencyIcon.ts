import { Currency } from "@/types";

export default function getCurrencyIcon(currency: Currency) {
  let icon = '';

  switch(currency) {
    case 'USD':
      icon = 'united states';
      break;
    case 'GBP':
      icon = 'united kingdom';
      break;
    case 'AUD':
      icon = 'australia';
      break;
    case 'CAD':
      icon = 'canada';
      break;
    case 'EUR':
      icon = 'european union';
      break;
    case 'INR':
      icon = 'india';
      break;
    case 'RMB':
      icon = 'china';
      break;
    case 'KES':
      icon = 'kenya';
      break;
    case 'MYR':
      icon = 'malaysia';
      break;
  }

  const iconURL = `/currencies/${icon}.svg`;

  return iconURL;
}