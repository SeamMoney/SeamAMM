import CoinIcon from 'components/CoinIcon';
import { getTokenList } from 'modules/swap/reducer';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { IPoolToken } from 'types/pool';

interface TProps {
  token0: IPoolToken;
  token1: IPoolToken;
}

const TokenPair: React.FC<TProps> = ({ token0, token1 }) => {
  const tokenList = useSelector(getTokenList);
  const [token0URI, token1URI] = useMemo(() => {
    const token0Src = tokenList.find((token) => token.symbol === token0.symbol);
    const token1Src = tokenList.find((token) => token.symbol === token1.symbol);
    return [token0Src?.logoURI, token1Src?.logoURI];
  }, [tokenList, token0, token1]);
  return (
    <div className="flex items-center gap-4 w-[240px] max-w-[240px]">
      <div className="flex flex-col gap-2 border-[3px] border-primeBlack20 p-1 rounded-3xl">
        <CoinIcon className="w-8 h-8" logoSrc={token0URI || ''} />
        <CoinIcon className="w-8 h-8" logoSrc={token1URI || ''} />
      </div>
      <div className="header4 bold">
        {token0.symbol}/{token1.symbol}
      </div>
    </div>
  );
};

export default TokenPair;
