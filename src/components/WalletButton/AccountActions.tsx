import React, { memo, useEffect, useState, useCallback } from "react";
import {
  Box,
  CircularProgress,
  menuItemClasses,
  Skeleton,
  Typography,
} from "@mui/material";
import { Option } from "constant/types";
import Dropdown, { sxConfigs } from "./DropDown";
import {  updateAuth,  } from "store/app";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/router";
import { shortText } from "utils";
import { useAppDispatch } from "store/hooks";
import { useAuth } from "store/app/hooks";

enum ACCOUNT_ACTION {
  SETTING = 1,
  CONNECT_OTHER_WALLET,
  LOGOUT,
}

const AccountActions = () => {
  const { token, walletAddress } = useAuth();
  const dispatch = useAppDispatch();

  const { setVisible } = useWalletModal();

  const { disconnect } = useWallet();
  const router = useRouter();


  const openModal = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const onDisconnect = () => {
    disconnect();
    dispatch(
      updateAuth({ token: null, walletAddress: null, walletName: null }),
    );
    // dispatch(fieldChange({ key: "profile", value: null }));
  };

  const onConnectOtherWallet = () => {
    onDisconnect();
    openModal();
  };

  const onChange = (newOption: Option) => {
    const value = newOption.value as ACCOUNT_ACTION;
    switch (value) {
      case ACCOUNT_ACTION.CONNECT_OTHER_WALLET:
        onConnectOtherWallet();
        break;
      case ACCOUNT_ACTION.LOGOUT:
        onDisconnect();
        break;
      default:
        break;
    }
  };


    return (
      <Box >
        <Dropdown
        buttonProps={{
          children: <Typography variant="body2">{shortText(walletAddress as string)}</Typography>,
          disableRipple: true,
          disableFocusRipple: true,
        }}
        options={options}
        onChange={onChange}
        menuItemProps={{
          sx: {
            ...sxConfigs.menuItem,
            [`&.${menuItemClasses.focusVisible}`]: {
              backgroundColor: "inherit",
            },
          },
        }}
      />
      </Box>
    );
};

export default memo(AccountActions);

const options = [
  {
    label: "Connect a different wallet",
    value: ACCOUNT_ACTION.CONNECT_OTHER_WALLET,
  },
  {
    label: "Logout",
    value: ACCOUNT_ACTION.LOGOUT,
  },
];
