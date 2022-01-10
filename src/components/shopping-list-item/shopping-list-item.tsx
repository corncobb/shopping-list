import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { IShoppingListItem } from "src/models/models";
import { GlobalAppContext } from "../../store";

interface IProps {
  shoppingListItemData: IShoppingListItem;
}

export const ShoppingListItem: React.FC<IProps> = ({
  shoppingListItemData,
}) => {
  const theme = useTheme();
  const { state, dispatch } = useContext(GlobalAppContext);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography color="textPrimary">
        Name: {shoppingListItemData.name}
      </Typography>
      <Typography color="textPrimary">
        Desc: {shoppingListItemData.description}
      </Typography>
      <Typography color="textPrimary">
        Qty: {shoppingListItemData.quantity}
      </Typography>
      <Typography color="textPrimary">
        Completed: {shoppingListItemData.isCompleted ? "true" : "false"}
      </Typography>
      <Typography color="textPrimary">id: {shoppingListItemData.id}</Typography>
    </Box>
  );
};
