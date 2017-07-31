
/**
 * Contains some stub functions, that will be called if NetworkingAPI wasn't found
 *
 * @export
 * @class NetworkingAPIDebug
 */
export default class NetworkingAPIDebug {
  static getClientId() {
    return 0;
  }
  static emit() {}
  static on() {}
  static once() {}
}
