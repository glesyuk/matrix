
const Discord = require('discord.js');
const client = new Discord.Client();
const parse = require("parse-duration")


module.exports = class moderationClass {

    constructor(client){
        this.client = client;
    } 
    async kick(message) {
        if (!message.guild) return;

        const args = message.content.slice(6).trim().split(/ +/g);

        if(!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])){
            message.channel.send("you don't have permission, naughty naughty!")
        } else {
            let member = message.mentions.members.first() || message.guild.members.get(args[0]);
            if(!member)
                return message.reply("Please mention a valid member of this server");
            if(!member.kickable) 
                return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
            let reason = args.slice(1).join(' ');
            if(!reason) reason = "No reason provided";
            await member.kick(reason)  
                .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
            message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
        };
    
    }
    async ban(message) {
        if (!message.guild) return;

        const args = message.content.slice(5).trim().split(/ +/g);

        if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])){
            message.channel.send("you don't have permission, naughty naughty!")
        } else {
            let member = message.mentions.members.first() || message.guild.members.get(args[0]);
            if(!member)
                return message.reply("Please mention a valid member of this server");
            if(!member.bannable) 
                return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
            let days = args[1]
            let reason = args.slice(2).join(' ');
            if(!reason) reason = "No reason provided";
            await member.ban({days, reason})  
                .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error} \n Check your format is correct: m.ban [user] [number of days] [reason]`));
            message.reply(`${member.user.tag} has been banned by ${message.author.tag} for ${days} day(s), because: ${reason}`);
        };
    
    }
    async kickid(message) {
        if(!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])){
            
            message.channel.send("you don't have permission, naughty naughty!")
        
        } else { 
        
            const guild = await client.guilds.resolve(message.guild.id);
            const args = message.content.slice(8).trim().split(/ +/g);
            let userid = message.toString().slice(6);
            let user = await client.users.fetch(userid.toString())
            const member = guild.members.fetch(user, false).then(m=>{
              console.log('bye '+m)
              m.kick()
            })
               .catch(console.error)
            }
    }
    async banid(message) {
        if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])){
            
            message.channel.send("you don't have permission, naughty naughty!")
        
        } else { 
            
            const guild = await client.guilds.resolve(message.guild.id);
            const args = message.content.slice(7).trim().split(/ +/g);
            let userid = message.toString().slice(6);
            let user = await client.users.fetch(userid.toString())
            const member = guild.members.fetch(user, false).then(m=>{
                console.log('bye '+m)
                m.ban()
            })
           .catch(console.error)
        }
    }

    async purge(message) {

        const args = message.content.slice(7).trim().split(/ +/g);

        if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])){
            
            message.channel.send("you don't have permission, naughty naughty!")
        
        } else {
            const amount = parseInt(args[0])
            if (isNaN(amount)) {
                return message.reply('That isn\'t a valid number');
            } else if (amount <2 || amount > 100) {
                return message.reply('you need ot input a number between 2 and 100')
            } else {
                message.channel.bulkDelete(amount, true).catch(err => {
                    console.error(err);
                    message.channel.send('there was an error trying to purge messages in this channel! \n Tip: You can\'t delete messages older than 2 weeks old!')
                });
            }
        }

    }
    async mute(message) {

        if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])){
            
            message.channel.send("you don't have permission, naughty naughty!")
        
        } else { 

            const guild = await client.guilds.resolve(message.guild.id);
        
            const args = message.content.slice(6).trim().split(/ +/g);

            const ms = require('ms');

            let member = message.guild.member(message.mentions.users.first() || this.client.users.cache.get(args[0]));

            if(!member) { return message.channel.send("There isn't user in this server with that name."); }

            let time = args[1]

            if (!time) { 
                time = "10000000000days"
            }

            let reason = args.slice(2).join(" ")
            if (!reason) {
                reason = ""
            }

            let role = message.guild.roles.cache.find(role => role.name === "mute");

            if(!role) {
            
                role = await message.guild.roles.create({
                    data: {
                        name: 'mute',
                        permissions:[]
                    }
                })
                message.guild.channels.cache.forEach(async channel => {
                    await channel.createOverwrite(role.id, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SPEAK: false,
                        CONNECT: false
                    })
                })
            }
        
            message.guild.member(member).roles.add(role.id).then(() => {
		    	message.channel.send("muted "  + member.user.tag)
            })

            setTimeout(function() {
                message.guild.member(member.roles.remove(role.id))
            }, parse(time))
        }
    }
    async unmute(message){
        if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])){
            
            message.channel.send("you don't have permission, naughty naughty!")
        
        } else { 
            const args = message.content.slice(8).trim().split(/ +/g);

            let member = message.guild.member(message.mentions.users.first() || this.client.users.cache.get(args[0]));

            if(!member) { return message.channel.send("There isn't user in this server with that name."); }

            let role = message.guild.roles.cache.find(role => role.name === "mute");

            if (!role) {
                
                message.channel.send("You haven't even muted anyone yet!")
            }

            let reason = args.slice(2).join(" ")
            if (!reason) {
                reason = ""
            }

            message.guild.member(member.roles.remove(role.id))
        }

    }
    async unban(message){
        if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])){
            
            message.channel.send("you don't have permission, naughty naughty!")
        
        } else { 
            const args = message.content.slice(7).trim().split(/ +/g);
            let member = message.guild.member(message.mentions.users.first() || this.client.users.cache.get(args[0]));

            await member.unban()
                .catch(error => message.reply(`Sorry ${message.author} I couldn't unban because of : ${error}`));
            message.reply(`${member.user.tag} has been unbanned by ${message.author.tag}`);
        
            
         }
    }

}

client.login('token');
