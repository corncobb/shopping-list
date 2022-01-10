import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { IShoppingListForm } from "src/models/models";
import { ActionTypes, GlobalAppContext } from "src/store";

export const EmptyShoppingList = () => {
  const { dispatch } = useContext(GlobalAppContext);

  const handleshoppingListFormOpen = () => {
    const formState: IShoppingListForm = {
      open: true,
      type: "ADD",
      data: undefined,
    };
    dispatch({
      type: ActionTypes.SET_SHOPPING_LIST_FORM,
      payload: formState,
    });
  };

  return (
    <Grid
      component="section"
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        maxWidth: 614,
        height: 290,
        border: "1px solid #C6C6C6",
        borderRadius: "5px",
        margin: "auto",
      }}
    >
      <Grid item>
        <Typography color="textSecondary" variant="h5">
          Your shopping list is empty {":("}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleshoppingListFormOpen}
          sx={{ mt: 2 }}
        >
          Add your first item
        </Button>
      </Grid>
    </Grid>
  );
};
