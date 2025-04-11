const { SlashCommandBuilder } = require('discord.js');

const base64Command = new SlashCommandBuilder()
.setName('base64')
.setDescription('Base64')
.addStringOption(option => 
    option.setName('mode')
        .setDescription('The mode in which you want to use base64')
        .setRequired(true)
        .addChoices(
            { name: 'Encode', value: 'encode' },
            { name: 'Decode', value: 'decode' }
))
.addStringOption(option =>
    option.setName('content')
        .setDescription('The content to decode/encode to/from base64')
        .setRequired(true)
)
.setContexts(['PrivateChannel', 'Guild', 'BotDM']);

module.exports = base64Command;