import React from 'react'

const Ping = () => {
    return (
      <span className='relative flex h-3 w-3'>
        <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75' />
        <span className='inline-flex h-3 w-3 rounded-full bg-green-500' />
      </span>
    );
};

export default Ping