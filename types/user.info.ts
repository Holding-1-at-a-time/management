/**
 * Represents the structure of user information.
 * @interface
 * @abstract The user information.
 * @typedef {Object} UserInfo - The user information.
 * @property {string} name - The user's name.
 * @property {string} email - The user's email address.
 * @property {string} username - The user's username.
 * @property {string} image_url - The URL of the user's image.
 * @property {string} last_name - The user's last name.
 * @property {string} first_name - The user's first name.
 * @property {string} external_id - The external ID associated with the user.
 * @property {string} phone_number - The user's phone number.
 * @property {string} clerk_user_id - The user's ID in the clerk system.
 * @property {boolean} email_verified - Indicates if the user's email is verified.
 * @property {boolean} phone_verified - Indicates if the user's phone number is verified.
 * @property {boolean} two_factor_enabled - Indicates if two-factor authentication is enabled for the user.
 * @property {string} created_at - The timestamp when the user was created.
 * @property {string} updated_at - The timestamp when the user was last updated.
 */
interface UserInfo {
    name: string;
    email: string;
    username: string;
    image_url: string;
    last_name: string;
    first_name: string;
    external_id: string;
    phone_number: string;
    clerk_user_id: string;
    email_verified: boolean;
    phone_verified: boolean;
    two_factor_enabled: boolean;
    created_at: string;
    updated_at: string;
  }

export default UserInfo