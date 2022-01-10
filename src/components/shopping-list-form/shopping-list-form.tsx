import { AppBar, Toolbar, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useContext, useState } from "react";
import { IShoppingListItem } from "src/models/models";
import { ActionTypes, GlobalAppContext } from "src/store";

export const ShoppingListForm = () => {
  const { state, dispatch } = useContext(GlobalAppContext);
  const theme = useTheme();
  const isMobile = useMediaQuery<boolean>(theme.breakpoints.down("md"));

  const initialFormData: IShoppingListItem = {
    name: "",
    description: "",
    quantity: "",
  };

  const [formData, setFormData] = useState<IShoppingListItem>(initialFormData);

  // Handlers
  const handleQuantityChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, quantity: value }));
  };

  const handleDrawerClose = () => {
    dispatch({
      type: ActionTypes.SET_SHOPPING_LIST_FORM,
      payload: false,
    });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, name: value }));
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    handleDrawerClose();
  };

  const handleSubmit = () => {
    console.log("formdata", formData);
    dispatch({
      type: ActionTypes.ADD_SHOPPING_LIST_ITEM,
      payload: formData,
    });

    handleDrawerClose();
  };

  const list = () => (
    <Box sx={{ width: isMobile ? "100%" : 614 }} role="presentation">
      <AppBar position="relative" color="primary" elevation={0}>
        <Toolbar>
          <Typography color="textPrimary" sx={{ textTransform: "uppercase" }}>
            Shopping List
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container direction="column" justifyContent="center" rowSpacing={3}>
        <Grid item>
          <TextField
            onChange={handleNameChange}
            sx={{ width: "100%" }}
            label="Item Name"
            name="name"
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <TextField
            onChange={handleDescriptionChange}
            sx={{ width: "100%" }}
            label="Description"
            name="description"
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <FormControl sx={{ width: "100%", flexGrow: 1 }}>
            <InputLabel id="select-quantity-label">How Many?</InputLabel>
            <Select
              labelId="select-quantity-label"
              value={formData.quantity}
              label="How Many?"
              onChange={handleQuantityChange}
            >
              <MenuItem value="">How Many?</MenuItem>
              {[1, 2, 3].map((value: number) => (
                <MenuItem value={value} key={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Button variant="text" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add Task
        </Button>
      </Grid>
    </Box>
  );
  return (
    <Drawer
      anchor="right"
      open={state.shoppingListForm}
      onClose={handleDrawerClose}
    >
      {list()}
    </Drawer>
  );
};
