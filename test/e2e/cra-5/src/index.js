import { ConnectWallet, weiweb3Provider } from "@weiweb3/react";
import React from "react";
import ReactDOM from "react-dom/client";

const KitchenSink = () => {
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <KitchenSink />
  </React.StrictMode>,
);
