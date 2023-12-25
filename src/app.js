require("dotenv").config();
const { TOKEN } = process.env;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});
client.commands = new Collection();
client.commandsArr = [];
const coreFolder = fs.readdirSync(`./src/core`);

for (const folder of coreFolder) {
  const coreFiles = fs
    .readdirSync(`./src/core/${folder}`)
    .filter((file) => file.endsWith(".js"));

  for (const file of coreFiles) require(`./core/${folder}/${file}`)(client); //!we are passing a client for each core(function) file
}

client.eventsHandler();
client.commandsHandler();
client.login(TOKEN);
