import { ConnectWallet, weiweb3Provider } from "@weiweb3/react";

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

export default function Home() {
  return <KitchenSink />;
}
