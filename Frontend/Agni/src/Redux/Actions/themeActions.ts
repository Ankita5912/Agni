export const ORANGE_THEME = "ORANGE_THEME";
export const BLUE_THEME = "BLUE_THEME";
export const PURPLE_THEME = "PURPLE_THEME";
export const GRAY_THEME = "GRAY_THEME";

// Action interfaces (no payloads)
export interface orangeThemeAction {
  type: typeof ORANGE_THEME;
}
export interface blueThemeAction {
  type: typeof BLUE_THEME;
}
export interface purpleThemeAction {
  type: typeof PURPLE_THEME;
}
export interface grayThemeAction {
  type: typeof GRAY_THEME;
}

// Union type
export type ThemeActionTypes =
  | orangeThemeAction
  | blueThemeAction
  | purpleThemeAction
  | grayThemeAction;

// Action creators
export const orangeTheme = (): orangeThemeAction => ({ type: ORANGE_THEME });
export const blueTheme = (): blueThemeAction => ({ type: BLUE_THEME });
export const purpleTheme = (): purpleThemeAction => ({ type: PURPLE_THEME });
export const grayTheme = (): grayThemeAction => ({ type: GRAY_THEME });
