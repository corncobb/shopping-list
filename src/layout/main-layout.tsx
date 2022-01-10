import { styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Navbar, ShoppingListForm } from "src/components";

const MainLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  // overflow: 'hidden',
  width: "100%",
}));

export const MainLayout = () => (
  <MainLayoutRoot>
    <Navbar>
      <Outlet />
      <ShoppingListForm />
    </Navbar>
  </MainLayoutRoot>
);
