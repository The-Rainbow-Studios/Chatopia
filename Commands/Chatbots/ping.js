const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Sends Bot Latency"),
  async execute(interaction, client) {
    const embedA = new EmbedBuilder()
      .setDescription(`Pong! - \`${client.ws.ping}\``)
      .setColor("ffc0cb")
      .setFooter(`© Rainbow Studios 2021 - ${new Date().getFullYear()}`);
    interaction.reply({
      embeds: [embedA],
      ephemeral: true,
    });
  },
};
