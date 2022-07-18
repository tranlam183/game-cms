import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Box, Button, ButtonProps } from "@mui/material";
import { Text } from "components/shared";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { client, Endpoint } from "api";
import { PhantomError } from "constant/types";
import { HttpStatusCode } from "constant/enum";
import { updateAuth, updateSnackbar,  } from "store/app";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getSignMessage } from "utils";
import { setToken } from "api/client";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import AccountActions from "./AccountActions";
import { useAuth } from "store/app/hooks";

type ConnectButtonProps = ButtonProps & {
  children: string;
};

const WalletConnector = () => {
  const { publicKey, wallet, disconnect, connect } = useWallet();
  const { setVisible } = useWalletModal();
  const { isConnected } = useAuth();

  const appReady = useAppSelector((state) => state.app.appReady);

  const dispatch = useAppDispatch();

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);

  const onOpenWalletsModal = () => {
    setVisible(true);
  };

  const [signMessage, setSignMessage] = useState<string | null>(null);
  const [error, setError] = useState<PhantomError | null>(null);

  const onPostAuth = useCallback(async () => {
    if (!base58 || !signMessage || !publicKey || !wallet?.adapter?.name) return;
    try {
      const response = await client.post(
        Endpoint.AUTH,
        {
          signature: signMessage,
          wallet: base58,
        //   network: BLOCKCHAIN_NETWORK, // Default: Solana
        },
      );
      if (response?.status === HttpStatusCode.CREATED) {
        const token = response.data.accessToken;
        setToken(token);
        dispatch(
          updateAuth({
            token,
            walletAddress: base58,
            walletName: wallet.adapter.name,
          }),
        );
        setSignMessage(null);
      } else {
        // eslint-disable-next-line no-throw-literal
        throw { message: "Error", code: ERROR_API };
      }
    } catch (error) {
      console.error(error);
      setError(error as unknown as PhantomError);
      setSignMessage(null);
    }
  }, [base58, signMessage, dispatch, publicKey, wallet?.adapter?.name]);

  const onPostSignature = useCallback(async (wallet: string) => {
    if (!wallet) return;
    try {
      const response = await client.post(
        `${Endpoint.AUTH}/signature-message`,
        {
        //   network: BLOCKCHAIN_NETWORK, // Default: Solana
          wallet,
        },
      );
      if (response.status === HttpStatusCode.CREATED) {
        const _signMessage = response.data.signatureMessage;
        const signature = await getSignMessage(_signMessage);

        setSignMessage(signature);
      } else {
        // eslint-disable-next-line no-throw-literal
        throw { message: "Error", code: ERROR_API };
      }
    } catch (error) {
      console.error("onPostSignature: ", error);
      setError(error as unknown as PhantomError);
    }
  }, []);

  const onConnect = () => {
    connect().catch(() => {
      //
    });
  };

  useEffect(() => {
    if (
      !base58 ||
      wallet?.adapter?.name !== "Phantom" ||
      isConnected ||
      !appReady
    )
      return;
    onPostSignature(base58);
  }, [base58, wallet?.adapter?.name, isConnected, onPostSignature, appReady]);

  useEffect(() => {
    onPostAuth();
  }, [onPostAuth]);

  useEffect(() => {
    if (error) {
      disconnect();
      setError(null);
      dispatch(
        updateSnackbar({
          message: "Error",
          severity: "error",
        }),
      );
    }
  }, [error, disconnect, dispatch]);

  if (!wallet && !isConnected) {
    return (
      <ConnectButton
        onClick={onOpenWalletsModal}
        className={CONNECT_BUTTON_CLASS}
      >
        Connect Wallet
      </ConnectButton>
    );
  }

  if (!isConnected && wallet) {
    const content =
      wallet.readyState === WalletReadyState.Installed
        ? "Pending..."
        : "Connect";

    return (
      <ConnectButton
        className={CONNECT_BUTTON_CLASS}
        onClick={onConnect}
        startIcon={
          <Box
            component="img"
            width={20}
            height={20}
            src={wallet.adapter.icon}
            alt={wallet.adapter.name}
          />
        }
      >
        {content}
      </ConnectButton>
    );
  }

  return (

    <AccountActions />

  );
};

export default memo(WalletConnector);

const ConnectButton = memo((props: ConnectButtonProps) => {
  const { children, ...rest } = props;

  return (
    <Button
      sx={{
        border: "1px solid",
        borderColor: "common.white",
        py: 1.375,
        px: 3,
        boxSizing: "border-box",
      }}
      {...rest}
    >
      <Text fontFamily="Mashine" fontWeight={700}>
        {children}
      </Text>
    </Button>
  );
});

ConnectButton.displayName = "ConnectButton";

const BLOCKCHAIN_NETWORK = "Solana";
const ERROR_API = 2109; // Assign 2109 is error code
export const CONNECT_BUTTON_CLASS = "connect-button";