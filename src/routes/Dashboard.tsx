import { useEffect, useRef, memo, useState } from 'react';
import CryptoListings from '../components/CryptoListings';
import { useParams } from 'react-router-dom';
import OrderButtons from '../components/OrderButtons';
import TimeInterval from '../components/TimeInterval';

function TradingViewWidget() {
  const container = useRef<HTMLIFrameElement | null>(null);
  const [timeInterval, setTimeInterval] = useState('D');

  const params = useParams();

  useEffect(() => {
    if (container.current) {
      const widgetUrl = `https://www.tradingview.com/widgetembed/?frameElementId=tradingview_abc&symbol=${params.symbol}&interval=${timeInterval}&timezone=Etc%2FUTC&theme=dark&style=1&locale=en&backgroundColor=%23202020&allow_symbol_change=true&calendar=false&support_host=https%3A%2F%2Fwww.tradingview.com`;
      container.current.src = widgetUrl;
    }
  }, [timeInterval, params.symbol]);

  return (
    <div className="tradingview-widget-container flex">
      <iframe
        ref={container}
        id="tradingview_abc"
        title="TradingView Widget"
        style={{ width: "100%", height: "750px" }}
        frameBorder="0"
        allowTransparency={true}
        scrolling="no"
      ></iframe>
      <div className='px-5'>
        <CryptoListings />
        <TimeInterval setTimeInterval={setTimeInterval} timeInterval={timeInterval}/>
        <OrderButtons />
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
