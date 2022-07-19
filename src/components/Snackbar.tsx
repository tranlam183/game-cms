import React, { memo, useEffect } from "react";
import { Snackbar as MuiSnackbar, Alert, paperClasses } from "@mui/material";
import { useAppDispatch } from "store/hooks";
import { Text } from "components/shared";
import { useSnackbar } from "store/app/hooks";
import { updateSnackbar } from "store/app";

const Snackbar = () => {
  const dispatch = useAppDispatch();
  const snackbar = useSnackbar();

  const onClose = () => {
    dispatch(updateSnackbar(null));
  };

  useEffect(() => {
    return () => {
      dispatch(updateSnackbar(null));
    };
  }, [dispatch]);

  if (!snackbar?.severity) return null;

  return (
    <MuiSnackbar
      onClose={onClose}
      open={Boolean(snackbar)}
      autoHideDuration={3000}
      sx={{
        [`& .${paperClasses.root}`]: {
          backgroundColor: "common.white",
        },
      }}
    >
      <Alert severity={snackbar?.severity ?? "success"} sx={{ width: "100%" }}>
        <Text variant="body2" fontWeight={500} color="common.black">
          {snackbar?.message}
        </Text>
      </Alert>
    </MuiSnackbar>
  );
};

export default memo(Snackbar);
