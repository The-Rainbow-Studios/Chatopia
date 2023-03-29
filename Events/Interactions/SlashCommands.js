const { ChatInputCommandInteraction } = require("discord.js");
const { OwnerId } = require("discord.js");
module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param { ChatInputCommandInteraction } interaction
   */
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (command.developer && interaction.user.id !== OwnerId)
      if (!command)
        return interaction.reply({
          content: "Bot doesn't support this command",
          ephemeral: true,
        });
    if (command) {
      try {
        command.execute(interaction, client);
      } catch (e) {
        return interaction.reply({
          content: String(e),
          ephemeral: true,
        });
      }
    }
  },
};
