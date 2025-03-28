import { Currency } from "@/types";

export default function getCountry(currency: Currency) {
  switch(currency) {
    case 'USD':
      return 'United States';
    case 'GBP':
      return 'United Kingdom';
    case 'AUD':
      return 'Australia';
    case 'CAD':
      return 'Canada';
    case 'EUR':
      return 'European Union';
    case 'INR':
      return 'India';
    case 'RMB':
      return 'China';
    case 'KES':
      return 'Kenya';
    case 'MYR':
      return 'Malaysia';
  }
}
