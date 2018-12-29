const Discord = require('discord.js');

module.exports.run = async (client, msg, args) => {

    let game = args.slice(0).join(" ");

    if(!msg.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**${msg.member.user.username}**, tu n'as pas la permission !`).then(msg => {msg.delete(5000)});
    if (!msg.guild.member(client.user).hasPermission("ADMINISTRATOR")) return msg.channel.send(`**${msg.member.user.username}**, je n'ai pas la permission pour effectuer cette commande !`).then(msg => {msg.delete(5000)});
        if(!game) return msg.channel.send(`**${msg.member.user.username}**, tu dois entrer une !`).then(msg => {msg.delete(5000)});

        client.user.setActivity(game)

        msg.channel.send(`**${msg.member.user.username}**, mon activité à désormais été modifié **${game}** !`)

          let kickEmbed = new Discord.RichEmbed()
          .setTitle("Nemo Logs")
    .setDescription("Commande effectué")
    .setColor("#bc0000")
    .addField("**Donné par :**", `<@${msg.author.id}>.\n**ID :** ${msg.author.id}`)
    .addField("**Channel :**", msg.channel)
    .addField("**Activité :**", game)
    .setFooter(`Demandé par ${msg.member.user.username}`)
    .setTimestamp()

  let incidentchannel = msg.guild.channels.find(`name`, "incidents");
    if(!incidentchannel) return msg.channel.send("Can't find incidents channel.");

    incidentchannel.send(kickEmbed);

    }

module.exports.help = {
    name: "setactivity"
}