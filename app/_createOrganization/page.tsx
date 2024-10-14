/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 25/09/2024 - 16:34:34
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/09/2024
    * - Author          : rrome
    * - Modification    : 
**/
import { CreateOrganization } from '@clerk/nextjs'

export default function CreateOrganizationPage() {
    return <CreateOrganization path="/create-organization" />
}