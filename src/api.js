import NetworkingAPIDebug from './networkingApiDebug';
import { PLATFORM } from './enums';

/**
 * Client-side fonsole project api
 *
 * @export
 * @class Fonsole
 */
export default class Fonsole {
  /**
   * Creates new Fonsole api object
   *
   * @param {object} [options={}] Fonsole API configuration
   * @param {Boolean} [options.debug=false]
   * @memberof Fonsole
   */
  constructor(options = {}) {
    this.debug = options.debug === true;
    // API can be used only when it's called by iframe
    // because it contains some primary networking functions
    // eslint-disable-next-line no-underscore-dangle
    if (!frameElement || !frameElement.__NetworkingAPI) {
      // In debug mode we can fallback to NetworkingAPIDebug, so throw error only in production mode
      if (!this.debug) {
        throw new Error('Fonsole API can be used only on fonsole site or with debug mode enabled');
      }
    }
    // eslint-disable-next-line no-underscore-dangle
    this.NetworkingAPI = frameElement.__NetworkingAPI || NetworkingAPIDebug;
  }

  /**
   * Returns current client id.
   *
   * @readonly
   * @memberof Fonsole
   */
  get clientId() {
    return this.NetworkingAPI.getClientId();
  }

  /**
   * Get platform, where this api is executed, based on client id,
   * because desktop clients are always hosts
   *
   * @returns {?PLATFORM} Current platform. Can be null, if socket is not connected yet.
   * @readonly
   * @memberof NetworkingAPI
   */
  get platform() {
    if (this.clientId === -1) return null; // Connection to socket is not established.
    // Desktop always has id 0
    return this.clientId === 0 ?
      PLATFORM.DESKTOP :
      PLATFORM.CONTROLLER;
  }

  /**
   * Emits event to special player or everyone except sender.
   *
   * @param {any} event Sent event name
   * @param {?Number} to Client ID. When equals to -1, emits event to everyone, except sender
   * @param {any} args Message arguments
   * @memberof Room
   */
  emit(event, to = -1, ...args) {
    this.NetworkingAPI.emit(event, to, ...args);
  }

  /**
   * Subscribe to game events.
   *
   * @param {string} event Subscribed event name
   * @param {function} callback Callback function. Called with (senderId, ...other arguments)
   * @returns {Number} Listener index in event array
   * @memberof NetworkingAPI
   */
  on(event, callback) {
    this.NetworkingAPI.on(event, callback);
  }

  /**
   * Subscribe to next dispatched event.
   *
   * @param {string} event Subscribed event name
   * @param {function} callback Callback function. Called with (senderId, ...other arguments)
   * @returns {Number} Listener index in event array
   * @memberof NetworkingAPI
   */
  once(event, callback) {
    this.NetworkingAPI.once(event, callback);
  }
}
