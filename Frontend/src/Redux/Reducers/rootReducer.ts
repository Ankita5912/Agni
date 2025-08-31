import { combineReducers } from "redux";
import modeReducer from "./modeReducer";
import themeReducer from "./themeReducer";
import projectReducer from '../Slice/projectSlice';
import subtaskReducer from '../Slice/subtaskSlice';
import { authReducer } from "./authReducer";
import teamReducer from "../Slice/teamSlice";
import userReducer from '../Slice/userSlice';

const rootReducer = combineReducers({
  mode: modeReducer,
  theme: themeReducer,
  Project: projectReducer,
  Subtask : subtaskReducer,
  auth: authReducer,
  team: teamReducer,
  user : userReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
