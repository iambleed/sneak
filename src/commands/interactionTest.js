const { SlashCommandBuilder } = require('discord.js');

const testCommand = new SlashCommandBuilder()
.setName('interactiontest')
.setDescription('Interaction Test')
.setContexts(['PrivateChannel', 'Guild', 'BotDM']);

module.exports = testCommand;