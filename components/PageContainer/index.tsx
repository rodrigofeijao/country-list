import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Toolbar,
  Link as TypographyLink,
  ThemeProvider,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { createTheme } from "@mui/material/styles";
import Link from "next/link";

import { BOX, LANG_ICON } from "./styles";

interface PageContainerProps {
  children: JSX.Element;
}

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
  },
});

/**
 * This component will work as a wrapper to all pages in order to keep the same structure around all of them (header + content)
 * @param chilren JSX Component to be rendered
 * @returns
 */
function PageContainer({ children }: PageContainerProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative" color="primary">
        <Toolbar>
          <LanguageIcon sx={LANG_ICON} />
          <Link href="/" passHref>
            <TypographyLink
              variant="h6"
              color="inherit"
              noWrap
              underline="none"
            >
              List of Countries
            </TypographyLink>
          </Link>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box sx={BOX}>{children}</Box>
      </Container>
    </ThemeProvider>
  );
}

export default PageContainer;
