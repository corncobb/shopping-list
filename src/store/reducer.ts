import { IShoppingListForm, IShoppingListItem } from "src/models/models";

export interface IState {
  isDarkMode: boolean;
  isLoadingGlobally: boolean;
  shoppingListItems: IShoppingListItem[];
  shoppingListForm: IShoppingListForm;
}

const initialShoppingListState: IShoppingListForm = {
  open: false,
  type: "ADD",
  data: undefined,
};

export const initialState: IState = {
  isDarkMode: false,
  isLoadingGlobally: false,
  shoppingListItems: [],
  shoppingListForm: initialShoppingListState,
};

export enum ActionTypes {
  SET_IS_DARK_MODE = "SET_IS_DARK_MODE",
  SET_IS_LOADING_GLOBALLY = "SET_IS_LOADING_GLOBALLY",
  ADD_SHOPPING_LIST_ITEM = "ADD_SHOPPING_LIST_ITEM",
  DELETE_SHOPPING_LIST_ITEM = "DELETE_SHOPPING_LIST_ITEM",
  EDIT_SHOPPING_LIST_ITEM = "EDIT_SHOPPING_LIST_ITEM",
  SET_SHOPPING_LIST_FORM = "SET_SHOPPING_LIST_FORM",
  TOGGLE_SHOPPING_LIST_ITEM_COMPLETED = "TOGGLE_SHOPPING_LIST_ITEM_COMPLETED",
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
  // payload is the ID for the item
  payload: number;
}

interface IEditShoppingListItem {
  type: ActionTypes.EDIT_SHOPPING_LIST_ITEM;
  payload: IShoppingListItem;
}
interface ISetShoppingListForm {
  type: ActionTypes.SET_SHOPPING_LIST_FORM;
  payload: IShoppingListForm | null;
}
interface ISetShoppingListItemCompleted {
  type: ActionTypes.TOGGLE_SHOPPING_LIST_ITEM_COMPLETED;
  // payload is the ID for the item
  payload: number;
}

export type ComponentActions =
  | ISetIsDarkMode
  | ISetLoadingGlobally
  | IAddShoppingListItem
  | IEditShoppingListItem
  | IDeleteShoppingListItem
  | ISetShoppingListForm
  | ISetShoppingListItemCompleted;

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
    case ActionTypes.EDIT_SHOPPING_LIST_ITEM: {
      // Payload will be the item object

      // Filter the original shoppingListItems to get the one that has the given id
      const _getShoppingListItem = state.shoppingListItems.filter(
        (shoppingListItem: IShoppingListItem) =>
          shoppingListItem.id === action.payload.id
      )[0];

      // Edit properties. This will update the original object
      _getShoppingListItem.name = action.payload.name;
      _getShoppingListItem.description = action.payload.description;
      _getShoppingListItem.quantity = action.payload.quantity;
      _getShoppingListItem.isCompleted = action.payload.isCompleted;

      return { ...state };
    }
    case ActionTypes.DELETE_SHOPPING_LIST_ITEM: {
      const _shoppingListItemToDelete = state.shoppingListItems.filter(
        (shoppingListItem: IShoppingListItem) =>
          shoppingListItem.id !== action.payload
      );

      return { ...state, shoppingListItems: _shoppingListItemToDelete };
    }
    case ActionTypes.SET_SHOPPING_LIST_FORM: {
      if (action.payload === null)
        return { ...state, shoppingListForm: initialShoppingListState };
      return { ...state, shoppingListForm: action.payload };
    }
    case ActionTypes.TOGGLE_SHOPPING_LIST_ITEM_COMPLETED: {
      // Payload will be the ID of the shopping list item

      // Filter the original shoppingListItems to get the one that has the given id
      const _getShoppingListItem = state.shoppingListItems.filter(
        (shoppingListItem: IShoppingListItem) =>
          shoppingListItem.id === action.payload
      )[0];

      // Edit isCompleted property. This will update the original object too
      _getShoppingListItem.isCompleted = !_getShoppingListItem.isCompleted;

      return { ...state };
    }

    default:
      return state;
  }
};
