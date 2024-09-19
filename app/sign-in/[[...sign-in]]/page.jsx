import { SignIn } from '@clerk/nextjs'
import React from 'react';

export default function Page() {
     const gradientStyle = {
    background: 'linear-gradient(to bottom right, #6B46C1, #ED64A6, #F56565)',
    height: '100vh',
  };
  return (
      <div className="min-h-screen w-full flex items-center justify-center " style={gradientStyle}>
    
        <SignIn />

    </div>
  )
}