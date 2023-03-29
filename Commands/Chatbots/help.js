const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
} = require("discord.js");
const color = require("chalk");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get to know about Chatopia")
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),

  async execute(interaction, client) {
    await interaction.deferReply({ fetchReply: true });
    const main_embed = new EmbedBuilder()
      .setTitle(`<:chatopia:1089968931059531828> Welcome To chatopia`)
      .setDescription("Click on the buttons for the options")
      .setColor("#e51fba")
      .setFooter(`© Rainbow Studios 2021 - ${new Date().getFullYear()}`)
      .setImage(
        `https://api.tejas404.xyz/image/profileimage?userid=${client.user.id}&customTag=Free%20chatbot&customBackground=https%3A%2F%2Fcdn.discordapp.com%2Fattachments%2F1089895722649931788%2F1090309652509642763%2F400x100.png&badgesFrame=true&tagColor=e51fba&borderColor=e51fba&presenceStatus=online&key=${client.tejas404_api_key}`
      );

    const cmds_embed = new EmbedBuilder()
      .setTitle(`<:chatopia:1089968931059531828> Help`)
      .setFooter(`© Rainbow Studios 2021 - ${new Date().getFullYear()}`)
      .addFields([
        {
          name: "`/enable-chatbot`",
          value: `Setup chat bot in your server`,
          inline: true,
        },
        {
          name: "`/disable-chatbot`",
          value: `Disable chatbot in your server`,
          inline: true,
        },
        {
          name: "`/ping`",
          value: `Get my speeed`,
          inline: true,
        },
        {
          name: "`/help`",
          value: `Get this beutiful embed you are seeing`,
          inline: true,
        },
      ])
      .setColor("#e51fba");

    const support_embed = new EmbedBuilder()
      .setTitle(`<:chatopia:1089968931059531828> Support`)
      .setColor("#e51fba")
      .setDescription(
        `Join my support server by click on the button below or [here](https://api.tejas404.xyz/discord 'Rainbow Studios')`
      )
      .setFooter(`© Rainbow Studios 2021 - ${new Date().getFullYear()}`);

    const what_is_chatopia = new EmbedBuilder()
      .setTitle(`<:chatopia:1089968931059531828> What is Chatopia?`)
      .setDescription(
        `Chatopia is a <:Discord:1090247152904716328> Discord bot that conducts a conversation with a human end user. This type of technology is designed to simulate a conversation with a human visitor. It becomes smatter the more you talk it! As bots become smarter and more sophisticated, the more organized their conversations become!`
      )
      .setFooter(`© Rainbow Studios 2021 - ${new Date().getFullYear()}`)
      .setColor("#e51fba");
    //--------Buttons----\\
    let cmds = new ButtonBuilder()
      .setStyle(2)
      .setEmoji(`1090255070018420747`)
      .setCustomId("cmds")
      .setLabel(`Commands`);
    let inviteme = new ButtonBuilder()
      .setStyle(5)
      .setEmoji(`1090255070018420747`)
      .setLabel(`Invite Me`)
      .setURL("https://api.tejas404.xyz/chatopia_invite");
    let support_inv = new ButtonBuilder()
      .setStyle(5)
      .setEmoji(`883977796785942528`)
      .setLabel(`Join Server`)
      .setURL("https://api.tejas404.xyz/discord");
    let support = new ButtonBuilder()
      .setStyle(1)
      .setEmoji(`1089968931059531828`)
      .setCustomId("support")
      .setLabel(`Need Help?`);
    let what = new ButtonBuilder()
      .setStyle(2)
      .setEmoji(`1090254839067455578`)
      .setCustomId("what")
      .setLabel(`Know more about me`);
    let github = new ButtonBuilder()
      .setStyle(5)
      .setEmoji(`1090254022763622500`)
      .setLabel(`Code Link`)
      .setURL("https://api.tejas404.xyz/chatopia");
    let back = new ButtonBuilder()
      .setStyle(2)
      .setEmoji(`1090255216655466496`)
      .setCustomId("back")
      .setLabel(`Go back`);

    //----action row builders---\\
    let group1 = new ActionRowBuilder().addComponents([
      cmds,
      what,
      support,
      inviteme,
    ]);
    let group2 = new ActionRowBuilder().addComponents([
      back,
      github,
      inviteme,
      cmds,
    ]);
    let back_row = new ActionRowBuilder().addComponents([back, what, inviteme]);
    let inv = new ActionRowBuilder().addComponents([
      back,
      inviteme,
      support_inv,
      github,
    ]);

    let helpMessage = await interaction.followUp({
      content: `Click on the buttons to change page`,
      embeds: [main_embed],
      components: [group1],
    });

    const collector = helpMessage.createMessageComponentCollector(
      (button) => button.user.id === interaction.user.id,
      { time: 60 }
    );

    collector.on("collect", async (b) => {
      if (b.user.id !== interaction.user.id)
        return b.reply({
          content: `**You Can't Use it\n**`,
          ephemeral: true,
        });
      switch (b.customId) {
        case "cmds":
          b.update({ embeds: [cmds_embed], components: [back_row] });
          break;
        case "back":
          b.update({ embeds: [main_embed], components: [group1] });
          break;
        case "what":
          b.update({ embeds: [what_is_chatopia], components: [group2] });
          break;
        case "support":
          b.update({ embeds: [support_embed], components: [inv] });
          break;
        default:
          b.update({ embeds: [main_embed], components: [group1] });
          break;
      }
    });

    collector.on("end", (b) => {
      b.update({
        embeds: [main_embed],
        content: "Run the command again",
        components: [
          new ActionRowBuilder().addComponents([inviteme, support_inv, github]),
        ],
      });
    });

    collector.on("error", (e) => console.log(e));
  },
};
