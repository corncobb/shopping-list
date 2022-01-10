export interface IShoppingListItem {
  id?: number;
  name: string;
  description: string;
  quantity: string;
  isCompleted?: boolean;
}

export interface IShoppingListForm {
  open: boolean;
  type: "ADD" | "EDIT";
  data?: IShoppingListItem;
}
