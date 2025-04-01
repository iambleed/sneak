const { SlashCommandBuilder } = require('discord.js');

const testCommand = new SlashCommandBuilder()
.setName('test')
.setDescription('Test command')
.setContexts(['PrivateChannel', 'Guild', 'BotDM']);

module.exports = testCommand;