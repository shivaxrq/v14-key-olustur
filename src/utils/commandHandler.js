const { Collection } = require("discord.js");
const { readdirSync } = require("node:fs");

module.exports = {
    execute: async (client) => {
      client.commands = new Collection();
      client.commandAliases = new Collection();
      client.slashCommands = new Collection();
      client.slashDatas = [];
  
      // - Handlers -
      const commandFolders = await readdirSync("./src/commands");
  
      await Promise.all(commandFolders.map(async (category) => {
        const commandFiles = await readdirSync(`./src/commands/${category}`);
  
        await Promise.all(commandFiles.map(async (file) => {
          const commands = await import(`../commands/${category}/${file}`);
  
          if (commands) {
            if (commands.commandBase) {
              if (commands.commandBase.prefixData) {
                // Prefix Command
                const prefixCommand = commands.commandBase;
                client.commands.set(prefixCommand.prefixData.name, prefixCommand);
  
                if (prefixCommand.prefixData.aliases && Array.isArray(prefixCommand.prefixData.aliases)) {
                  prefixCommand.prefixData.aliases.forEach(alias => {
                    client.commandAliases.set(alias, prefixCommand.prefixData.name);
                  });
                }
              }
            }
  
            if (commands.commandBase && commands.commandBase.slashData) {
              // Slash Command
              const slashCommand = commands.commandBase;
              client.slashDatas.push(slashCommand.slashData.toJSON());
              client.slashCommands.set(slashCommand.slashData.name, slashCommand);
            }
          }
        }));
      }));
    },
}
