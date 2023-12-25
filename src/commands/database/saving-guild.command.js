const { SlashCommandBuilder } = require("discord.js");
const Guilds = require("../../schemas/guild.schema");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addguild")
    .setDescription("saving  data to mongo"),
  async execute(interaction, client) {
    let guildProfile = await Guilds.findOne({ guildID: interaction.guild.id });
    if (!guildProfile) {
      guildProfile = await new Guilds({
        _id: new mongoose.Types.ObjectId(),
        guildID: interaction.guild.id,
        guildName: interaction.guild.name,
      });
      await guildProfile.save().catch(console.error);
      await interaction.reply({
        content: `Server's name: ${guildProfile.guildName}`,
        ephemeral: true,
      });
      console.log(guildProfile);
    } else {
      await interaction.reply({
        content: `Server's ID: ${guildProfile.guildID}`,
        ephemeral: true,
      });
      console.log(guildProfile);
    }
  },
};
