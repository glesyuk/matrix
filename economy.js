const Discord = require('discord.js');
const client = new Discord.Client();
const parse = require("parse-duration");
var ProgressBar = require("progress");
const db = require('quick.db');
const ms = require('parse-ms')

//TODO: leaderboard, rob, roulette, sell, slots,

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
module.exports = class economyclass {

    constructor(client){
        this.client = client;
    } 
    async bal(message) {
        let user = message.mentions.users.first() || message.author;

        let bal = await db.fetch(`money_${message.guild.id}_${user.id}`);
        if(bal === null) bal = 0;

        let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
        if (bank === null) bank = 0;

        message.channel.send(`${user} currently has \n ${bal} in their pocket \n ${bank} in their bank`);
    }
    async daily(message){
        let user = message.author;
        let timeout = 86400000;
        let amount = 500;

        let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

        if(daily !== null && timeout - (Date.now() - daily) > 0){
            let time = ms(timeout - (Date.now() - daily));

            return message.channel.send(`You've already collected your daily award. Come back in ${time.days}d, ${time.hours}h, ${time.minutes}m, and ${time.seconds}s`)
        } else {
            db.add(`money_${message.guild.id}_${user.id}`, amount);
            db.set(`daily_${message.guild.id}_${user.id}`, Date.now());

            message.channel.send(`Successfully added ${amount} coins to your account`)
        }
    }
    async work(message){
        let user = message.author;
        let timeout = 600000;
        let author = await db.fetch(`worked_${message.guild.id}_${user.id}`);

        if(author !== null && timeout - (Date.now() - author) > 0){
            let time = ms(timeout - (Date.now() - author));
            return message.channel.send(`You cannot work again for ${time.minutes}m and ${time.seconds}s`)
        } else {
            let amount = Math.floor(Math.random() * 80) + 1;
            db.add(`money_${message.guild.id}_${user.id}`, amount)
            db.set(`worked_${message.guild.id}_${user.id}`, Date.now())

            message.channel.send(`${user}, you worked and earned ${amount} coins`)
        }
    }
    async beg(message) {
        let user = message.author;
        let timeout = 180000;

        let beg = await db.fetch(`beg_${message.guild.id}_${user.id}`);

        if(beg !== null && timeout - (Date.now() - beg) > 0){
            let time = ms(timeout - (Date.now() - beg));
            return message.channel.send(`You cannot beg again for ${time.minutes}m and ${time.seconds}s, loser`)
        } else {
            let amount = Math.floor(Math.random() * 30) + 10;
            db.add(`money_${message.guild.id}_${user.id}`, amount)
            db.set(`beg_${message.guild.id}_${user.id}`, Date.now())

            message.channel.send(`${user}, you begged and earned ${amount} coins, scrape`)
        }   
    }
    async deposit(message) {
        const args = message.content.slice(10).trim().split(/ +/g);
        let user = message.author;
        let member = db.fetch(`money_${message.guild.id}_${user.id}`)
        let member2 = db.fetch(`bank_${message.guild.id}_${user.id}`)

        if (args[0] == 'all') {
            let money = await db.fetch(`money_${message.guild.id}_${user.id}`)
            let bank = db.fetch(`bank_${message.guild.id}_${user.id}`)

            if(money === 0) return message.channel.send("You don't have any money to deposit!");

            db.add(`bank_${message.guild.id}_${user.id}`, money)
            db.subtract(`money_${message.guild.id}_${user.id}`, money)

            message.channel.send("You deposited all your coins");
        } else {
            if (!args[0]) {
                return message.channel.send("Specify an amount to deposit")
                .catch(err => console.log(err));
            }
            if (message.content.includes('-')) {
                return message.channel.send("You can't deposit negative money");
            }
            if (member < args[0]) {
                return message.channel.send("You don't have that much money");
            }
            message.channel.send(`You have deposited ${args[0]} coins into your bank`);
            db.add(`bank_${message.guild.id}_${user.id}`, args[0])
            db.subtract(`money_${message.guild.id}_${user.id}`, args[0])
        }
    }
    async pay(message) {
        const args = message.content.slice(6).trim().split(/ +/g);
        let user = message.mentions.members.first() 

        let member = db.fetch(`money_${message.guild.id}_${message.author.id}`)

        let embed1 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:Cross:618736602901905418> Mention someone to pay`);

        if (!user) {
            return message.channel.send(embed1)
        }
        let embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:Cross:618736602901905418> Specify an amount to pay`);
  
        if (!args[1]) {
            return message.channel.send(embed2)
        }
        let embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:Cross:618736602901905418> You can't pay someone negative money`);

        if (message.content.includes('-')) { 
            return message.channel.send(embed3)
        }
        let embed4 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:Cross:618736602901905418> You don't have that much money`);

        if (member < args[1]) {
            return message.channel.send(embed4)
        }

        let embed5 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:Check:618736570337591296> You have payed ${user.user.username} ${args[1]} coins`);

        message.channel.send(embed5)
        db.add(`money_${message.guild.id}_${user.id}`, args[1])
        db.subtract(`money_${message.guild.id}_${message.author.id}`, args[1])
    }
    async weekly(message){
        let user = message.author;
        let timeout = 604800000;
        let amount = 2500;

        let weekly = await db.fetch(`weekly_${message.guild.id}_${user.id}`);

        if(weekly !== null && timeout - (Date.now() - weekly) > 0){
            let time = ms(timeout - (Date.now() - weekly));

            return message.channel.send(`You've already collected your weekly award. Come back in ${time.days}d, ${time.hours}h, ${time.minutes}m, and ${time.seconds}s`)
        } else {
            db.add(`money_${message.guild.id}_${user.id}`, amount);
            db.set(`weekly_${message.guild.id}_${user.id}`, Date.now());

            message.channel.send(`Successfully added ${amount} coins to your account`)
        }
    }
    async withdraw(message) {
        const args = message.content.slice(10).trim().split(/ +/g);
        let user = message.author;
        let member = db.fetch(`money_${message.guild.id}_${user.id}`)
        let member2 = db.fetch(`bank_${message.guild.id}_${user.id}`)

        if (args[0] == 'all') {
            let money = await db.fetch(`money_${message.guild.id}_${user.id}`)
            let bank = db.fetch(`bank_${message.guild.id}_${user.id}`)

            if(bank === 0) return message.channel.send("You don't have any money to deposit!");

            db.add(`money_${message.guild.id}_${user.id}`, bank)
            db.subtract(`bank_${message.guild.id}_${user.id}`, bank)

            message.channel.send("You deposited all your coins");
        } else {
            if (!args[0]) {
                return message.channel.send("Specify an amount to deposit")
                .catch(err => console.log(err));
            }
            if (message.content.includes('-')) {
                return message.channel.send("You can't deposit negative money");
            }
            if (member2 < args[0]) {
                return message.channel.send("You don't have that much money");
            }
            message.channel.send(`You have withdrawn ${args[0]} coins`);
            db.add(`money_${message.guild.id}_${user.id}`, args[0])
            db.subtract(`bank_${message.guild.id}_${user.id}`, args[0])
        }
    }
    async shop1(message) {
        message.channel.send("Frank :monkey: (2525)\n Shrek (333)\n Lego Death Star (9999)\n ")
    }
    async buy(message){
        const args = message.content.slice(6).toLowerCase().trim().split(/ +/g);
        let user = message.author;

        let author = db.fetch(`money_${message.guild.id}_${user.id}`);

        if (args[0] == 'frank') {
            if (author < 2525) return message.channel.send("ur too poor for frank :monkey:")
            
            db.fetch(`frank_${message.guild.id}_${user.id}`);
            db.add(`frank_${message.guild.id}_${user.id}`, 1);
            db.subtract(`money_${message.guild.id}_${user.id}`, 2525)
            message.channel.send("Purchased Frank :monkey: for 2525 coins")
        } else if (args[0] == 'shrek') {
            if (author < 333) return message.channel.send("ur too poor for Shrek")
            
            db.fetch(`shrek_${message.guild.id}_${user.id}`);
            db.add(`shrek_${message.guild.id}_${user.id}`, 1);
            db.subtract(`money_${message.guild.id}_${user.id}`, 333)
            message.channel.send("Purchased shrek for 333 coins")
        } else if (args[0] == 'lego') {
            if (author < 999) return message.channel.send("ur too poor for the Lego Death Star")
            
            db.fetch(`lego_${message.guild.id}_${user.id}`);
            db.add(`lego_${message.guild.id}_${user.id}`, 1);
            db.subtract(`money_${message.guild.id}_${user.id}`, 999)
            message.channel.send("Purchased the Lego Death Star for 333 coins")
        } else {
            message.channel.send("Please select an item to buy in the shop!")
        }
    }
    async profile(message) {
        let user = message.mentions.users.first() || message.author;

        let money = await db.fetch(`money_${message.guild.id}_${user.id}`)
        if (money === null) money = 0;

        let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
        if (bank === null) bank = 0;

        let frank = await db.fetch(`frank_${message.guild.id}_${user.id}`)
        if(frank === null) frank = '0'

        let shrek = await db.fetch(`shrek_${message.guild.id}_${user.id}`)
        if(shrek === null) shrek = '0'

        let lego = await db.fetch(`lego_${message.guild.id}_${user.id}`)
        if(lego === null) lego = '0'

        message.channel.send(`**${user}'s Profile**\n\nPocket: ${money}\nBank: ${bank}\nFranks: ${frank}\nShreks: ${shrek}\nLego Death Stars: ${lego}`);
    }
}

client.login('NzY2OTkxNDQxNDE4OTExNzQ0.X4racQ.xwFKni50Nm2OlZgs0lh7cstxm5M');