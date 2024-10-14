/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 25/09/2024 - 14:30:54
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/09/2024
    * - Author          : rrome
    * - Modification    : 
**/
/**
 * SyncActiveOrganization
 *
 * This component is used to sync the active organization with the organization
 * ID in the URL. It checks if the organization ID in the URL is valid, and if
 * it is not the same as the active organization, it sets the active organization
 * to be the org ID from the URL.
 */
'use client'

import { useOrganizationList, useAuth } from "@clerk/nextjs"
import { useParams, redirect } from "next/navigation"
import { useEffect } from "react"


export function SyncActiveOrganization() {
    const { setActive, isLoaded } = useOrganizationList()
    // Get the organization ID from the session
    const { orgId } = useAuth()
    // Get the organization ID from the URL
    const { orgId: urlOrgId } = useParams() as { orgId: string }

    useEffect(() => {
        console.log('SyncActiveOrganization: ', { orgId, isLoaded, setActive, urlOrgId })

        // If the org ID in the URL is not valid, redirect to the homepage
        if (!isLoaded || !urlOrgId?.startsWith('org_')) {
            console.log('SyncActiveOrganization: Org ID is not valid, redirecting to homepage')
            redirect('/')
            return
        }

        // If the org ID in the URL is not the same as the org ID in the session
        // (the active organization), set the active organization to be the org
        // ID from the URL.
        if (urlOrgId && urlOrgId !== orgId) {
            console.log('SyncActiveOrganization: Org ID in URL is different from the org ID in the session, setting active organization')
            void setActive({ organization: urlOrgId })
        }
    }, [orgId, isLoaded, setActive, urlOrgId])

    return null
}

