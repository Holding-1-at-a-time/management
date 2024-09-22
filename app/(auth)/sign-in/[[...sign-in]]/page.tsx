/**
 * The sign-in page.
 *
 * This page renders the Clerk SignIn component, which handles user sign-in.
 * The component is rendered asynchronously, so we add a loading state to
 * handle that.
 */
import React, { useState, useEffect } from 'react';
import { SignIn } from '@clerk/nextjs';

/**
 * The Page component.
 *
 * This component renders the SignIn component, and handles the loading state
 * for asynchronous rendering.
 */
export default function Page() {
    const [loading, setLoading] = useState(true);

    /**
     * The effect function.
     *
     * This function is called when the component is mounted. It renders the
     * SignIn component, and sets the loading state to false when done.
     */
    useEffect(() => {
        // Simulate a 2-second loading delay
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    /**
     * The render function.
     *
     * This function renders the SignIn component if the loading state is false,
     * or a loading message if the loading state is true.
     */
    if (loading) {
        return <div>Loading...</div>;
    }

    try {
        // Render the SignIn component
        const signInComponent = <SignIn />;
        console.log('SignIn Component:', signInComponent);
        return signInComponent;
    } catch (error) {
        // Handle the error accordingly, e.g., show a fallback UI
        console.error('Error rendering SignIn component:', error);
        return <div>Error rendering SignIn component</div>;
    }
}