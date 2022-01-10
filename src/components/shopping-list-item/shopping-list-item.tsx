import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import React, { useContext } from "react";
import { useConfirmationDialog } from "src/components";
import { IShoppingListForm, IShoppingListItem } from "src/models/models";
import { ActionTypes, GlobalAppContext } from "src/store";

interface IProps {
  shoppingListItemData: IShoppingListItem;
}

export const ShoppingListItem: React.FC<IProps> = ({
  shoppingListItemData,
}) => {
  const theme = useTheme();
  const { dispatch } = useContext(GlobalAppContext);
  const { getConfirmation } = useConfirmationDialog();

  const { isCompleted, name, description, id, quantity } = shoppingListItemData;

  // Handlers

  const handleToggleComplete = (event: React.MouseEvent<HTMLLIElement>) => {
    // Stop propagation to prevent bubbling up and calling the handleToggleComplete function.
    event.stopPropagation();

    dispatch({
      type: ActionTypes.TOGGLE_SHOPPING_LIST_ITEM_COMPLETED,
      payload: id!,
    });
  };

  const handleDeleteItem = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    // Stop propagation to prevent bubbling up and calling the handleToggleComplete function.
    // No calling this will crash the app if there is 1 task left
    event.stopPropagation();

    const confirmed = await getConfirmation({
      title: "Delete Item?",
      message:
        "Are you sure you want to delete this item? This can not be undone.",
    });

    if (confirmed) {
      dispatch({
        type: ActionTypes.DELETE_SHOPPING_LIST_ITEM,
        payload: id!,
      });
    }
  };

  const handleEditItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Stop propagation to prevent bubbling up and calling the handleToggleComplete function.
    // No calling this will crash the app if there is 1 task left
    event.stopPropagation();

    const formState: IShoppingListForm = {
      open: true,
      type: "EDIT",
      data: {
        isCompleted,
        name,
        description,
        id,
        quantity,
      },
    };

    dispatch({
      type: ActionTypes.SET_SHOPPING_LIST_FORM,
      payload: formState,
    });
  };

  return (
    <ListItem
      sx={{
        "& .MuiListItemButton-root": {
          border: "0.5px solid #D5DFE9",
          borderRadius: "4px",
          p: 3,
          mt: 1,
          mb: 1,
          ...(isCompleted && {
            backgroundColor: "rgba(213, 223, 233, 0.17)",
          }),
        },
      }}
      disablePadding
      onClick={handleToggleComplete}
      secondaryAction={
        <>
          <IconButton aria-label="edit" onClick={handleEditItem}>
            <CreateOutlinedIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleDeleteItem}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </>
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <Checkbox edge="start" checked={isCompleted} />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            color: "textPrimary",
          }}
          secondaryTypographyProps={{
            color: "textSecondary",
          }}
          sx={{
            // Styles applied when item is completed
            ...(isCompleted && {
              "& .MuiListItemText-primary": {
                textDecoration: "line-through",
                color: theme.palette.primary.main,
              },
              "& .MuiListItemText-secondary": {
                textDecoration: "line-through",
              },
            }),
          }}
          primary={`${quantity}x ${name}`}
          secondary={description}
        />
      </ListItemButton>
    </ListItem>
  );
};
