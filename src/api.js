import Networking from './apis/networking';

class Fonsole {
  /**
   * Creates new Fonsole api object
   * @memberof Fonsole
   */
  constructor() {
    // API can be used only when it's called by iframe
    // because it contains some primary socket communication functions
    if (!frameElement || !frameElement.platformType) {
      const message = 'Fonsole API can be used only on fonsole site';
      alert(message);
      throw new Error(message);
    }
    this.platformType = frameElement.platformType;
  }


  /**
   * Returns current platform as string.
   * 
   * @returns {string} Current platform. Can be either 'controller' or 'desktop'.
   * @memberof Fonsole
   */
  getPlatformType() {
    return this.platformType;
  }

  Networking = Networking
}
window.Fonsole = Fonsole;
