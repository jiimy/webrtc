'use client';
import React from 'react';
import Container from './Container';
import { useRouter } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { useAuth } from '@clerk/clerk-react';

const NavBar = () => {
  const router = useRouter();
  const { userId } = useAuth();
  return (
    <div className='sticky top-0 border'>
      <Container>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-1 cursor-pointer' onClick={() => router.push('/')}>
            <span>아이콘</span>
            <div className='font-bold text-xl'>chat</div>
          </div>
          <div className='flex gap-3 items-center'>
            <UserButton />
            {!userId && <>
              <button onClick={() => router.push('/sign-in')}>Sign in</button>
              <button onClick={() => router.push('/sign-up')}>Sign up</button>
            </>}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;