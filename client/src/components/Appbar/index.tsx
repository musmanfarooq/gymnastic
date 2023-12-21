import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Avatar, Tooltip } from "@mui/material";
import {
  LogoutOutlined,
  Person,
  Person4Outlined,
  Settings,
} from "@mui/icons-material";

interface NavBarProps {
  name?: string;
  onLogout?: () => void;
}

export default function NavBar(props: NavBarProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const textLogo = props?.name?.charAt(0).toUpperCase();
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gymnastic
          </Typography>
          <Tooltip title={`${props.name}`} placement="bottom-start">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar alt={textLogo} src="./images/logo.png" />
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Box
                flex={1}
                sx={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <Settings />
                Profile
              </Box>
            </MenuItem>
            <MenuItem onClick={props.onLogout}>
              <Box
                flex={1}
                sx={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <LogoutOutlined />
                Logout
              </Box>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
