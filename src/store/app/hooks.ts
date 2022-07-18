import { State } from "store/configureStore";
import { useAppSelector } from "store/hooks";
import { AuthData, Snackbar } from "./reducer";
import { PublicKey } from "@solana/web3.js";

export type Auth = {
  isConnected: boolean;
  publicKey: PublicKey | null;
} & AuthData;

export const useSnackbar = () => {
  const snackbar: Snackbar | null = useAppSelector(
    (state: State) => state.app.snackbar,
  );
  return snackbar;
};

export const useAuth = (): Auth => {
  const walletAddress = useAppSelector(
    (state) => state.app.walletAddress,
  );
  const token = useAppSelector((state) => state.app.token);
  const walletName = useAppSelector((state) => state.app.walletName);

  return {
    isConnected: Boolean(walletAddress && token),
    walletAddress,
    token,
    publicKey: walletAddress ? new PublicKey(walletAddress) : null,
    walletName,
  };
};
