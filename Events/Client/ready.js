const { loadCommands } = require("../../Handlers/commandHandler");
const chalk = require("chalk");
module.exports = {
  name: "ready",
  once: "true",
  execute(client) {
    console.log("Running checks");
    console.log(chalk.green("Made by Tejas Lamba#1924"));
    console.log(chalk.green("Bot Running: True"));
    console.log(chalk.green("Done check"));
    console.log(chalk.green(`Logined as ${client.user.tag}`));
    const activities = [
      "Making connections happen",
      "/help",
      `With ${client.guilds.cache.size} guild(s)`,
    ];
    let i = 0;
    setInterval(
      () =>
        client.user.setPresence({
          activities: [{ name: activities[i++ % activities.length] }],
          status: "ONLINE",
        }),
      5000
    );

    const { connect } = require("mongoose");
    connect(client.config.DataBaseURL, {}).then(() => {
      console.log(chalk.blue("Connected to the database"));
    });
    loadCommands(client);
    console.log();
  },
};
