import Image from 'next/image';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Avatar = ({ src }: { src?: string }) => {
  if (src) {
    return (
      <div>
        <Image
          src={src}
          alt=""
          width={40}
          height={40}
          className='rounded-full'
        />
      </div>
    );
  }
  return <FaUserCircle size={24} />
};

export default Avatar;