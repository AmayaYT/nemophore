const Discord = require('discord.js');
const fs = require('fs');
const moment = require('moment')

module.exports.run = async (client, msg, args) => {

    const looked = msg.mentions.members.first() || msg.guild.members.get(args[0]) || msg.member;
    if(looked.bot == true){
    var checkbot = ":robot: Bot"
    } else {
    var checkbot = ":man: Humain"
    }
    if(looked.presence.status === 'online') {
    var etat = "En ligne"
    }else { if (looked.presence.status === `dnd`) {
    var etat = "Ne pas déranger"
    }else { if (looked.presence.status === `idle`){
        var etat = "Inactif"
    }else { if (looked.presence.status === `streaming`){
        var etat = "En streaming"
    }else { if (looked.presence.status === `offline`) {
        var etat = "Hors ligne"
    }}}}}
    

    var embed = new Discord.RichEmbed()
    .setTitle(`Profil de **${looked.user.username}**`)
        .setAuthor("Nemophore", client.user.avatarURL)
        .addField('**Informations générales :**', "** **")
        .addField(`**❯ Nom :**`, `${looked.nickname !== null ? `${looked.nickname}` : "Aucun pseudo."}`, true)
        .addField(`**❯ Statut :**`, `${etat}`, true)
        .addField('**❯ Activité :**', `${looked.presence.game ? `**${looked.presence.game.name}**` : "rien en ce moment."}`, true)
        .addField("\n**Autres Informations :**", "** **")
        .addField("**❯ ID :**", `${looked.id}`, true)
        .addField("**❯ Type :**", `${checkbot}`, true)
        .addField("**❯ Crée le :**", `${moment(looked.createdAt).format("LL")}`, true)
        .addField("**❯ Rejoint le :**", `${moment.utc(looked.joinedAt).format("LL")}`, true)
        .addField("**❯ Roles :**", `${looked.roles.filter(r => r.id !== msg.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "`Aucun Rôle`"}`, true)
        .setThumbnail(looked.avatarURL)
        .setColor("0x04B404")
        .setFooter(`Demandée par ${msg.author.username}`)
        .setTimestamp();
      msg.channel.send(embed);

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
    name: "userinfo"
}