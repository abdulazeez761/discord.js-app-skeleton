module.exports = {
  name: "voiceStateUpdate",
  async execute(oldState, newState) {
    console.log(oldState.channelId, newState.channelId);
  },
};
