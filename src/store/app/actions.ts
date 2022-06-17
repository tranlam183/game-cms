import { createAction } from "@reduxjs/toolkit";
import { Snackbar } from "./reducer";

export const updateSnackbar = createAction<Snackbar | null>(
  "application/updateSnackbar",
);
