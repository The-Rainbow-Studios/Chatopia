const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const chatbot = require("../../Schemas/Chatbot");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("disable-chatbot")
    .setDescription("Disables chatbot functionality in your server")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  async execute(interaction, client) {
    const { guild } = interaction;
    const data = await chatbot.findOne({ Guild: guild.id });
    if (!data) {
      const embed72 = new EmbedBuilder()
        .setTitle(
          `${client.emojis.cache
            .get("1090237035165532230")
            .toString()} | Mission Unsuccessful`
        )
        .setDescription("Chatbot is already disabled")
        .setColor("	#ffa500")
        .setFooter(`© Rainbow Studios 2021 - ${new Date().getFullYear()}`);
      interaction.reply({
        embeds: [embed72],
        ephemeral: true,
      });
    }
    if (data) {
      await chatbot.findOneAndDelete({ Guild: guild.id });
      const embed72 = new EmbedBuilder()
        .setTitle(
          `${client.emojis.cache
            .get("1090235826320965654")
            .toString()} | Mission Success!`
        )
        .setDescription("Successfully disabled chatbot")
        .setColor("#ffa500")
        .setFooter(`© Rainbow Studios 2021 - ${new Date().getFullYear()}`);
      interaction.reply({
        embeds: [embed72],
        ephemeral: true,
      });
    }
  },
};
