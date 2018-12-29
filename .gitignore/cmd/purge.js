const ms = require("ms");
const Discord = require('discord.js');

module.exports.run = async (client, msg, args) => {

    if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send(`**${msg.member.user.username}**, tu n'as pas la permission d'effectuer cette commande !`).then(msg => {msg.delete(5000)});
    if (!msg.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return msg.channel.send(`**${msg.member.user.username}**, je n'ai pas la permission pour effectuer cette commande !`).then(msg => {msg.delete(5000)});

    if (!args[0]) return msg.channel.send(`**${msg.member.user.username}**, tu dois spécifier un nombre de messages à supprimer !`).then(msg => {msg.delete(5000)});
    if (args[0] < 1 && args[0] > 100) return msg.channel.send(`**${msg.member.user.username}**, tu dois entrer un nombre entre 1 et 100.`).then(msg => {msg.delete(5000)});
    if (isNaN(args[0])) return msg.channel.send(`**${msg.member.user.username}**, tu dois entrer un nombre !`).then(msg => {msg.delete(5000)});


    msg.channel.bulkDelete(args[0])
        .then(messages => msg.channel.send(`**${msg.member.user.username}**, j'ai supprimé **${args[0]} messages** !`))
        .then(msg => {msg.delete(5000)
        }).catch().catch((e) => msg.channel.send(`**${msg.member.user.username}**, je ne peux pas supprimer des messages de plus de 14 jours.`));

            let kickEmbed = new Discord.RichEmbed()
            .setTitle("Nemo Logs")
    .setDescription("~Clear~")
    .setColor("#bc0000")
    .addField("**Clear par :**", `<@${msg.author.id}>.\n**ID :** ${msg.author.id}`)
    .addField("**Channel du clear :**", msg.channel)
    .addField("**Nombre :**", `${args[0]} messages`)
    .setFooter(`Demandé par ${msg.member.user.username}`)
    .setTimestamp()

    let incidentchannel = msg.guild.channels.find(`name`, "incidents");
    if(!incidentchannel) return msg.channel.send("Can't find incidents channel.");

    incidentchannel.send(kickEmbed);
}

module.exports.help = {
    name: "clear"
}