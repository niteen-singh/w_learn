const { REST, Routes } = require('discord.js');
require('dotenv').config();

token = process.env.TOKEN;
const commands = [
  {
    name: 'noob',
    description: 'acha bete!',
  },
];

const rest = new REST({ version: '10' }).setToken(token);

(async() => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands("1477621931154079804"), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();