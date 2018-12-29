const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {

    if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send(`*${msg.member.user.username}**, tu n'as pas la permission !`);
    if(args[0] == "help"){
      msg.reply("Usage: !ban <user> <reason>");
      return;
    }
    let bUser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
    if(!bUser) return msg.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);
      if(!bReason) return msg.channel.send(`*${msg.member.user.username}**, tu dois spécifier une raison !`)
    if(bUser.hasPermission("ADMINISTRATOR")) return msg.channel.send(`*${msg.member.user.username}**, je ne peux pas exclure un administrateur. !`);

    if(!msg.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
      return msg.channel.send(`**${msg.member.user.username}**, je n'ai pas la permission pour bannir !*`);
  }

    let banEmbed = new Discord.RichEmbed()
    .setTitle("Nemo Logs")
    .setDescription("Ban")
    .setColor("#bc0000")
    .addField("**Utilisateur Banni :**", `${bUser}.\n**ID :** ${bUser.id}`)
    .addField("**Banni Par :**", `<@${msg.author.id}>.\n**ID :** ${msg.author.id}`)
    .addField("**Channel du Ban :**", msg.channel)
    .addField("**Raison :**", bReason)
    .setFooter(`Nemophore`)
    .setTimestamp();

    let incidentchannel = msg.guild.channels.find(`name`, "incidents");
    if(!incidentchannel) return msg.channel.send(`*${msg.member.user.username}**, il n'y a pas le salon #incidents...`);

    msg.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
}

module.exports.help = {
  name:"ban"
}