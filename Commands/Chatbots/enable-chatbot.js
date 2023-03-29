const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const chatbot = require("../../Schemas/Chatbot");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("enable-chatbot")
    .setDescription("Set up your chatbot.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Choose the Channel for chatbot.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("chatbot")
        .setDescription("Which chatbot you want")
        .setRequired(true)
        .addChoices(
          { name: "ChatGPT", value: "gpt" },
          { name: "Normal ChatBot", value: "nor" }
        )
    ),

  async execute(interaction, client) {
    const { options } = interaction;

    const channel = options.getChannel("channel");

    if (
      !interaction.guild.members.me.permissions.has(
        PermissionFlagsBits.SendMessages
      )
    ) {
      const embed122 = new EmbedBuilder()
        .setTitle(
          `${client.emojis.cache
            .get("1090236115614711860")
            .toString()} | Mission Failed`
        )
        .setDescription(
          "<:space:1090250824883646566> I don't have permissions for this"
        )
        .setColor("#FF0000")
        .setFooter(`© Rainbow Studios 2021 - ${new Date().getFullYear()}`);
      interaction.reply({
        embeds: [embed122],
        ephemeral: true,
      });
    }

    chatbot.findOne({ Guild: interaction.guild.id }, async (err, data) => {
      if (data) {
        const embed22 = new EmbedBuilder()
          .setTitle(
            `${client.emojis.cache
              .get("1090236115614711860")
              .toString()} | Mission Failed`
          )
          .setDescription(
            "We are sorry! But you can't create more than one chatbot channel try running `/disable-chatbot` first`"
          )
          .setColor("#FF0000")
          .setFooter(`© Rainbow Studios 2021 - ${new Date().getFullYear()}`);
        interaction.reply({
          embeds: [embed22],
          ephemeral: true,
        });
        return;
      }

      if (!data) {
        await chatbot.create({
          Guild: interaction.guild.id,
          Channel: channel.id,
          chatbot: options.getString("chatbot"),
        });
      }

      const embed23 = new EmbedBuilder()
        .setTitle(
          `${client.emojis.cache
            .get("1090235826320965654")
            .toString()} | Mission Success!`
        )
        .setDescription(`Successfully enabled chatbot`)
        .setFooter(`© Rainbow Studios 2021 - ${new Date().getFullYear()}`)
        .setColor("#00ff00");
      interaction.reply({
        embeds: [embed23],
        ephemeral: true,
      });

      const embeds = new EmbedBuilder()
        .setTitle(
          `${client.emojis.cache
            .get("1090235826320965654")
            .toString()} Chatopia NOtify!`
        )
        .setDescription(
          "Chatbot Anti Crash System been enabled for this channel"
        )
        .setColor("ffc0cb")
        .setFooter(`© Rainbow Studios 2021 - ${new Date().getFullYear()}`);

      const embed = new EmbedBuilder()
        .setTitle(
          `${client.emojis.cache
            .get("1090235826320965654")
            .toString()} Chatopia Notify!`
        )
        .setDescription("Chatbot has been enabled for this channel")
        .setFooter(`© Rainbow Studios 2021 - ${new Date().getFullYear()}`)
        .setColor("ffc0cb");

      channel.send({ embeds: [embed] });
    });
  },
};
