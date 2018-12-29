const Discord = require('discord.js');

module.exports.run = async (client, msg, args) => {

    msg.channel.send(`**${msg.member.user.username}**, sur  **${msg.guild.name}**, il y a **${msg.guild.memberCount} membres** !`)

    let kickEmbed = new Discord.RichEmbed()
    .setTitle("Nemo Logs")
    .setDescription("Commandes effectué")
    .setColor("#bc0000")
    .addField("**Donné par :**", `<@${msg.author.id}>.\n**ID :** ${msg.author.id}`)
    .addField("**Channel :**", msg.channel)
    .setFooter(`Demandé par ${msg.member.user.username}`)
    .setTimestamp()

  let incidentchannel = msg.guild.channels.find(`name`, "incidents");
    if(!incidentchannel) return msg.channel.send("Can't find incidents channel.");

    incidentchannel.send(kickEmbed);
    
}

module.exports.help = {
    name: "membercount"
}