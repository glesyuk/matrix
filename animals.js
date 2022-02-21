const Discord = require('discord.js');
const client = new Discord.Client();
const parse = require("parse-duration");
var ProgressBar = require("progress");
const axios = require('axios');
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
module.exports = class animalClass {

    constructor(client){
        this.client = client;
    } 
    async cat(message) {
        const url = "https://some-random-api.ml/img/cat";
        const facts = "https://some-random-api.ml/facts/cat";
        let image, response;
        let fact, responses;

        try {
            response = await axios.get(url);
            image = response.data;

            responses = await axios.get(facts)
            fact = responses.data

        } catch (e) {
            return message.channel.send(`An error occured, please try again!`)
        }

        const embed = new Discord.MessageEmbed()
            .setTitle(`Kitty :cat:`)
            .setColor(getRandomColor())
            .setDescription(fact.fact)
            .setImage(image.link)
            .setTimestamp()
            .setFooter(`requested by: ${message.author.tag}`, 'https://i.imgur.com/KnqnZ7f.png')

        await message.channel.send(embed)

    }
    async dog(message) {
        const url = "https://some-random-api.ml/img/dog";
        const facts = "https://some-random-api.ml/facts/dog";
        let image, response;
        let fact, responses;

        try {
            response = await axios.get(url);
            image = response.data;

            responses = await axios.get(facts)
            fact = responses.data

        } catch (e) {
            return message.channel.send(`An error occured, please try again!`)
        }

        const embed = new Discord.MessageEmbed()
            .setTitle(`Doggo :dog:`)
            .setColor(getRandomColor())
            .setDescription(fact.fact)
            .setImage(image.link)
            .setTimestamp()
            .setFooter(`requested by: ${message.author.tag}`, 'https://i.imgur.com/KnqnZ7f.png')

        await message.channel.send(embed)

    }
    async panda(message) {
        const url = "https://some-random-api.ml/img/panda";
        const facts = "https://some-random-api.ml/facts/panda";
        let image, response;
        let fact, responses;

        try {
            response = await axios.get(url);
            image = response.data;

            responses = await axios.get(facts)
            fact = responses.data

        } catch (e) {
            return message.channel.send(`An error occured, please try again!`)
        }

        const embed = new Discord.MessageEmbed()
            .setTitle(`Bamboo chomper :bamboo:`)
            .setColor(getRandomColor())
            .setDescription(fact.fact)
            .setImage(image.link)
            .setTimestamp()
            .setFooter(`requested by: ${message.author.tag}`, 'https://i.imgur.com/KnqnZ7f.png')

        await message.channel.send(embed)

    }
    async fox(message) {
        const url = "https://some-random-api.ml/img/fox";
        const facts = "https://some-random-api.ml/facts/fox";
        let image, response;
        let fact, responses;

        try {
            response = await axios.get(url);
            image = response.data;

            responses = await axios.get(facts)
            fact = responses.data

        } catch (e) {
            return message.channel.send(`An error occured, please try again!`)
        }

        const embed = new Discord.MessageEmbed()
            .setTitle(`Fox :fox:`)
            .setColor(getRandomColor())
            .setDescription(fact.fact)
            .setImage(image.link)
            .setTimestamp()
            .setFooter(`requested by: ${message.author.tag}`, 'https://i.imgur.com/KnqnZ7f.png')

        await message.channel.send(embed)

    }
    async bird(message) {
        const url = "https://some-random-api.ml/img/birb";
        const facts = "https://some-random-api.ml/facts/bird";
        let image, response;
        let fact, responses;

        try {
            response = await axios.get(url);
            image = response.data;

            responses = await axios.get(facts)
            fact = responses.data

        } catch (e) {
            return message.channel.send(`An error occured, please try again!`)
        }

        const embed = new Discord.MessageEmbed()
            .setTitle(`Birb :bird:`)
            .setColor(getRandomColor())
            .setDescription(fact.fact)
            .setImage(image.link)
            .setTimestamp()
            .setFooter(`requested by: ${message.author.tag}`, 'https://i.imgur.com/KnqnZ7f.png')

        await message.channel.send(embed)

    }
    async koala(message) {
        const url = "https://some-random-api.ml/img/koala";
        const facts = "https://some-random-api.ml/facts/koala";
        let image, response;
        let fact, responses;

        try {
            response = await axios.get(url);
            image = response.data;

            responses = await axios.get(facts)
            fact = responses.data

        } catch (e) {
            return message.channel.send(`An error occured, please try again!`)
        }

        const embed = new Discord.MessageEmbed()
            .setTitle(`Koala :koala:`)
            .setColor(getRandomColor())
            .setDescription(fact.fact)
            .setImage(image.link)
            .setTimestamp()
            .setFooter(`requested by: ${message.author.tag}`, 'https://i.imgur.com/KnqnZ7f.png')

        await message.channel.send(embed)

    }
}

client.login('token');
