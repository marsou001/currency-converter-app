import ActionTypes from "@/enums/ActionTypes.enum";
import State from "./State";

type Action = 
| {
    type: ActionTypes.SET_AMOUNT;
    payload: {
      amount: State["amount"];
    };
  }
| {
    type: ActionTypes.SET_CURRENCY;
    payload: {
      currency: State["currency"];
    };
  }
| {
    type: ActionTypes.SET_IS_FETCHING_RATE;
    payload: {
      isFetchingRate: State["isFetchingRate"];
    };
  }
;

export default Action;