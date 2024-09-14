import { State, Action } from "@/types";

type StateReducer = (state: State, action: Action) => State;

export default StateReducer;