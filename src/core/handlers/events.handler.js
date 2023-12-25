const fs = require("fs");
const { connection } = require("mongoose");
module.exports = (client) => {
  client.eventsHandler = async () => {
    const eventsFolder = fs.readdirSync("./src/events");

    for (const folder of eventsFolder) {
      const eventFiles = fs
        .readdirSync(`./src/events/${folder}`)
        .filter((file) => file.endsWith(".js"));

      switch (folder) {
        case "client":
          for (file of eventFiles) {
            const event = require(`../../events/${folder}/${file}`);
            if (event.once)
              client.once(event.name, (...args) =>
                event.execute(...args, client)
              );
            else
              client.on(event.name, (...args) =>
                event.execute(...args, client)
              );
          }
          break;
        case "mongo":
          for (file of eventFiles) {
            const event = require(`../../events/${folder}/${file}`);
            if (event.once)
              connection.once(event.name, (...args) =>
                event.execute(...args, client)
              );
            else
              connection.on(event.name, (...args) =>
                event.execute(...args, client)
              );
          }
          break;

        default:
          break;
      }
    }
  };
};
