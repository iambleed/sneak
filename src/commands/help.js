const { SlashCommandBuilder } = require('discord.js');

const helpCommand = new SlashCommandBuilder()
.setName('help')
.setDescription('Join our discord for help!')
.setContexts(['PrivateChannel', 'Guild', 'BotDM']);

module.exports = helpCommand;