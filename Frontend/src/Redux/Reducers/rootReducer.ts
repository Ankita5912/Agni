// redux/reducers/rootReducer.ts
import { combineReducers } from "redux";
import modeReducer from "./modeReducer";
import themeReducer from "./themeReducer";

const rootReducer = combineReducers({
  mode: modeReducer,
  theme: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // this is your actual RootState
export default rootReducer;
