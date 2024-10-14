/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 25/09/2024 - 14:28:04
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/09/2024
    * - Author          : rrome
    * - Modification    : 
**/

import { OrganizationList } from "@clerk/nextjs";

/**
 * The Organization Selection page is a page that is rendered when the user is not
 * part of an organization. This page allows the user to select an organization
 * to join, or to create their own organization.
 *
 * The page is rendered as a client component, which means that it will be rendered
 * on the client (as opposed to the server). This is done to allow the user to
 * select an organization without having to reload the page.
 *
 * The page takes a single parameter, `redirectUrl`, which is the URL that the
 * user will be redirected to after they have selected an organization.
 *
 * @param {{ redirectUrl: string }} props The properties for the component.
 * @returns {JSX.Element} The rendered component.
 */

export default function OrganizationSelection({
    redirectUrl,
}: Readonly<{
    redirectUrl: string;
}>): JSX.Element {
    console.log("Rendering OrganizationSelection page");
    console.log(`redirectUrl: ${redirectUrl}`);

    return (
        <section>
            <h1>Welcome to the Organization Selection page.</h1>
            <p>
                This part of the application requires the user to select an
                organization in order to proceed. If you are not part of an
                organization, you can accept an invitation or create your own
                organization.
            </p>
            <OrganizationList
                hidePersonal={true}
                afterCreateOrganizationUrl={redirectUrl}
                afterSelectOrganizationUrl={redirectUrl}
            />
        </section>
    );
}
