/**
 * Represents the structure of organization information.
 * @interface 
 * @abstract The organization information.
 * @typedef {Object} OrganizationInfo - The organization information.
 * @property {string} org_id - The unique identifier of the organization.
 * @property {string} org_name - The name of the organization.
 * @property {string} org_role - The role of the organization.
 * @property {string} org_slug - The slug of the organization.
 * @property {string} org_image - The image associated with the organization.
 */

interface OrganizationInfo {
    org_id: string;
    org_name: string;
    org_role: string;
    org_slug: string;
    org_image: string;
  }
export default OrganizationInfo