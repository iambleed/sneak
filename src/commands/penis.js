const { SlashCommandBuilder } = require('discord.js');

const penisCommand = new SlashCommandBuilder()
.setName('penis')
.setDescription('Generate a penis of random length')
.setContexts(['PrivateChannel', 'Guild', 'BotDM']);

module.exports = penisCommand;