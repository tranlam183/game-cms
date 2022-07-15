import styled from "styled-components";

const WalletWrapper = styled.div`
  position: fixed;
  z-index: 9999;
  top: 10px;
  right: 24px;
  justify-content: flex-end;

  &.dark{
    position: unset;
    .wallet-adapter-button{
        background-color: #FC5B09;
    }
  }

  button {
    text-transform: capitalize !important;
  }

  .wallet-adapter-button {
    line-height: 100%;
    background-color: transparent;
    border-radius: 0;
    text-transform: uppercase;
    width: 180;
    margin: auto;
  }

  .wallet-adapter-dropdown-list {
    position: relative;
    .wallet-adapter-dropdown-list-item {
      font-size: 11px;
      letter-spacing: 0.5px;
    }
  }
  .wallet-adapter-modal{
    z-index:1300; !important;
  }
`;

export default WalletWrapper;
