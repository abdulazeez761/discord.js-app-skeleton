const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("greetings")
    .setDescription("Greetings!"),
  async execute(interaction, client) {
    const user = interaction.user.username;
    // await interaction.deferReply();
    // const newMessage = `API Latency: ${client.ws.ping}\n Client Ping: ${interaction.createdTimestamp}`;
    // await interaction.editReply({
    //   content: newMessage,
    // });
    await interaction.reply({
      content: `Hello ${user}`,
      ephemeral: true,
    });
  },
};
