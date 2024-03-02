"use client";

// React Imports
import React, { useState, useRef, useContext } from "react";

// Next Imports
import Image from "next/image";
import dynamic from "next/dynamic";

// UI Imports
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

// Context Imports
import { ColorModeContext } from "@/store/context/ThemeContext";

// Third party Imports
import { useRouter } from "next-nprogress-bar";

// Icons Imports
import { IoMenu } from "react-icons/io5";

const AuthModalNoSSR = dynamic(() => import("@/components/AuthModal"), {
  ssr: false,
});

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { label: "Home", path: "/" },
  { label: "Features", path: "/" },
  { label: "Pricing", path: "/" },
  { label: "Contact Us", path: "/" },
];

export default function Navbar(props: Props) {
  const { window } = props;
  const { mode } = useContext(ColorModeContext);
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const authDialogRef = useRef<HTMLDialogElement>(null);
  const LogoImageUrl =
    mode === "light" ? "/images/LogoImage.png" : "/images/LogoImageDark.png";
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleAuthModalOpen = () => {
    authDialogRef.current?.showModal();
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Image
        src={LogoImageUrl}
        width={0}
        height={0}
        priority
        unoptimized
        className="w-[200px] h-auto p-4"
        alt="Query Docs"
      />
      <Divider className="w-full" />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.label}
            disablePadding
            onClick={() => {
              router.push(item.path);
            }}
          >
            <ListItemButton className="text-center">
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <Button
          variant="contained"
          className="mx-3"
          onClick={handleAuthModalOpen}
        >
          Sign In
        </Button>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="static" component="nav">
          <Toolbar className="p-4">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Image
                src={LogoImageUrl}
                width={0}
                height={0}
                priority
                unoptimized
                className="w-[200px] h-auto"
                alt="Query Docs"
              />
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <IoMenu className="text-black" />
            </IconButton>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  className="mx-3 font-semibold"
                  onClick={() => {
                    router.push(item.path);
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                variant="contained"
                className="mx-3"
                onClick={handleAuthModalOpen}
              >
                Sign In
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
      <AuthModalNoSSR dialogRef={authDialogRef} />
    </>
  );
}
