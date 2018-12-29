const ms = require("ms");
const Discord = require('discord.js')

module.exports.run = async (client, msg, args) => {

    if (!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send(`**${msg.member.user.username}**, tu n'as pas la permission !`);
    var user = msg.guild.member(msg.mentions.users.first());

    if (!user) return msg.channel.send(`**${msg.member.user.username}**, tu dois mentionner un utilisateur !`);
    if (user.hasPermission("ADMINISTRATOR")) return msg.channel.send(`**${msg.member.user.username}**, je nepeux pas bannir un administrateur !`);
    let reason = args.slice(2).join(" ");
    if (!reason) return msg.channel.send(`*${msg.member.user.username}**, tu dois indiquer une raison !`);
    var tempBanTime = args[1];
    if (ms(tempBanTime)) {
        await msg.guild.member(user).ban(reason);
        msg.channel.send(`**${user.user.username}** à été banni pendant ${tempBanTime}. Raison : **${reason}** !`);

    let banEmbed = new Discord.RichEmbed()
    .setTitle("Nemo Logs")
    .setDescription("Tempban")
    .setColor("#bc0000")
    .addField("**Utilisateur Banni :**", `${user}.\n**ID :** ${user.id}`)
    .addField("**Banni Par :**", `<@${msg.author.id}>.\n**ID :** ${msg.author.id}`)
    .addField("**Channel du Ban :**", msg.channel)
    .addField("**Raison :**", reason)
    .addField("**Temps :**", tempBanTime)
    .setFooter("Nemophore")
    .setTimestamp();

    let incidentchannel = msg.guild.channels.find(`name`, "incidents");
    if(!incidentchannel) return msg.channel.send(`**${msg.member.user.username}**, il n'y a pas le salon #incidents...`);

    msg.guild.member(user).ban(reason);
    incidentchannel.send(banEmbed);

        setTimeout(function () {

            let embedUnban = new Discord.RichEmbed()
            .setTitle("Nemo Logs")
            .setDescription("Unban")
            .setColor("#bc0000")
            .addField("**Utilisateur Debanni :**", `${user.user.username}.\n**ID :** ${user.id}`)
            .addField("**Banni Par :**", `<@${msg.author.id}>.\n**ID :** ${msg.author.id}`)
            .addField("**Temps :**", tempBanTime)
            .setFooter(`Nemophore`)
            .setTimestamp();
            msg.guild.unban(user.id);
            incidentchannel.send(embedUnban);
        }, ms(tempBanTime));
    }

}

module.exports.help = {
    name: "tempban"
}