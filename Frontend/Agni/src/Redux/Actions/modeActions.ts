// Action Types
export const DARK_MODE = "DARK_MODE";
export const LIGHT_MODE = "LIGHT_MODE";

// Action Interfaces
export interface DarkModeAction {
  type: typeof DARK_MODE;
}

export interface LightModeAction {
  type: typeof LIGHT_MODE;
}

export type ModeActionTypes = DarkModeAction | LightModeAction;

// Action Creators
export const darkMode = (): DarkModeAction => ({ type: DARK_MODE });
export const lightMode = (): LightModeAction => ({ type: LIGHT_MODE });
