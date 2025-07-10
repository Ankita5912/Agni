import { DARK_MODE, LIGHT_MODE } from "../Actions/modeActions";
import type { ModeActionTypes } from "../Actions/modeActions";

export interface ModeState {
  mode: boolean;
}

const initialState: ModeState = {
  mode: true,
};

const modeReducer = (
  state = initialState,
  action: ModeActionTypes
): ModeState => {
  switch (action.type) {
    case DARK_MODE:
      return { mode: true }; // Set dark mode
    case LIGHT_MODE:
      return { mode: false }; // Set light mode
    default:
      return state;
  }
};

export default modeReducer;
