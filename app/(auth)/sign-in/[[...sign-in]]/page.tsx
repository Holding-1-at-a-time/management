"use client";

import React, { Suspense } from 'react';
import { SignIn } from '@clerk/nextjs';

const Page = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <SignIn />
    </Suspense>
);

export default Page;