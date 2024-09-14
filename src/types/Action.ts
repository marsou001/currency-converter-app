import ActionTypes from "@/enums/ActionTypes.enum";
import State from "./State";

type Action = {
  type: ActionTypes;
  payload: Partial<State>;
}

export default Action;