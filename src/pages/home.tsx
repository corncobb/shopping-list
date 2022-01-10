import Container from "@mui/material/Container";
import List from "@mui/material/List";
import React, { useContext } from "react";
import {
  EmptyShoppingList,
  ListHeader,
  ShoppingListItem,
} from "src/components";
import { IShoppingListItem } from "src/models/models";
import { GlobalAppContext } from "src/store";

export const Home = () => {
  const { state } = useContext(GlobalAppContext);

  const noListItems = <EmptyShoppingList />;

  const haveListItems = (
    <>
      <ListHeader />
      <List>
        {state.shoppingListItems.map((item: IShoppingListItem) => (
          <ShoppingListItem key={item.id} shoppingListItemData={item} />
        ))}
      </List>
    </>
  );

  return (
    <Container maxWidth={"lg"}>
      {!state.shoppingListItems.length ? noListItems : haveListItems}
    </Container>
  );
};
