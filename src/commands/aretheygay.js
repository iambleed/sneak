const { SlashCommandBuilder } = require('discord.js');

const aretheygayCommand = new SlashCommandBuilder()
.setName('aretheygay')
.setDescription('Are they gay??!!')
.setContexts(['PrivateChannel', 'Guild', 'BotDM'])
.addUserOption(option =>
    option
        .setName('target')
        .setDescription('Who is gay?')
        .setRequired(true)
)

module.exports = aretheygayCommand;