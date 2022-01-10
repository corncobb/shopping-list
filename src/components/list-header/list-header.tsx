import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { IShoppingListForm } from "src/models/models";
import { ActionTypes, GlobalAppContext } from "src/store";

export const ListHeader = () => {
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
    <Box component="section" sx={{ mt: 3 }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography color="textPrimary" component="h2" variant="h5">
            Your Items
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleshoppingListFormOpen}
          >
            Add Item
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
