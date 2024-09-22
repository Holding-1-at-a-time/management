"use client";

import React, { Suspense } from 'react';
import { SignIn } from '@clerk/nextjs';

/**
 * This component renders a Clerk sign-in form. The form is wrapped in a React
 * Suspense component to allow the Clerk component to load lazily. This is
 * important because the Clerk component is large, and including it in the
 * initial bundle can cause performance problems.
 *
 * The form is wrapped in a Suspense component with a simple "Loading..."
 * message. This is because the Clerk component is lazy-loaded, and may take
 * some time to load, especially on slower networks.
 */
const Page = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <SignIn />
    </Suspense>
);
export default Page;