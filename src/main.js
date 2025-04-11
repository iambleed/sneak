require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  // Name: Test command
  // ID: interactionTest
  // Description: Check if the bots running
  if (interaction.commandName === "interactiontest") {
    const testButton = new ButtonBuilder()
      .setCustomId("test")
      .setLabel("Test")
      .setStyle(ButtonStyle.Success);

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("selectmenu_test")
      .setPlaceholder("Choose an option!")
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel("Option 1")
          .setDescription("Option 1 Description")
          .setValue("opt_1"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Option 2")
          .setDescription("Option 2 Description")
          .setValue("opt_2")
      );

    const testButtonRow = new ActionRowBuilder().addComponents(testButton);

    const selectMenuRow = new ActionRowBuilder().addComponents(selectMenu);

    const buttonInteraction = await interaction.reply({
      components: [testButtonRow, selectMenuRow],
      withResponse: true,
    });
    try {
      const confirmation =
        await buttonInteraction.resource.message.awaitMessageComponent({
          time: 60_000,
        });
      if (confirmation.customId === "test") {
        await confirmation.update({
          content: "Done",
          embeds: [],
          components: [],
        });
      } else if (confirmation.customId === "selectmenu_test") {
        if (confirmation.values[0] === "opt_2") {
            await confirmation.update({
                content: "You chose: Option 2!",
                embeds: [],
                components: []
            });
        } else if (confirmation.values[0] === "opt_1") {
            await confirmation.update({
                content: "You chose: option 1!",
                embeds: [],
                components: []
            });
        }
      }
    } catch {
      await interaction.reply({ content: "Click faster moron" });
    }
  }

  // Name: Base64 command
  // ID: base64
  // Description: Allows the user to encode/decode text using base64
  if (interaction.commandName === "base64") {

    // getting the options
    const mode = interaction.options.getString('mode');
    let content = interaction.options.getString('content');

    if (mode === "encode") {
      content = Buffer.from(content).toString('base64');
    }
    else if (mode === "decode") {
      content = Buffer.from(content, 'base64').toString('ascii');
    }

    // making the embed
    const testEmbed = new EmbedBuilder().setTitle("Sneak Base64")
      .setDescription('Base64 Results')
      .addFields(
        {
          name: 'Mode:',
          value: mode
        },
        {
          name: 'Content:',
          value: "`" + content + "`"
        }
      );

    await interaction.reply({ embeds: [testEmbed] });
  }

  // Name: Help command
  // ID: help
  // Description: Sends an invite to our discord server for help
  if (interaction.commandName === "help") {
    // Embed making
    const helpEmbed = new EmbedBuilder().setTitle("Sneak UserApp")
      .setDescription(`
            Website: https://tomanw.rip
        `)
        .addFields(
            {
                name: '`help`',
                value: 'Shows this embed.',
                inline: false
            },
            {
                name: '`base64 [encode/decode] [content]`',
                value: 'Encode/Decode text using base64 encryption',
                inline: false
            },
            {
                name: '`interactiontest`',
                value: 'Sends a test of: select menus and buttons',
                inline: false
            },
        );

    await interaction.reply({ embeds: [helpEmbed] });
  }
});

client.login(process.env.DISCORD_TOKEN);
