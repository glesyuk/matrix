const Discord = require('discord.js');
const client = new Discord.Client();
const parse = require("parse-duration");
var ProgressBar = require("progress");
const db = require('quick.db');
const ms = require('parse-ms');
const weather = require('weather-js');
const math = require('mathjs')

/**
 * Create a text progress bar
 * @param {Number} value - The value to fill the bar
 * @param {Number} maxValue - The max value of the bar
 * @param {Number} size - The bar size (in letters)
 * @return {String} - The bar
 */
global.progressBar = (value, maxValue, size) => {
    const percentage = value / maxValue; // Calculate the percentage of the bar
    const progress = Math.round((size * percentage)); // Calculate the number of square caracters to fill the progress side.
    const emptyProgress = size - progress; // Calculate the number of dash caracters to fill the empty progress side.
  
    const progressText = '▇'.repeat(progress); // Repeat is creating a string with progress * caracters in it
    const emptyProgressText = '—'.repeat(emptyProgress); // Repeat is creating a string with empty progress * caracters in it
    const percentageText = Math.round(percentage * 100) + '%'; // Displaying the percentage of the bar
  
    const bar = '```[' + progressText + emptyProgressText + ']' + percentageText + '```'; // Creating the bar
    return bar;
};

function getRandomColor() {
    var letters = '0123456789abcdef';
    var color = '';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color; 
  }
module.exports = class utilityclass {

    constructor(client){
        this.client = client;
    } 
    async weather(message) {
        const args = message.content.slice(8).trim().split(/ +/g);
        weather.find({search: args.join(" "), degreeType: 'C'}, function (error, result){
            // 'C' can be changed to 'F' for farneheit results
            if(error) return message.channel.send(error);
            if(!args[0]) return message.channel.send('Please specify a location')
    
            if(result === undefined || result.length === 0) return message.channel.send('**Invalid** location');
    
            var current = result[0].current;
            var location = result[0].location;
    
            const weatherinfo = new Discord.MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Weather forecast for ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor(getRandomColor())
            .addField('Timezone', `UTC${location.timezone}`, true)
            .addField('Degree Type', 'Celsius', true)
            .addField('Temperature', `${current.temperature}°`, true)
            .addField('Wind', current.winddisplay, true)
            .addField('Feels like', `${current.feelslike}°`, true)
            .addField('Humidity', `${current.humidity}%`, true)
            .setFooter(`requested by: ${message.author.tag}`, 'https://i.imgur.com/KnqnZ7f.png')
    
    
            message.channel.send(weatherinfo)
            })    
    }
    async ping(message) {
        const ping = new Discord.MessageEmbed()
            .setColor(getRandomColor())
            .setTitle("Pong! :ping_pong:")
            .setDescription(`The ping is: ${client.ws.ping}ms`)
            .setTimestamp()
            .setFooter(`requested by: ${message.author.tag}`, 'https://i.imgur.com/KnqnZ7f.png')
        message.channel.send(ping)
    }
    async covid(message){
        //nothing yet
    }
    async calculate(message) {
        const args = message.content.slice(11).trim().split(/ +/g);

        let resp;

        try {
            resp = math.evaluate(args.join(" "))
        } catch (e) {
            return message.channel.send('Please provide a valid question')
        }

        const embed = new Discord.MessageEmbed()
            .setColor(getRandomColor())
            .setTitle('Calculator :calculator:')
            .addField('Question', `\`\`\`css\n${args.join(' ')}\`\`\``)
            .addField('Answer', `\`\`\`css\n${resp}\`\`\``)
            .setFooter(`requested by: ${message.author.tag}`, 'https://i.imgur.com/KnqnZ7f.png')

            message.channel.send(embed);
    }
    async calc(message) {
        const args = message.content.slice(6).trim().split(/ +/g);

        let resp;

        try {
            resp = math.evaluate(args.join(" "))
        } catch (e) {
            return message.channel.send('Please provide a valid question')
        }

        const embed = new Discord.MessageEmbed()
            .setColor(getRandomColor())
            .setTitle('Calculator :calculator:')
            .addField('Question', `\`\`\`css\n${args.join(' ')}\`\`\``)
            .addField('Answer', `\`\`\`css\n${resp}\`\`\``)
            .setFooter(`requested by: ${message.author.tag}`, 'https://i.imgur.com/KnqnZ7f.png')

            message.channel.send(embed);
    }
    async stats(message) {
        let guildsEval = await client.shard.broadcastEval('this.guilds.size')
        let channelsEval = await client.shard.broadcastEval('this.channels.size')
        let usersEval = await client.shard.broadcastEval('this.users.size')
        let voiceEval = await client.shard.broadcastEval('this.voiceConnections.size')
        let botGuilds = guildsEval.reduce((prev, val) => prev + val)
        let botChannels = channelsEval.reduce((prev, val) => prev + val)
        let botUsers = usersEval.reduce((prev, val) => prev + val)
        let commandUsage = await db.fetch('commandUsage');
        let messageRead = await db.fetch('messageRead');
        
        const embed = new RichEmbed()
        .setColor(color)
        .setAuthor(`${client.user.username} statistics`, client.user.displayAvatarURL)
        .setThumbnail(client.user.displayAvatarURL) 
        .addField('Owner', 'Myst#5877')
        .addField('Server information', `\`\`\`• Operating System: Enterprise Linux 7\n• Kernel: 4.18.0-34-Enterprise\n• Processor: Intel(R) Xeon(R) Gold 6140 CPU @ 2.30GHz\n• Architecture: x86_x64\n• Node.js: ${process.version}\n• Discord.js: v${version}\n• Websocket: ${client.ping.toFixed(2)}ms\`\`\``) 
        .addField('General information', `\`\`\`• Guilds: ${botGuilds.toLocaleString()}\n• Channels: ${botChannels.toLocaleString()}\n• Users: ${botUsers.toLocaleString()}\n• Uptime: ${client.util.parseDur(client.uptime)}\`\`\``)
        .addField('Readed information', `\`\`\`• Message Read: ${messageRead.toLocaleString()}\n• Commands Ran: ${commandUsage.toLocaleString()}\`\`\``) 
        .addField('Usage information', `\`\`\`• Memory usage:\n${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap\n\n• CPU usage:\nNode: ${(process.cpuUsage().user / 1024 / 1024).toFixed(2)}%\nSystem: ${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%\`\`\``)
        .setFooter(`Request by: ${message.author.tag} | ${client.user.username} v${client.version}`)
    }
}

client.login('NzY2OTkxNDQxNDE4OTExNzQ0.X4racQ.xwFKni50Nm2OlZgs0lh7cstxm5M');