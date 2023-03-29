const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
  intents: [Guilds, GuildMessages, MessageContent],
  partials: [User, Message, GuildMember, ThreadMember],
});

client.config = require("./config.json");
const { loadEvents } = require("./Handlers/eventHandler");

client.events = new Collection();
client.commands = new Collection();
client.tejas404_api_key = process.env.tejas404_api_key;
client.openai_key = process.env.openai_key;

process.on("unhandledRejection", async (e) => {
  console.log(e);
});
process.on("uncaughtException", async (e) => {
  console.log(e);
});

loadEvents(client);

client.login(client.config.token);

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send({
    error: false,
    message: "Bot Online!",
    credits: "Made by Tejas Lamba#1924",
  });
});

app.listen(port, () => {
  console.log(`Chatopia listening on port ${port}`);
});
