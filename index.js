const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const ytdl = require("ytdl-core");
//const ytdl2 = require('ytdl-core-discord');
const yts = require("yt-search");
const genius = require("genius-lyrics-api");
const client = new Discord.Client();
const queue = new Map();

const moderationClass = require('./moderation.js');
const moderationClassInstance = new moderationClass(client);

const funClass = require('./fun.js');
const funClassInstance = new funClass(client);

const animalClass = require('./animals.js');
const animalClassInstance = new animalClass(client);

const economyClass = require('./economy.js');
const economyClassInstance = new economyClass(client);

const utilityClass = require('./utility.js');
const utilityClassInstance = new utilityClass(client);



//genius stuff
const Genius = require("genius-lyrics");
const moment = require("moment");
const { deprecationHandler } = require("moment");
const Client = new Genius.Client("sXHbyq-bUHORCL4RkhtQC6OK56_5wRAoJAfZ0-AaId-tBupppc3NldMNQjE-ZWsY");

let dispatcher;
let queueConstruct;

client.on("ready", () => {
  console.log("Ready!");
  client.user.setActivity(`m.help || Serving ${client.guilds.cache.size} servers`);
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});

function getRandomColor() {
  var letters = '0123456789abcdef';
  var color = '';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color; 
}

const noQueueEmbed = new Discord.MessageEmbed()
  .setColor(getRandomColor())
  .setTitle("There is nothing in the queue!")
  .setDescription("The command couldn't be carried out because there is nothing in the queue! Please do m.help for further assistance")
  .setTimestamp()
  .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png');
/*

const exampleEmbed = new Discord.MessageEmbed()
  .setColor(getRandomColor())
  .setTitle(title)
  .setDescription(message)
  .setTimestamp()
  .setFooter('Need to do image lmao')

message.channel.send(exampleEmbed);
*/

client.on("message", async message => {


  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const serverQueue = queue.get(message.guild.id);

  //command list

  if (message.content.startsWith(`${prefix}play`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}skip`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}stop`)) {
    stop(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}leave`)) {
    leave(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}queue`)) {
    show(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}pause`)) {
    pause(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}resume`)) {
    resume(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}nowplaying`)) {
    nowplaying(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}volume`)){
    volume(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}loop`)){
    loop(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}jump`)) {
    jump(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}remove`)) {
    remove(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}lyrics`)) {
    lyrics(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}help`)) {
    help(message);
    return;
  } else if (message.content.startsWith(`${prefix}musichelp`)){
    musichelp(message);
    return;
  } else if (message.content.startsWith(`${prefix}moderationhelp`)) {
    moderationhelp(message);
    return;
  } else if (message.content.startsWith(`${prefix}funhelp`)) {
    funhelp(message);
    return;
  } else if (message.content.startsWith(`${prefix}economyhelp`)) {
    economyhelp(message);
    return;
  } else if (message.content.startsWith(`${prefix}utilityhelp`)) {
    utilityhelp(message);
    return;
  } else if (message.content.startsWith(`${prefix}kick`)){
    moderationClassInstance.kick(message);
    return;
  } else if (message.content.startsWith(`${prefix}ban`)){
    moderationClassInstance.ban(message);
    return;
  } else if (message.content.startsWith(`${prefix}mute`)){
    moderationClassInstance.mute(message);
    return;
  } else if (message.content.startsWith(`${prefix}banid`)){
    moderationClassInstance.banid(message);
    return;
  } else if (message.content.startsWith(`${prefix}kickid`)){
    moderationClassInstance.kickid(message);
    return;
  } else if (message.content.startsWith(`${prefix}purge`)){
    moderationClassInstance.purge(message);
    return;
  } else if (message.content.startsWith(`${prefix}mute`)){
    moderationClassInstance.mute(message);
    return;
  } else if (message.content.startsWith(`${prefix}unmute`)){
    moderationClassInstance.unmute(message);
    return;
  } else if (message.content.startsWith(`${prefix}unban`)){
    moderationClassInstance.unban(message);
    return;
  } else if (message.content.startsWith(`${prefix}avatar`)){
    funClassInstance.avatar(message);
    return;
  } else if (message.content.startsWith(`${prefix}ship`)){
    funClassInstance.ship(message);
    return;
  } else if (message.content.startsWith(`${prefix}mock`)){
    funClassInstance.mock(message);
    return;
  } else if (message.content.startsWith(`${prefix}cat`)){
    animalClassInstance.cat(message);
    return;
  } else if (message.content.startsWith(`${prefix}dog`)){
    animalClassInstance.dog(message);
    return;
  } else if (message.content.startsWith(`${prefix}bird`)){
    animalClassInstance.bird(message);
    return;
  } else if (message.content.startsWith(`${prefix}panda`)){
    animalClassInstance.panda(message);
    return;
  } else if (message.content.startsWith(`${prefix}fox`)){
    animalClassInstance.fox(message);
    return;
  } else if (message.content.startsWith(`${prefix}koala`)){
    animalClassInstance.koala(message);
    return;
  } else if (message.content.startsWith(`${prefix}meme`)){
    funClassInstance.meme(message);
    return;
  } else if (message.content.startsWith(`${prefix}greentext`)){
    funClassInstance.greentext(message);
    return;
  } else if (message.content.startsWith(`${prefix}4chan`)){
    funClassInstance.greentext(message);
    return;
  } else if (message.content.startsWith(`${prefix}ascii`)){
    funClassInstance.ascii(message);
    return;
  } else if (message.content.startsWith(`${prefix}daily`)){
    economyClassInstance.daily(message);
    return;
  } else if (message.content.startsWith(`${prefix}balance`)){
    economyClassInstance.bal(message);
    return;
  } else if (message.content.startsWith(`${prefix}work`)){
    economyClassInstance.work(message);
    return;
  } else if (message.content.startsWith(`${prefix}deposit`)){
    economyClassInstance.deposit(message);
    return;
  } else if (message.content.startsWith(`${prefix}beg`)){
    economyClassInstance.beg(message);
    return;
  } else if (message.content.startsWith(`${prefix}pay`)){
    economyClassInstance.pay(message);
    return;
  } else if (message.content.startsWith(`${prefix}withdraw`)){
    economyClassInstance.withdraw(message);
    return;
  } else if (message.content.startsWith(`${prefix}weekly`)){
    economyClassInstance.weekly(message);
    return;
  } else if (message.content.startsWith(`${prefix}shop`)){
    economyClassInstance.shop1(message);
    return;
  } else if (message.content.startsWith(`${prefix}buy`)){
    economyClassInstance.buy(message);
    return;
  } else if (message.content.startsWith(`${prefix}profile`)){
    economyClassInstance.profile(message);
    return;
  } else if (message.content.startsWith(`${prefix}weather`)){
    utilityClassInstance.weather(message);
    return;
  } else if (message.content.startsWith(`${prefix}ping`)){
    utilityClassInstance.ping(message);
    return;
  } else if (message.content.startsWith(`${prefix}calculate`)){
    utilityClassInstance.calculate(message);
    return;
  } else if (message.content.startsWith(`${prefix}calc`)){
    utilityClassInstance.calc(message);
    return;
  } else{
    const nocommandembed = new Discord.MessageEmbed()
      .setColor('FF0000')
      .setTitle('Error')
      .setTimestamp()
      .setDescription(`Please enter a valid command! \n Do m.help for a list of commands!`)
      .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')

    message.channel.send({embed: nocommandembed});
  }
});


async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) {
    connectErrorEmbed = new Discord.MessageEmbed()
    .setColor(getRandomColor())
    .setTitle("Error:")
    .setDescription("You need to be in a voice channel to play music")
    .setTimestamp()
    .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')

    message.channel.send({embed: connectErrorEmbed});
  }else {const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        const permissionsErrorEmbed = new Discord.MessageEmbed()
          .setColor(getRandomColor())
      .setTitle("Error:")
      .setDescription("I need the permissions to join and speak in voice channels!")
      .setTimestamp()
      .setFooter('matrix', 'matrix', 'https://i.imgur.com/KnqnZ7f.png')

    message.channel.send({embed: permissionsErrorEmbed});
    }


  // Searches YouTube with the message content (this joins the arguments
  // together because songs can have spaces)
  const {videos} = await yts(args.slice(1).join(" "));
  const songNotFoundEmbed = new Discord.MessageEmbed()
    .setColor(getRandomColor())
    .setTitle("Error")
    .setDescription("No songs were found!")
    .setTimestamp()
    .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')
  if (!videos.length) {
    return message.channel.send({embed: songNotFoundEmbed})
  }
  const song = {
    title: videos[0].title,
    url: videos[0].url,
    duration: videos[0].duration,
    thumbnail: videos[0].thumbnail,
  };

  if (!serverQueue) {
    queueConstruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 1,
      playing: true,
      loop: false,
    };

    let song;
    if (ytdl.validateURL(args[1])) {
      const songInfo = await ytdl.getInfo(args[1]);
      song = {
        title: songInfo.title,
        url: songInfo.videoDetails.video_url,
        duration: songInfo.duration,
        thumbnail: songInfo.thumbnail,
      };
    } else {
      const {videos} = await yts(args.slice(1).join(" "));
      if (!videos.length) return message.channel.send({embed: songNotFoundEmbed});
      song = {
        title: videos[0].title,
        url: videos[0].url,
        duration: videos[0].duration,
        thumbnail: videos[0].thumbnail,
      };
    }

    queue.set(message.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(message.guild, queueConstruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      const errorEmbed = new Discord.MessageEmbed()
        .setColor(getRandomColor())
        .setTitle("Error:")
        .setDescription(err)
        .setTimestamp()
        .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')   
      return message.channel.send({embed: errorEmbed});
    }
  } else {
    serverQueue.songs.push(song);
    const queueAddEmbed = new Discord.MessageEmbed()
      .setColor(getRandomColor())
      .setTitle(song.title)
      .setURL(song.url)
      .setDescription(`${song.title} has been added to the queue!`)
      .setThumbnail(`${song.thumbnail}`)
      .setTimestamp()
      .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')
  
    message.channel.send({embed: queueAddEmbed});
  }
}
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel){
    const skipConnectErrorEmbed = new Discord.MessageEmbed()
      .setColor(getRandomColor())
      .setTitle("Error:")
      .setDescription("You have to be in a voice channel to skip the music!")
      .setTimestamp()
      .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')
    return message.channel.send({embed: skipConnectErrorEmbed});
  } else if (!serverQueue) {
    return message.channel.send({embed: noQueueEmbed});
  } else {
  serverQueue.connection.dispatcher.end();
  }
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel){
    const stopErrorEmbed = new Discord.MessageEmbed()
      .setColor(getRandomColor())
      .setTitle("Error:")
      .setDescription("You have to be in a voice channel to stop the music!")
      .setTimestamp()
      .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')
  
    message.channel.send({embed: stopErrorEmbed});
  } else {
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
    const stopErrorEmbed = new Discord.MessageEmbed()
      .setColor(getRandomColor())
      .setTitle("Stopped!")
      .setDescription("Successfully stopped the music!")
      .setTimestamp()
      .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')
  
    message.channel.send({embed: stopErrorEmbed});
  }
}

//playing function
function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  //important dispatcher here https://discord.js.org/#/docs/main/stable/class/StreamDispatcher
  dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      const shiffed = serverQueue.songs.shift(); //remove shiffed = if doesnt work
      if(serverQueue.loop === true) {
        serverQueue.songs.push(shiffed);
      };
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  const playEmbed = new Discord.MessageEmbed()
      .setColor(getRandomColor())
      .setTitle("Playing:")
      .setURL(song.url)
      .setDescription(`Start playing: **${song.title}** \n Length: **${song.duration}**`)
      .setThumbnail(`${song.thumbnail}`)
      .setTimestamp()
      .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')
  return serverQueue.textChannel.send({embed: playEmbed});
}

//function for queue
function show(message, serverQueue) {

    const queueLength = serverQueue.songs.length;

    var queueContent = ""

    const queueEmbed = new Discord.MessageEmbed()
      .setColor(`${getRandomColor}`)
      .setTitle('Queue:')
      .setDescription('title \nposition in queue')
      .setTimestamp()
      .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')

    for (var queueInfo = 0; queueInfo<queueLength; queueInfo++) {
      queueContent += (`${serverQueue.songs[queueInfo].title}`);
      queueEmbed.addField(queueContent, queueInfo + 1, true); //queueContent first param
      queueContent = "";
    };

    return message.channel.send({embed: queueEmbed});
};

function pause(message, serverQueue) {
  
  dispatcher.pause();

  const pauseEmbed = new Discord.MessageEmbed()
    .setColor('FF0000')
    .setTitle('Paused!')
    .setDescription(`Playing: ${serverQueue.songs[0].title}`)
    .setTimestamp()
    .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')

  message.channel.send({embed: pauseEmbed});

}

function resume(message, serverQueue) {

  dispatcher.resume();
  
  const resumeEmbed = new Discord.MessageEmbed()
    .setColor('00FF00')
    .setTitle('Resumed!')
    .setDescription(`Playing: ${serverQueue.songs[0].title}`)
    .setTimestamp()
    .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')

  message.channel.send({embed: resumeEmbed});
}

function nowplaying(message, serverQueue){

  if(!serverQueue) {
    message.channel.send({embed: noQueueEmbed})
  } else {
    const nowPLayingEmbed = new Discord.MessageEmbed()
      .setColor(getRandomColor())
      .setTitle("Now Playing:")
      .setDescription(`Playing: ${serverQueue.songs[0].title}`)
      .setTimestamp()
      .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')
    message.channel.send({embed: nowPLayingEmbed});
  }
}

function volume(message, serverQueue){

  if(!serverQueue) {
    message.channel.send({embed: noQueueEmbed})
  } else {

    volumeindicator = message.toString().slice(9);

    if (isNaN(volumeindicator) || volumeindicator < 0 || !volumeindicator) {
      volumeNumberEmbed = new Discord.MessageEmbed()
        .setColor(getRandomColor())
        .setTitle("Error:")
        .setDescription("Please enter a number between 0 and infinity to change the volume!")
        .setTimestamp()
        .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')
      message.channel.send({embed: volumeNumberEmbed});
    } else {
    serverQueue.connection.dispatcher.setVolume(volumeindicator/100);

    const volumeEmbed = new Discord.MessageEmbed()
      .setColor(getRandomColor())
      .setTitle(`Volume changed to ${volumeindicator}!`)
      .setDescription(`Playing: ${serverQueue.songs[0].title}`)
      .setTimestamp()
      .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')
    
    message.channel.send({embed: volumeEmbed});
    }
  }
}

function loop(message, serverQueue){

  if (serverQueue){
    serverQueue.loop = !serverQueue.loop;
    return message.channel.send({
      embed: {
        color: getRandomColor(),
        description: `loop is ${serverQueue.loop === true? "enabled" : "disabled"}`
      }
    });
  };
  return message.channel.send({
    embed: noQueueEmbed
  });
};

function jump(message, serverQueue){

  if (!serverQueue){
    message.channel.send({embed: noQueueEmbed});
  } else {

    jumpindicator = message.toString().slice(7);

    if (jumpindicator < 1 || jumpindicator > serverQueue.songs.length || isNaN(jumpindicator)) {
      const jumpErrorEmbed = new Discord.MessageEmbed()
        .setColor(getRandomColor())
        .setTitle(`Error:`)
        .setDescription(`Please give a valid number in the queue to jump!`)
        .setTimestamp()
        .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')
    
      message.channel.send({embed: jumpErrorEmbed});
    } else {
      play(message.guild, queueConstruct.songs[jumpindicator - 1]);
      for( var i = 0; i < jumpindicator - 1; i++){
        queueConstruct.songs.shift()
      }
    }
    //we weant the user to jump to a certain track int he think
  }
}

function remove(message, serverQueue){   

  if(!serverQueue){
    message.channel.send({embed: noQueueEmbed});
  } else {
    removeindicator = message.toString().slice(9);

    if (removeindicator < 1 || removeindicator > serverQueue.songs.length || isNaN(removeindicator)){
      const removeErrorEmbed = new Discord.MessageEmbed()
        .setColor(getRandomColor())
        .setTitle(`Error:`)
        .setDescription(`Please give a valid number in the queue to jump!`)
        .setTimestamp()
        .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')
    
      message.channel.send({embed: removeErrorEmbed});
    } else {
      const removeEmbed = new Discord.MessageEmbed()
        .setColor(getRandomColor())
        .setTitle(`Removed!`)
        .setDescription(`${queueConstruct.songs[removeindicator-1].title} has been removed`)
        .setTimestamp()
        .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')
    
      message.channel.send({embed: removeEmbed});
      queueConstruct.songs.splice(removeindicator - 1, 1);
    }
  }

}

function lyrics(message, serverQueue){

  if(!serverQueue){
    message.channel.send({embed: noQueueEmbed});
  } else{

    const options = {                                                                                                                                               
      apiKey: "G3FcmupcdQPeyCF3Wf1Okw9KK4I5gnP04E9iRWk-huFrEbWwClfAIJFXwX4qJlGU",
      title: `${queueConstruct.songs[0].title}`,
      artist: '',
      optimizeQuery: true
    };

    genius.getLyrics(options).then((lyrics) => {
      if(lyrics == null || lyrics == undefined ){
        const lyricsErrorEmbed = new Discord.MessageEmbed()
          .setColor(getRandomColor())
          .setTitle(`Error:`)
          .setDescription(`Sorry, but there are no lyrics for ${options.title}, ${options.artist}`)
          .setTimestamp()
          .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')
    
        message.channel.send({embed: lyricsErrorEmbed});
      } else{
        genius.getLyrics(options).then((lyrics) => {

          if (lyrics.length < "4000") {
            const lyricsEmbed = new Discord.MessageEmbed()
            .setColor(getRandomColor())
            .setTitle(`**Lyrics of ${options.title}, ${options.artist}**`)
            .setDescription(lyrics)
            .setTimestamp()
            .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png');

            message.channel.send({embed: lyricsEmbed})
          } else {
            
            const str = lyrics;
            var length = str.length;

            var n = 10;
            var temp = 0;
            var chars = length/n;

            var equalStr = [];

            if (length % n != 0){
              length = length + 1;
              for(var i = 0; i < length; i = i+chars) {   
                var part = str.substring(i, i+chars);  
                equalStr[temp] = part;  
                temp++;  
              } 
              for(var i = 0; i < equalStr.length; i++){
                const lyricsEmbed = new Discord.MessageEmbed()
                  .setColor(getRandomColor())
                  .setTitle(`**Lyrics of ${options.title}, ${options.artist}** (part ${i+1})`)
                  .setDescription(equalStr[i])
                  .setTimestamp()
                  .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png');

                message.channel.send({embed: lyricsEmbed})
              }
            } else {
              for(var i = 0; i < length; i = i+chars) {   
                var part = str.substring(i, i+chars);  
                equalStr[temp] = part;  
                temp++;  
              } 
              for(var i = 0; i < equalStr.length; i++){
                const lyricsEmbed = new Discord.MessageEmbed()
                  .setColor(getRandomColor())
                  .setTitle(`**Lyrics of ${options.title}, ${options.artist}** (part ${i+1})`)
                  .setDescription(equalStr[i])
                  .setTimestamp()
                  .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png');

                message.channel.send({embed: lyricsEmbed})
              }
            }
            
          } /* else {
            const lyricsEmbed3 = new Discord.MessageEmbed()
            .setColor(getRandomColor())
            .setTitle('Error:')
            .setDescription('That song is too long! I can\'t play that!')
            .setTimestamp()
            .setFooter("need to add image lmao");
            message.channel.send({embed: lyricsEmbed3})
          } */
        }
        )
      //  genius.getLyrics(options).then((lyrics) => message.channel.send(`**Lyrics of ${options.title}, ${options.artist}** \n` + lyrics)); 
      }
    })
  }
}

function help(message){
  const helpEmbed = new Discord.MessageEmbed()
    .setColor(getRandomColor())
    .setTitle("Help")
    .setDescription("Here are the groups of commands:")
    .addFields(
      { name: 'Music', value: 'm.musichelp'},
      { name: 'Moderation', value: 'm.moderationhelp'},
      { name: 'Fun', value: 'm.funhelp'},
      { name: 'Economy', value: 'm.economyhelp'},
      { name: 'Utility', value: 'm.utilityhelp'},
    )
    .addField('This bot is currently a Work In Progress.')
    .setTimestamp()
    .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')

  message.channel.send(helpEmbed);
   
}

function leave(message, serverQueue){
  serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
    const stopErrorEmbed = new Discord.MessageEmbed()
      .setColor(getRandomColor())
      .setTitle("Stopped!")
      .setDescription("Successfully stopped the music!")
      .setTimestamp()
      .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')
  
    message.channel.send({embed: stopErrorEmbed});
}

function musichelp(message){

  const musichelpEmbed = new Discord.MessageEmbed()
  .setColor(getRandomColor())
  .setTitle("Music Help")
  .setDescription("Here are the list of commands for music:")
  .addFields(
    { name: 'm.play', value: 'Joins the call and plays the song. Can be in any format as a yotuube URL or words'},
    { name: 'm.stop', value: 'Removes the queue and leaves the call'},
    { name: 'm.leave', value: 'Leaves the voice channel'},
    { name: 'm.skip', value: 'Skips to the next song in the queue, or leaves if there is no song.'},
    { name: 'm.queue', value: 'Shows everything in the queue'},
    { name: 'm.pause', value: 'Pauses the music'},
    { name: 'm.resume', value: 'Resumes the music'},
    { name: 'm.nowplaying', value: 'Shows what is playing'},
    { name: 'm.volume', value: 'Changes the volume [0 - infinity]'},
    { name: 'm.loop', value: 'Loops the queue'},
    { name: 'm.jump', value: 'Jumps to the selected number in the queue (Do m.queue for the number of the song'},
    { name: 'm.remove', value: 'Removes the selected number in the queue'},
    { name: 'm.lyrics', value: 'Shows the lyrics for the song currenlty playing'},

  )
  .setTimestamp()
  .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')

message.channel.send(musichelpEmbed);
}

function moderationhelp(message){

  const moderationhelpembed = new Discord.MessageEmbed()
  .setColor(getRandomColor())
  .setTitle("Moderation Help")
  .setDescription("Here are the list of commands for moderation:")
  .addFields(
    { name: 'm.ban', value: 'Bans a user (+ reason)'},
    { name: 'm.kick', value: 'Kicks a user (+ reason)'},
    { name: 'm.banid', value: 'Bans a user with thier userID'},
    { name: 'm.kickid', value: 'Kicks a user with their userID'},
    { name: 'm.purge', value: 'Clears a certain amount of messages (max 100)'},
    { name: 'm.mute', value: 'Mutes a user for a certain period of time in ms (+ reason)'},
    { name: 'm.unmute', value: 'Unmutes a user'},
    { name: 'm.unban', value: 'Unbans a user'},

  )
  .setTimestamp()
  .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')

message.channel.send(moderationhelpembed);
}

function moderationhelp(message){

  const moderationhelpembed = new Discord.MessageEmbed()
  .setColor(getRandomColor())
  .setTitle("Moderation Help")
  .setDescription("Here are the list of commands for moderation:")
  .addFields(
    { name: 'm.ban', value: 'Bans a user (+ reason)'},
    { name: 'm.kick', value: 'Kicks a user (+ reason)'},
    { name: 'm.banid', value: 'Bans a user with thier userID'},
    { name: 'm.kickid', value: 'Kicks a user with their userID'},
    { name: 'm.purge', value: 'Clears a certain amount of messages (max 100)'},
    { name: 'm.mute', value: 'Mutes a user for a certain period of time in ms (+ reason)'},
    { name: 'm.unmute', value: 'Unmutes a user'},
    { name: 'm.unban', value: 'Unbans a user'},

  )
  .setTimestamp()
  .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')

message.channel.send(moderationhelpembed);
}

function funhelp(message){

  const funhelpembed = new Discord.MessageEmbed()
  .setColor(getRandomColor())
  .setTitle("Moderation Help")
  .setDescription("Here are the list of commands for moderation:")
  .addFields(
    { name: 'm.meme', value: 'Bans a user (+ reason)'},
    { name: 'm.greentext', value: 'Kicks a user (+ reason)'},
    { name: 'm.ship', value: 'Kicks a user (+ reason)'},
    { name: 'm.mock', value: 'Kicks a user (+ reason)'},
    { name: 'm.avatar', value: 'Displays a user\'s avatar'},
    { name: 'm.ascii', value: 'Converts a message to ascii'},

  )
  .setTimestamp()
  .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')

message.channel.send(funhelpembed);
}

function economyhelp(message){

  const economyhelpembed = new Discord.MessageEmbed()
  .setColor(getRandomColor())
  .setTitle("Economy Help")
  .setDescription("Here are the list of commands for Economy:")
  .addFields(
    { name: 'm.balance', value: 'Shows a user\' balance'},
    { name: 'm.profile', value: 'Shows a user\'s profile'},
    { name: 'm.daily', value: 'Collect a daily reward'},
    { name: 'm.work', value: 'Work for money'},
    { name: 'm.beg', value: 'Beg for money'},
    { name: 'm.deposit', value: 'Deposit money into bank'},
    { name: 'm.pay', value: 'Pay a user money'},
    { name: 'm.weekly', value: 'Collect a weekly reward'},
    { name: 'm.withdraw', value: 'Withdraw money from bank'},
    { name: 'm.shop', value: 'Displays items in the shop'},
    { name: 'm.buy', value: 'Buy something from the shop'},

  )
  .setTimestamp()
  .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')

message.channel.send(economyhelpembed);
}

function utilityhelp(message){

  const utilityhelpembed = new Discord.MessageEmbed()
  .setColor(getRandomColor())
  .setTitle("Economy Help")
  .setDescription("Here are the list of commands for Economy:")
  .addFields(
    { name: 'm.weather', value: 'Shows the currenty weather for any place in the world!'},
    { name: 'm.ping', value: 'Shows latency with the bot'},
    { name: 'm.calculate', value: 'Calculate an equation'},

  )
  .setTimestamp()
  .setFooter('matrix', 'https://i.imgur.com/KnqnZ7f.png')

message.channel.send(utilityhelpembed);
}

client.login(token);
