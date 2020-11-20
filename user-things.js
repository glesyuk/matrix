const Discord = require('discord.js');
const client = new Discord.Client();
const parse = require("parse-duration");
var ProgressBar = require("progress");

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
module.exports = class userclass {

    constructor(client){
        this.client = client;
    } 
    async welcome(member){
        const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
        const server = member.guild;

        if (!channel) {
            server.createChannel("welcome", "welcome")
            channel.send(`Welcome to the server, ${member}`);
        } else {
            channel.send(`Welcome to the server, ${member}`);
        }
    }
}

client.login('NzY2OTkxNDQxNDE4OTExNzQ0.X4racQ.xwFKni50Nm2OlZgs0lh7cstxm5M');