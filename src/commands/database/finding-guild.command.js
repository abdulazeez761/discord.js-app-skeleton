const { SlashCommandBuilder } = require("discord.js");
const Guilds = require("../../schemas/guild.schema");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("guilds")
    .setDescription("returnging data from mongo"),
  async execute(interaction, client) {
    let guildProfile = await Guilds.findOne({ guildID: interaction.guild.id });
    if (guildProfile) {
      interaction.reply({
        content: `server name: ${guildProfile.guildName}\nserver ID: ${guildProfile.guildID}`,
        ephemeral: true,
      });
    } else {
      interaction.reply({
        content: `guild does not exist in database  `,
        ephemeral: true,
      });
    }
  },
};
