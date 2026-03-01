const{ Client, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const token = process.env.TOKEN;

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on("messageCreate", (message) => {
  //console.log(message);
  if (message.author.bot) return;
  message.reply({
   content: "Hi from BOT",
  })
});

client.on('interactionCreate', interaction => {
    interaction.reply("tu hoga nOOb")
})

client.login(token);