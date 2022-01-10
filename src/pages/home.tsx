import React, { useContext } from "react";
import { EmptyShoppingList, ShoppingListItem } from "src/components";
import { IShoppingListItem } from "src/models/models";
import { GlobalAppContext } from "src/store";

export const Home = () => {
  const { state, dispatch } = useContext(GlobalAppContext);

  if (!state.shoppingListItems.length) return <EmptyShoppingList />;
  return (
    <>
      {state.shoppingListItems.map((item: IShoppingListItem) => (
        <ShoppingListItem key={item.id} shoppingListItemData={item} />
      ))}
    </>
  );
};
