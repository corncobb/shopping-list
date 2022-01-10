import { IShoppingListItem } from "src/models/models";

export interface IState {
  isDarkMode: boolean;
  isLoadingGlobally: boolean;
  shoppingListItems: IShoppingListItem[];
  shoppingListForm: boolean;
}

export const initialState: IState = {
  isDarkMode: false,
  isLoadingGlobally: false,
  shoppingListItems: [],
  shoppingListForm: false,
};

export enum ActionTypes {
  SET_IS_DARK_MODE = "SET_IS_DARK_MODE",
  SET_IS_LOADING_GLOBALLY = "SET_IS_LOADING_GLOBALLY",
  ADD_SHOPPING_LIST_ITEM = "ADD_SHOPPING_LIST_ITEM",
  DELETE_SHOPPING_LIST_ITEM = "DELETE_SHOPPING_LIST_ITEM",
  EDIT_SHOPPING_LIST_ITEM = "EDIT_SHOPPING_LIST_ITEM",
  SET_SHOPPING_LIST_FORM = "SET_SHOPPING_LIST_FORM",
}

interface ISetIsDarkMode {
  type: ActionTypes.SET_IS_DARK_MODE;
  payload: boolean;
}

interface ISetLoadingGlobally {
  type: ActionTypes.SET_IS_LOADING_GLOBALLY;
  payload: boolean;
}

interface IAddShoppingListItem {
  type: ActionTypes.ADD_SHOPPING_LIST_ITEM;
  payload: IShoppingListItem;
}

interface IDeleteShoppingListItem {
  type: ActionTypes.DELETE_SHOPPING_LIST_ITEM;
  payload: number;
}

interface IEditShoppingListItem {
  type: ActionTypes.ADD_SHOPPING_LIST_ITEM;
  payload: IShoppingListItem;
}
interface ISetShoppingListForm {
  type: ActionTypes.SET_SHOPPING_LIST_FORM;
  payload: boolean;
}

export type ComponentActions =
  | ISetIsDarkMode
  | ISetLoadingGlobally
  | IAddShoppingListItem
  | IEditShoppingListItem
  | IDeleteShoppingListItem
  | ISetShoppingListForm;

export const reducer: React.Reducer<IState, ComponentActions> = (
  state,
  action
) => {
  switch (action.type) {
    case ActionTypes.SET_IS_DARK_MODE: {
      return {
        ...state,
        isDarkMode: action.payload,
      };
    }

    case ActionTypes.SET_IS_LOADING_GLOBALLY: {
      return { ...state, isLoadingGlobally: action.payload };
    }
    case ActionTypes.ADD_SHOPPING_LIST_ITEM: {
      // Create the new shopping list object
      const _incommingShoppingListItem = {
        ...action.payload,
        isCompleted: false,
        id: Date.now(),
      };

      // Copy old shopping list items and add the new one to the _newShoppingListItems array
      const _newShoppingListItems = [
        ...state.shoppingListItems,
        _incommingShoppingListItem,
      ];

      return {
        ...state,
        shoppingListItems: _newShoppingListItems,
      };
    }
    case ActionTypes.DELETE_SHOPPING_LIST_ITEM: {
      const _newShoppingListItems = state.shoppingListItems.filter(
        (shoppingListItem) => shoppingListItem.id !== action.payload
      );

      return { ...state, shoppingListItems: _newShoppingListItems };
    }
    case ActionTypes.SET_SHOPPING_LIST_FORM: {
      return { ...state, shoppingListForm: action.payload };
    }

    default:
      return state;
  }
};
