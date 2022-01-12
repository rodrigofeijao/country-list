import { SxProps } from "@mui/material";

export const FULL: SxProps = {
  width: "100%",
};

export const LANG_ICON: SxProps = { mr: 2 };

export const BOX: SxProps = {
  ...FULL,
  my: 4,
  display: "flex",
  flexDirection: "column",
};
