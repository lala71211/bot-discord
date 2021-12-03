const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { readdirSync } = require('fs');

const commands = [{
    name: 'ping',
    description: 'Replies with Pong!'
}];

const rest = new REST({ version: '9' }).setToken('token');

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { Player } = require('discord-player');
const player = new Player(client,{
    ytdlDownloadOptions: { filter: "audioonly"}
});
client.player = player;

client.on('ready', () => {
    console.log(`${client.user.tag}: Hello, Boss!`);
    client.user.setPresence({
        activities:{
            name: "Gaming",
            type:'Gaming with team DBRR!'
        },
        status:'online'
    })
});



client.player.on('trackStart',(message,track) => message.channel.send('Playing: \`${track.title}\`') );
client.player.on('trackAdd',(message,queue,track) => message.channel.send('Add: \`${track.title}\` to list') );
client.player.on('trackListAdd',(message,queue,playList) => message.channel.send('Add: \`${playList.tracks.length}\` to list') );
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});
client.commands = new.Collection();
client.aliases = new.Collection();
client.categories = readdirSync('./commands')
[commands].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
client.on("message", async message =>{
    if (message.author.bot)
        return;
    const prefix = ',';
    if(!message.content.startsWith(prefix))
        return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLocaleLowerCase();
    if(cmd.length ===0)
        return;
    let command = client.commands.get(cmd);
    if(!command)
        command = client.commands.get(client.aliases.get(cmd));
    if (command)
        if(command.category === 'music'&& !message.member.voice.channel)
            return message.channel.send('Please enter Voice room!!!');
        command.run(client,message,args);
})
client.login('OTE2MjQwMTg4NjgwODQ3Mzgy.YanRKw.djBlh6IqADckllhpSMuEZmQSZ0M');