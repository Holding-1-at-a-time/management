"use client";

import React, { Suspense } from 'react';
import { SignUp } from '@clerk/nextjs';

const Page = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <SignUp />
    </Suspense>
);

export default Page;