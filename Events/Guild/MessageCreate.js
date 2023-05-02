const Schema = require("../../Schemas/Chatbot");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "messageCreate",
  /**
 * 

 * @param {Client} client 
 */
  async execute(message, client) {
    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (!data) return;

      if (
        message.channel.id !== data.Channel ||
        !message.guild ||
        message.author.bot
      )
        return;
      try {
        let res_data;
        message.channel.sendTyping();
        const msg = await message.reply({
          content: `<@${
            message.member.id
          }> Analysing Data ${message.client.emojis.cache
            .get("1090237035165532230")
            .toString()}`,
        });
        if (data.chatbot === "nor") {
          res_data = await normalchatbot(
            message.content,
            client.tejas404_api_key
          );
          msg.edit({ content: `<@${message.member.id}>, ${res_data}` });
        } else if (data.chatbot === "gpt") {
          res_data = await chatgpt(
            message.content,
            client.tejas404_api_key,
            client.openai_key
          );
          await msg.edit({ content: `<@${message.member.id}>, ${res_data}` });
        } else {
          await msg.edit({ content: `<@${message.member.id}> Error` });
        }
      } catch (err) {
        const crash = await client.guilds.cache
          .get(process.env.Support_server_ID)
          .channels.cache.get(process.env.crash_channel_ID);
        const embed = new EmbedBuilder()
          .setAuthor({ name: "Crashed" })
          .setTitle("Anti Crash System")
          .setDescription(
            `It looks like that the that Anti Crash System protected Chatbot from crashing\nError: **${err}**\nNote: *If you are a developer please check the console for more information.*`
          )
          .setColor("#FF0000")
          .setFooter({text: `© Rainbow Studios 2021 - ${new Date().getFullYear()}`})
          .setTimestamp();
        console.log(err);
        crash.send({ embeds: [embed] });
      }
    });
  },
};

async function normalchatbot(message, tejas404_key) {
  const data = await fetch(
    `https://api.tejas404.xyz/fun/chatbot_v1?key=${encodeURIComponent(
      tejas404_key
    )}&message=${encodeURIComponent(message)}`
  );
  const json = await data.json();
  return json.message;
}

async function chatgpt(message, tejas404_key, openai_key) {
  let data;

  if (openai_key) {
    data = await fetch(
      `https://api.tejas404.xyz/fun/chatgpt?key=${encodeURIComponent(
        tejas404_key
      )}&open_ai_key=${encodeURIComponent(
        openai_key
      )}&message=${encodeURIComponent(message)}`
    );
  } else {
    data = await fetch(
      `https://api.tejas404.xyz/fun/chatgpt?key=${encodeURIComponent(
        tejas404_key
      )}&message=${encodeURIComponent(message)}`
    );
  }
  const json = await data.json();
  return json.message;
}
