
import {
  WalletModalProvider, WalletMultiButton,
  WalletModalProps
} from "@solana/wallet-adapter-react-ui";

import dynamic from 'next/dynamic';

const WalletWrapper = dynamic(() => import('./walletbutton.style'), {
  ssr: false,
})


// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");
interface UIProps {
  drakMode?: boolean;
}
export const WalletButton = (props: UIProps) => {
  return (
    <WalletWrapper className={props.drakMode ? "dark" : ""} id="walletButton" style={{zIndex:1210}}>
      <WalletModalProvider >
        <WalletMultiButton style={{border: "1px solid white"}}/>
      </WalletModalProvider>
    </WalletWrapper>
  );
};

