/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 25/09/2024 - 14:39:58
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/09/2024
    * - Author          : rrome
    * - Modification    : 
**/
/**
 * The OrganizationLayout component is a high-level component that wraps the
 * children components of the organization route. It is responsible for
 * synchronizing the active organization with the organization ID in the URL.
 *
 * @param props - The props passed to the component.
 * @returns The rendered component.
 */

import { type PropsWithChildren } from 'react'
import { SyncActiveOrganization } from '../../../utils/sync-active-organization';
export default function OrganizationLayout(props: Readonly<PropsWithChildren>) {
    console.log('[OrganizationLayout] props:', props);
    return (
        <>
            {/* Synchronize the active organization with the organization ID in the URL. */}
            <SyncActiveOrganization />
            {/* Render the children components. */}
            {props.children}
        </>
    )
}

