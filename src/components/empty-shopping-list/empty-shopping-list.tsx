import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { ActionTypes, GlobalAppContext } from "src/store";

export const EmptyShoppingList = () => {
  const { state, dispatch } = useContext(GlobalAppContext);

  const handleshoppingListFormOpen = () => {
    dispatch({
      type: ActionTypes.SET_SHOPPING_LIST_FORM,
      payload: true,
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
        borderRadius: 5,
      }}
    >
      <Grid item>
        <Typography color="textPrimary">
          Your shopping list is empty {":("}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color="primary"
          variant="contained"
          onClick={handleshoppingListFormOpen}
        >
          Add your first item
        </Button>
      </Grid>
    </Grid>
  );
};
