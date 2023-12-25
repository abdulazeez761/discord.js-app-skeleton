const fs = require("fs");
const { REST, Routes } = require("discord.js");

module.exports = (client) => {
  const { commands, commandsArr } = client;
  client.commandsHandler = async () => {
    const commandsFolder = fs.readdirSync("./src/commands"); //we are calling it  as a folder bacause we will split each commands category
    for (const folder of commandsFolder) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandsArr.push(command.data);
      }
    }
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
    (async () => {
      try {
        await rest.put(
          Routes.applicationCommands(
            process.env.CLIENT_ID
            // process.env.GUILD_ID // to specify it to only one server
          ),
          { body: commandsArr }
        );
        commandsArr.forEach((command) => {
          console.log(`✅ Successfully reloaded ${command.name}.`);
        });
      } catch (error) {
        console.error(error);
      }
    })();
  };
};
