import ActionTypes from "@/enums/ActionTypes.enum";
import { StateReducer, Action, State } from "@/types";

function reducerFactory(): StateReducer {
  return function(state: State, action: Action): State {
    switch (action.type) {
      case ActionTypes.SET_AMOUNT:
        return { ...state, amount: action.payload.amount };
      case ActionTypes.SET_CURRENCY:
        return { ...state, currency: action.payload.currency };
      case ActionTypes.SET_IS_FETCHING_RATE:
        return { ...state, isFetchingRate: action.payload.isFetchingRate };
    }
  }
}

export default reducerFactory;