/**
 * Represents the structure of session information.
 * @interface
 * @abstract The session information.
 * @typedef {Object} SessionInfo - The session information.
 * @property {string} session_id - The ID of the session.
 * @property {string} session_actor - The actor associated with the session.
 */

interface SessionInfo {
    session_id: string;
    session_actor: string;
  }

  export default SessionInfo