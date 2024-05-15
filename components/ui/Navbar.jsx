'use client'
import Link from 'next/link';
import React from 'react';
import { Button } from './Button';
import { UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import TickEvent from './TickEvent.png'

export const Navbar = () => {
  const { user } = useUser();

  return (
    <div className='bg-stone-100 py-2 px-2'>
      <nav className='flex justify-between container mx-auto'>
        <Link className='py-2 px-4' href='/'>
          <Image src={TickEvent} style={{ maxWidth: '10%', height: 'auto' }} /> 
        </Link>

        <div className='flex justify-center items-center gap-6'>
          {user && (
            <div className='flex gap-6'>
              <Link href='/events'>Events</Link>
              <Link href='/dashboard'>Dashboard</Link>
            </div>
          )}
          <UserButton afterSignOutUrl='/' />
        </div>

      
        {!user && (
          <div className='py-2 px-4'>
            <Link href='/sign-in'>
                <Button className='bg-red-500 font-bold'>Sign in</Button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};
