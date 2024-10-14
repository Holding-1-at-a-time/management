/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 25/09/2024 - 14:17:47
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/09/2024
    * - Author          : rrome
    * - Modification    : 
**/
import { OrganizationList } from '@clerk/nextjs'

export default function OrganizationListings() {
    return (
        <OrganizationList
            hidePersonal={true}
            afterCreateOrganizationUrl="/organization/:slug"
            afterSelectPersonalUrl="/user/:id"
            afterSelectOrganizationUrl="/organization/:slug"
        />
    )
}