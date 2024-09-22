/**
 * The sign-up page.
 *
 * This page renders the Clerk SignUp component, which handles user sign-up
 * and login. The component is rendered asynchronously, so we add a loading
 * state to handle that.
 */
import { SignUp } from '@clerk/nextjs'
import { useEffect, useState } from 'react';

/**
 * The Page component.
 *
 * This component renders the SignUp component, and handles the loading state
 * for asynchronous rendering.
 */
export default function Page() {
    const [loading, setLoading] = useState(true);

    /**
     * The effect function.
     *
     * This function is called when the component is mounted. It renders the
     * SignUp component, and sets the loading state to false when done.
     */
    useEffect(() => {
        try {
            console.log('Rendering SignUp component...');
            const signUpComponent = <SignUp />;
            console.log('SignUp Component:', signUpComponent);
            setLoading(false);
        } catch (error) {
            console.error('Error rendering SignUp component:', error);
            setLoading(false);
        }
    }, []);

    /**
     * The render function.
     *
     * This function renders the SignUp component if the loading state is false,
     * or a loading message if the loading state is true.
     */
    if (loading) {
        return <div>Loading...</div>;
    }

    return <SignUp />;
}

