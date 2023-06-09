const Discord = require("discord.js")
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildVoiceStates
  ]
})
const {ActivityType } = require('discord.js');
const chalk = require('chalk')
require("dotenv").config()

module.exports = client

client.on('interactionCreate', (interaction) => {

  if (interaction.type === Discord.InteractionType.ApplicationCommand) {

    const cmd = client.slashCommands.get(interaction.commandName)

    if (!cmd) return interaction.reply(`Error`)

    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id)

    cmd.run(client, interaction)

  }
})

client.on("ready", () => {
  console.log(chalk.cyan(`[Bot] | online em ` + chalk.red(`${client.user.username}!`)))
  client.user.setActivity({
    name: `/info`,
    type: ActivityType.Playing
  })
})

client.slashCommands = new Discord.Collection()

require('./handler')(client)
require('./handler/events')

client.login(process.env.TOKEN)

process.on('unhandRejection', (reason, promise) => {
  console.log(`❗ | [Erro]\n\n` + reason, promise);
});
process.on('uncaughtException', (error, origin) => {
  console.log(`❗ | [Erro]\n\n` + error, origin);
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
  console.log(`❗ | [Erro]\n\n` + error, origin);
});