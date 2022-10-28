import { ConnectWallet, weiweb3Provider } from "@weiweb3/react";
import React from "react";
import ReactDOM from "react-dom/client";

export const KitchenSink = () => {
  return (
    <weiweb3Provider>
      <WrappedKitchenSink />
    </weiweb3Provider>
  );
};

const WrappedKitchenSink = () => {
  return (
    <div id="kitchen-sink">
      <ConnectWallet />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <KitchenSink />
  </React.StrictMode>,
);
