require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  Events,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuComponent,
  StringSelectMenuOptionBuilder,
  ActionRow,
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
let logChannel = null;
let isLogging = false;

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  // Name: Test command
  // ID: test
  // Description: Check if the bots running
  if (interaction.commandName === "test") {
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

  // Name: Are they gay?
  // ID: aretheygay
  // Description: Are they gay? let's figure it out!
  if (interaction.commandName === "aretheygay") {
    const target = interaction.options.getUser("target");
    await interaction.reply({ content: `${target} is gay!` });
  }

  // Name: penis command
  // ID: penis
  // Description: generates a unicode penis of random length
  if (interaction.commandName === "penis") {
    const length = Math.floor(Math.random() * 10) + 1;
    const penisUnicode = `8${"=".repeat(length)}D`

    await interaction.reply({ content: `Your penis length is: ${penisUnicode}` });
  }

  // Name: Help command
  // ID: help
  // Description: Sends an invite to our discord server for help
  if (interaction.commandName === "help") {
    // Embed making
    const helpEmbed = new EmbedBuilder().setTitle("Reaper UserApp")
      .setDescription(`
            Website: https://tomanw.rip
            Dev Discord: https://discord.gg/MuS5juK8pv
            Chat Hub: https://discord.gg/YEvVrbcFgs
        `)
        .addFields(
            {
                name: '`help`',
                value: 'Shows this embed.',
                inline: false
            },
            {
                name: '`aretheygay [user]`',
                value: 'Totally isnt rigged, shitpost command. Returns "[user] is gay"',
                inline: false
            },
            {
                name: '`test`',
                value: 'Sends a test of: embeds, select menus and buttons',
                inline: false
            },
        );

    await interaction.reply({ embeds: [helpEmbed] });
  }
});

client.login(process.env.DISCORD_TOKEN);
