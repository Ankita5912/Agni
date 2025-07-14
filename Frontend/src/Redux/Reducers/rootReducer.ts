import { combineReducers } from "redux";
import modeReducer from "./modeReducer";
import themeReducer from "./themeReducer";
import projectReducer from "./ProjectReducer";

const rootReducer = combineReducers({
  mode: modeReducer,
  theme: themeReducer,
  Project : projectReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
