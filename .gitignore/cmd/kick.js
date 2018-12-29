const Discord = require('discord.js');

module.exports.run = async (client, msg, args) => {
  if(!msg.guild.member(msg.author).hasPermission("KICK_MEMBERS")) return msg.reply(`**${msg.member.user.username}**, tu n'as pas la permission !`);

  if(msg.mentions.users.size === 0) {
      return msg.channel.send(`**${msg.member.user.username}**, tu dois mentionner un utlisateur !`)
  }
  var kUser = msg.guild.member(msg.mentions.users.first());
  if(!kUser) return msg.reply(`**${msg.member.user.username}**, l'utilisateur n'existe pas !`);
  let kReason = args.join(" ").slice(22);
  if(!kReason) return msg.channel.send(`*${msg.member.user.username}**, tu dois spécifier une raison !`)
    if(kUser.hasPermission("ADMINISTRATOR")) return msg.channel.send(`*${msg.member.user.username}**, je ne peux pas exclure un administrateur.`);


  if(!msg.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
      return msg.channel.send(`**${msg.member.user.username}**, je n'ai pas la permission d'exclusion.`);
  }

    let kickEmbed = new Discord.RichEmbed()
    .setTitle("Nemo Logs")
    .setDescription("Kick")
    .setColor("#bc0000")
    .addField("**Utilisateur Exclu :**", `${kUser}.\n**ID :** ${kUser.id}`)
    .addField("**Exclu Par :**", `<@${msg.author.id}>.\n**ID :** ${msg.author.id}`)
    .addField("**Channel de l'exclusion :**", msg.channel)
    .addField("**Raison :**", kReason)
    .setFooter(`Demandé par ${msg.member.user.username}`)
    .setTimestamp()

    let incidentchannel = msg.guild.channels.find(`name`, "incidents");
    if(!incidentchannel) return msg.channel.send("Can't find incidents channel.");

    msg.guild.member(kUser).kick(kReason);
    incidentchannel.send(kickEmbed);
  }

module.exports.help = {
  name: "kick"
}