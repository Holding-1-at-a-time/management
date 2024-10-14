/**
    * @description      : This component renders the children if the user has an active
    *                     organization, or the organization selection page if the user does
    *                     not have an active organization.
    * @author           : rrome
    * @group            : 
    * @created          : 25/09/2024 - 14:42:16
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/09/2024
    * - Author          : rrome
    * - Modification    : 
**/

import { OrganizationList } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { PropsWithChildren } from 'react'

/**
 * Renders the organization selection page if the user does not have an active
 * organization, or the children if the user has an active organization.
 * @param props The props passed to the component.
 * @returns The rendered component.
 */
export default function RequiredActiveOrgLayout(props: Readonly<PropsWithChildren>) {
    // Get the organization ID from the session
    const { orgId } = auth()

    console.log('[OrganizationSelectionPage] Props:', props);
    console.log('[OrganizationSelectionPage] orgId:', orgId);

    // If the user has an active organization, render the children
    if (orgId) {
        console.log('[OrganizationSelectionPage] User has an active organization, rendering children');
        return props.children
    }

    // If the user does not have an active organization, render the organization selection page
    console.log('[OrganizationSelectionPage] User does not have an active organization, rendering organization selection page');

    return (
        <section>
            <h1>Welcome to the Organization Selection page.</h1>
            <p>
                This part of the application requires the user to select an organization in order to
                proceed. If you are not part of an organization, you can accept an invitation or create your
                own organization.
            </p>
            <OrganizationList hidePersonal={true} />
        </section>
    )
}
