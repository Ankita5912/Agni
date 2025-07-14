import { combineReducers } from "redux";
import modeReducer from "./modeReducer";
import themeReducer from "./themeReducer";
import projectReducer from "./ProjectReducer";
import { authReducer } from "./authReducer";

const rootReducer = combineReducers({
  mode: modeReducer,
  theme: themeReducer,
  Project: projectReducer,
  auth : authReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
