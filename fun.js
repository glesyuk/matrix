const Discord = require('discord.js');
const client = new Discord.Client();
const parse = require("parse-duration");
var ProgressBar = require("progress");
var randomCat = require('random-cat');
var axios = require('axios');
const phin = require('phin');
const randomPuppy = require('random-puppy');
const snekfetch = require('snekfetch');
const figlet = require('figlet');

//TODO: calculator, covid, 

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
module.exports = class funclass {

    constructor(client){
        this.client = client;
    } 
    async avatar(message) {
        const args = message.content.slice(8).trim().split(/ +/g);

        let member = message.mentions.members.first();

        if (!member) {
            const emb=new Discord.MessageEmbed().setImage(message.author.displayAvatarURL({size: 2048})).setTitle(message.author.username)
            message.channel.send(emb)
        } else {
            const emb=new Discord.MessageEmbed().setImage(member.user.displayAvatarURL({size: 2048})).setTitle(member.user.username)
            message.channel.send(emb)
        }
    }

    async ship(message){
        const args = message.content.slice(6).trim().split(/ +/g);

        let member = args[0];

        let member2 = args[1];

        const randomnumber = Math.floor(Math.random() * 101);

        var progressbar = progressBar(randomnumber, 100, 10);

        const lessthan10 = new Discord.MessageEmbed()
            .setColor('ffc0cb')
            .setTitle(":heart: Matching :heart:")
            .setDescription(`:heartbeat: ***${member}*** and ***${member2}*** :heartbeat: `)
            .addFields(
                { name: progressbar, value: "They'd rather die than be next to each other" }
            )
        .setTimestamp()
        .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png');
        const lessthan50 = new Discord.MessageEmbed()
            .setColor('ffc0cb')
            .setTitle(":heart: Matching :heart:")
            .setDescription(`:heartbeat: ***${member}*** and ***${member2}*** :heartbeat: `)
            .addFields(
                { name: progressbar, value: "Nah... they don't even know each other!" }
            )
            .setTimestamp()
            .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png');
        const lessthan75 = new Discord.MessageEmbed()
            .setColor('ffc0cb')
            .setTitle(":heart: Matching :heart:")
            .setDescription(`:heartbeat: ***${member}*** and ***${member2}*** :heartbeat: `)
            .addFields(
                { name: progressbar, value: "Friends?" }
            )
            .setTimestamp()
            .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png');  
        const lessthan95 = new Discord.MessageEmbed()
            .setColor('ffc0cb')
            .setTitle(":heart: Matching :heart:")
            .setDescription(`:heartbeat: ***${member}*** and ***${member2}*** :heartbeat: `)
            .addFields(
                { name: progressbar, value: "They'll be together for a while" }
            )
            .setTimestamp()
            .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png');
        const lessthan100 = new Discord.MessageEmbed()
            .setColor('ffc0cb')
            .setTitle(":heart: Matching :heart:")
            .setDescription(`:heartbeat: ***${member}*** and ***${member2}*** :heartbeat: `)
            .addFields(
                { name: progressbar, value: "A match (almost) made in heaven!" }
            )
            .setTimestamp()
            .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png');
        const is100 = new Discord.MessageEmbed()
            .setColor('ffc0cb')
            .setTitle(":heart: Matching :heart:")
            .setDescription(`:heartbeat: ***${member}*** and ***${member2}*** :heartbeat: `)
            .addFields(
                { name: progressbar, value: "Perfect Match!" }
            )
            .setTimestamp()
            .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png');

        if (randomnumber < 10) {
            message.channel.send({embed: lessthan10})
        } else if (randomnumber < 50) {
            message.channel.send({embed: lessthan50})
        } else if (randomnumber < 75) {
            message.channel.send({embed: lessthan75})
        } else if (randomnumber < 95) {
            message.channel.send({embed: lessthan95})
        } else if (randomnumber < 100) {
            message.channel.send({embed: lessthan100})
        } else {
            message.channel.send({embed: is100})
        }
    }
    async mock(message) {
        var string = message.content.slice(7).trim();
        var letter_arr = string.split('');
        for (var i=1; i<letter_arr.length; i += 2) {
            letter_arr[i]=letter_arr[i].toUpperCase();
        }
        var string_result = letter_arr.join('');
        message.channel.send(string_result)
    }
    async meme(message) {
        let reddit = [
            "memes",
            "dankmemes",
            "ProgrammerHumor",
            "meirl",
            "me_irl",
            "2meirl4meirl",
            "wholesomememes",
            "MemeEconomy",
       //     "gaming",
            "MurderedByWords"
        //    "funny"
        ]

        let random = reddit[Math.floor(Math.random() * reddit.length -1)];

        const img = await randomPuppy(random);
        const embed = new Discord.MessageEmbed()
            .setTitle(`from /r/${random}`)
            .setColor(getRandomColor())
            .setImage(img)
            .setTimestamp()
            .setFooter(`requested by: ${message.author.tag}`, 'https://i.imgur.com/KnqnZ7f.png')
            .setURL(`https://reddit.com/r/${random}`);

        await message.channel.send(embed)


    }
    async greentext(message) {
        let greentext = [
            "4chan",
            "greentext",
            "wholesomegreentext"
        ]

        let random1 = greentext[Math.floor(Math.random() * greentext.length -1)];

        const img1 = await randomPuppy(random1);
        const incelpic = new Discord.MessageEmbed()
            .setTitle(`from /r/${random1}`)
            .setColor(getRandomColor())
            .setImage(img1)
            .setTimestamp()
            .setFooter(`requested by: ${message.author.tag}`, 'https://i.imgur.com/KnqnZ7f.png')
            .setURL(`https://reddit.com/r/${random1}`);

        await message.channel.send(incelpic)


    }
    async ascii(message) {
        const args = message.content.slice(8).trim().split(/ +/g);

        if(!args[0]) return message.channel.send('Please provide some text');

        var msg = args.join(" ");

        figlet.text(msg, function (err, data) {
            if (err) {
                console.log('Something went wrong');
                console.dir(err)
            }
            if(data.length > 2000) return message.channel.send('Please provide text shorter than 2000 characters')

            message.channel.send('```' + data + '```')
        })
    }
}

client.login('token');
