import React from 'react'

interface IUseInterval {
  (callback: () => void, interval: number| null): void;
}

const useInterval:IUseInterval = (callback, interval) => {
    const savedCallback = React.useRef<()=>void>(()=>{});
  
    React.useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    React.useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if(interval){
        const id = setInterval(tick, interval);
        return () => clearInterval(id);
      }
    }, [interval]);
  };

export default useInterval
