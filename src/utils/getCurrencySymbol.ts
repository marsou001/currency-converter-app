import { Currency } from "@/types";

export default function getCurrencySymbol(currency: Currency) {
  switch(currency) {
    case 'USD':
      return '$';
    case 'GBP':
      return '£';
    case 'AUD':
      return '$';
    case 'CAD':
      return '$';
    case 'EUR':
      return '€';
    case 'INR':
      return '₣';
    case 'RMB':
      return '¥';
    case 'KES':
      return '£';
    case 'MYR':
      return 'RM';
  }
}

