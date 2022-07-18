import React, { memo, useEffect } from "react";
import WalletConnector from "./WalletConnector";
import { useAuth } from "store/app/hooks";
import { clearToken, setToken } from "api/client";
import { useAppSelector } from "store/hooks";
import { CircularProgress } from "@mui/material";

const WalletButton = () => {
  const { token } = useAuth();
  const appReady = useAppSelector((state) => state.app.appReady);

  useEffect(() => {
    if (token) {
      setToken(token);
    } else {
      clearToken();
    }
  }, [token]);

  if (appReady) {
    return <WalletConnector />;
  }
  return <CircularProgress size={24} />;
};

export default memo(WalletButton);

export const HEIGHT_HEADER = 80;