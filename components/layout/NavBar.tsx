// All of the imports needed to run
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "next/link";

// Running the navbar function
export default function NavBar(): JSX.Element {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/">
            <Typography
              variant="h5" // size of the "logo" text on the navbar
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex" },
                fontFamily: "monospace", // setting the font of the nav bar
                fontWeight: 700, // weight of the font
                letterSpacing: ".3rem", // letter spacing
                cursor: "pointer" // Force the component to behave like a link
              }}
            >
              Scheduler Builder
            </Typography>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
