import Button from 'components/Button';
import { useMemo } from 'react';
import { useWallet } from '@manahippo/aptos-wallet-adapter';

type TOptionProps = {
  onClick?: () => void;
  label: string;
  icon?: string;
};

const Option: React.FC<TOptionProps> = ({ onClick, label, icon }) => {
  return (
    <Button
      onClick={onClick ? onClick : undefined}
      className="flex gap-2 grow justify-start mt-2 rounded-[0px] w-full"
      size="small"
      variant="secondary">
      <img src={icon} width={24} height={24} className="block rounded-full" />
      <div className="font-bold text-left">{label}</div>
    </Button>
  );
};

const WalletSelector = ({ onConnected }: { onConnected: () => any }) => {
  const { wallets, connect } = useWallet();

  const renderButtonGroup = useMemo(() => {
    return wallets.map((wallet) => {
      const option = wallet.adapter;
      return (
        <Option
          key={option.name}
          label={option.name}
          icon={option.icon}
          onClick={async () => {
            await connect(option.name);
            onConnected();
          }}
        />
      );
    });
  }, [wallets, connect, onConnected]);

  return (
    <div className="p-6 flex flex-col gap-6">
      <h6 className="font-bold text-black mobile:hidden">Connect your wallet</h6>
      <div className="flex flex-col gap-2">{renderButtonGroup}</div>
    </div>
  );
};

export default WalletSelector;
