require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.DirectMessages],
});

client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    // Name: Test command
    // ID: test
    // Description: Check if the bots running
    if (interaction.commandName === "test") {
        await interaction.reply({ content: 'Test' });
    }

    // Name: Help command
    // ID: help
    // Description: Sends an invite to our discord server for help
    if (interaction.commandName === "help") {
        // Embed making
        const helpEmbed = new EmbedBuilder()
        .setTitle('Reaper UserApp')
        .setDescription(`
            Website: https://tomanw.rip
            Discord: https://discord.gg/MuS5juK8pv
        `);

        const testButton = new ButtonBuilder()
            .setCustomId('test')
            .setLabel('Test')
            .setStyle(ButtonStyle.Success);
        
        const actions = new ActionRowBuilder()
            .addComponents(testButton)

        await interaction.reply({ embeds: [helpEmbed], components: [actions] });

    }
});

client.login(process.env.DISCORD_TOKEN);