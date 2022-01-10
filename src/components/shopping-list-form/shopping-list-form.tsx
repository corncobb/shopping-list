import { AppBar, Toolbar, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Drawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect, useState } from "react";
import { HideIcon } from "src/assets/icons";
import { IShoppingListItem } from "src/models/models";
import { ActionTypes, GlobalAppContext } from "src/store";

export const ShoppingListForm = () => {
  const { state, dispatch } = useContext(GlobalAppContext);
  const theme = useTheme();
  const isMobile = useMediaQuery<boolean>(theme.breakpoints.down("md"));

  const emptyFormData: IShoppingListItem = {
    name: "",
    description: "",
    quantity: "",
    isCompleted: false,
  };

  const [formData, setFormData] = useState<IShoppingListItem>(emptyFormData);

  useEffect(() => {
    // If the form type is EDIT then set the form data to the item data
    if (state.shoppingListForm.type === "EDIT") {
      const formData: IShoppingListItem = {
        name: state.shoppingListForm.data?.name ?? "",
        description: state.shoppingListForm.data?.description ?? "",
        quantity: state.shoppingListForm.data?.quantity ?? "",
        isCompleted: state.shoppingListForm.data?.isCompleted ?? false,
      };
      setFormData(formData);
    }
  }, [state.shoppingListForm]);

  // Handlers
  const handleQuantityChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, quantity: value }));
  };

  const handleDrawerClose = () => {
    setFormData(emptyFormData);

    dispatch({
      type: ActionTypes.SET_SHOPPING_LIST_FORM,
      payload: null,
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

  const handleAddTaskSubmit = () => {
    dispatch({
      type: ActionTypes.ADD_SHOPPING_LIST_ITEM,
      payload: formData,
    });

    handleDrawerClose();
  };

  const handleEditTask = () => {
    // We need to add the id to the object to update
    const { id } = state.shoppingListForm.data as IShoppingListItem;

    // If for some reason we can't get the id, return and throw error
    if (!id) return;

    const formattedFormData = {
      ...formData,
      id,
    };
    dispatch({
      type: ActionTypes.EDIT_SHOPPING_LIST_ITEM,
      payload: formattedFormData,
    });

    handleDrawerClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default behavior which is refreshing the page
    event.preventDefault();

    switch (state.shoppingListForm.type) {
      case "ADD":
        handleAddTaskSubmit();
        break;
      case "EDIT":
        handleEditTask();
        break;
      default:
      // do nothing
    }
  };

  // Handles the "purchased" checkbox in the UI
  const handleIsCompleted = () => {
    setFormData((prev) => ({ ...prev, isCompleted: !prev.isCompleted }));
  };

  return (
    <Drawer
      anchor="right"
      open={state.shoppingListForm.open}
      onClose={handleDrawerClose}
      sx={{
        width: isMobile ? window.innerWidth : 614,
      }}
    >
      <Box
        sx={{
          width: isMobile ? window.innerWidth : 614,
          height: "100%",
          borderBottom: `5px solid ${theme.palette.primary.main}`,
        }}
        role="presentation"
      >
        <AppBar
          position="relative"
          color="default"
          elevation={0}
          sx={{ borderBottom: "0.5px solid #D5DFE9" }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography
              color="textPrimary"
              variant="h5"
              sx={{ textTransform: "uppercase" }}
            >
              Shopping List
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              <HideIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid
          container
          component="form"
          onSubmit={handleSubmit}
          direction="column"
          rowSpacing={3}
          sx={{ p: 3, height: "calc(100% - 64px)", pb: 0 }}
        >
          <Grid item>
            <Typography color="textPrimary" component="p" variant="h5">
              {state.shoppingListForm.type === "ADD" ? "Add" : "Edit"} an Item
            </Typography>
            <Typography color="textPrimary" component="p" variant="body1">
              {state.shoppingListForm.type === "ADD" ? "Add" : "Edit"} your new
              item below
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              onChange={handleNameChange}
              sx={{ width: "100%" }}
              label="Item Name"
              name="name"
              value={formData.name}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item>
            <TextField
              onChange={handleDescriptionChange}
              sx={{ width: "100%" }}
              label="Description"
              name="description"
              value={formData.description}
              variant="outlined"
              multiline
              rows={4}
              inputProps={{ maxLength: 100 }}
              required
            />
            <Typography
              component="p"
              variant="caption"
              align="right"
              color="textPrimary"
              sx={{ marginLeft: "auto" }}
            >
              {formData.description.length}/{100}
            </Typography>
          </Grid>
          <Grid item>
            <FormControl sx={{ width: "100%", flexGrow: 1 }}>
              <InputLabel id="select-quantity-label">How Many?</InputLabel>
              <Select
                labelId="select-quantity-label"
                value={formData.quantity}
                label="How Many?"
                required
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

          {/* Only show if under EDIT state */}
          {state.shoppingListForm.type === "EDIT" && (
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isCompleted}
                    onChange={handleIsCompleted}
                  />
                }
                label="Purchased"
              />
            </Grid>
          )}
          <Grid
            item
            container
            justifyContent="flex-end"
            sx={{ marginTop: "auto" }}
          >
            <Button
              variant="text"
              color="secondary"
              onClick={handleDrawerClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              sx={{ ml: 3 }}
            >
              {state.shoppingListForm.type === "ADD" ? "Add Task" : "Save Item"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
};
