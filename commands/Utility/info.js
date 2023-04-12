const Discord = require('discord.js')
const package = require("../../package.json");
const { cpu, mem, os } = require("node-os-utils");
const uptimeBot = require("pretty-ms")
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, ChannelType } = require('discord.js')

module.exports = {
  name: 'info',
  description: 'Informações sobre o bot',
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    const operatingSystem = `${os.type()} ${await os.oos().then(o => o)} ${os.arch()}`
    const cpuUsage = (await cpu.usage()).toFixed(2) + "%"
    const memoryUsage = (await mem.info()).usedMemMb;
    const memoryTotal = (await mem.info()).totalMemMb;
    const memoryPorcentage = ((memoryUsage / memoryTotal) * 100).toFixed(0) + '%'

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('Github Project')
          .setStyle(ButtonStyle.Link)
          .setURL('https://github.com/Actunes/Project-Whatchlist-Bot')
          .setEmoji('<:github71:1071094653060923533>'),
      )

    let embedInfo = new Discord.EmbedBuilder()
      .setColor('#FFFFFF')
      .setTitle('Sobre')
      .setDescription('  \n\n<:system77:1060391259153375332> System Monitor')
      .addFields(
        { name: `<:ramuse:1071758310660898876> **RAM**`, value: '```' + Math.trunc(memoryUsage) + ' MB' + ' | ' + Math.trunc(memoryTotal) + ' MB ' + `(${memoryPorcentage})` + '```', inline: true },
        { name: `** <:cpus:1071758315471769610> CPU_USAGE**`, value: '```' + `${cpuUsage}` + '```', inline: true },
        { name: `** <:onlinesvgrepocom:1071760303156641823> PING**`, value: '```' + `${Math.round(client.ws.ping)}ms` + '```', inline: true },
        { name: `** <:computer:1071758313466888202> OS**`, value: '```' + operatingSystem + '```', inline: true },
        { name: `** <:node:1071758308937060407> NODE.JS**`, value: '```' + `${process.version.slice(1).split(".").join(".")}` + '```', inline: true },
        { name: `** <:discordicon:1071758318332289176> DISCORD.JS**`, value: '```' + `${package.dependencies["discord.js"].slice(1)}` + '```', inline: true },
        { name: `** <:uptimeicon:1071773570654552084> UPTIME**`, value: '```' + `${uptimeBot(client.uptime, { verbose: true })}` + '```', inline: true }
      )
    await interaction.reply({ embeds: [embedInfo], ephemeral: true, components: [row] })
  }
}