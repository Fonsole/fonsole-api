export default {
  sendMessage(lTag, lContent, lTo) {
    return frameElement.platformSendMessage(lTag, lContent, lTo);
  },

  addMessageListener(f) {
    return frameElement.platformAddMessageListener(f);
  },
};
