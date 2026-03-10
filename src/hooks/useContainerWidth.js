import { TAB_LAYOUT } from "../constants";

const { TAB_MIN, GAP, ADD_BTN, ROW_PADDING, WRAPPER_PADDING, EDIT_EXTRA } =
  TAB_LAYOUT;

export function useContainerWidth(categoriesLength, tabEditing) {
  const n = categoriesLength;
  const minWidth =
    WRAPPER_PADDING + n * TAB_MIN + (n - 1) * GAP + ADD_BTN + ROW_PADDING;
  const width = tabEditing ? minWidth + EDIT_EXTRA : minWidth;
  return width;
}
