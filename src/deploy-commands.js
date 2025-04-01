require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Dynamically read all command files from the 'commands' folder
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
const commands = [];

// Import each command and push to the commands array
commandFiles.forEach(file => {
    const command = require(path.join(__dirname, 'commands', file));
    commands.push(command.toJSON()); // Convert the command to JSON
    console.log(`✅ Loaded command: ${command.toJSON().name}`);
});

// Register the commands with Discord API
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('📡 Registering global commands...');
        await rest.put(Routes.applicationCommands(process.env.APP_ID), { body: commands });
        console.log('✅ Commands registered!');
    } catch (error) {
        console.error('Error registering commands:', error);
    }
})();