const Discord = require('discord.js');
const moment = require('moment')

module.exports.run = async (client, msg, args) => {

  function checkBots(guild) {
    let botCount = 0; // This is value that we will return
    guild.members.forEach(member => { // We are executing this code for every user that is in guild
      if(member.user.bot) botCount++; // If user is a bot, add 1 to botCount value
    });
    return botCount; // Return amount of bots
  }

  function checkMembers(guild) {
    let memberCount = 0;
    guild.members.forEach(member => {
      if(!member.user.bot) memberCount++; // If user isn't bot, add 1 to value. 
    });
    return memberCount;
  }

    let servericon = msg.guild.iconURL;
    const verificationLevel = msg.guild.verificationLevel
    const verificationLevels = ['Aucune', 'Faible', 'Moyen', '(╯°□°）╯︵ ┻━┻', '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻']



    var embedinfoguild = new Discord.RichEmbed()
    .setTitle(`Infos de ${msg.guild.name} :`)
    .setAuthor('Nemophore', client.user.avatarURL)
    .setFooter(`Demandée par ${msg.author.username}`)
    .setTimestamp()
    .setThumbnail(servericon)
    .addField("**Informations Générales :**", "** **")
    .addField("**❯ Popriétaire :**", msg.guild.owner.user.tag, true)
    .addField('**❯ Nombre de membres :**', msg.guild.memberCount, true)
    .addField('**❯ Humains :**', checkMembers(msg.guild), true)
    .addField('**❯ Bots :**', checkBots(msg.guild), true)
    .addField("**❯ Salons Vocaux :**", `${msg.guild.channels.filter(channel => channel.type === 'voice').size} salon(s) vocaux`, true)
    .addField("**❯ Salons Textuels :**", `${msg.guild.channels.filter(channel => channel.type === 'text').size} salon(s) textuels`, true)
    .addField("\n**Autres Informations :**", "** **")
    .addField('**❯ ID :**', `${msg.guild.id}`, true)
    .addField('**❯ Sécurité :**', `${verificationLevels[msg.guild.verificationLevel]}`, true)
    .addField('**❯ Crée le :**', `${moment.utc(msg.guild.createdAt).format("LL")}`, true)
    .addField("**❯ Roles :**", `${msg.guild.roles.filter(r => r.id !== msg.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "`Aucun Rôle`"}`, true)
    msg.channel.send(embedinfoguild)

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
    name: "nemophoreinfo"
}