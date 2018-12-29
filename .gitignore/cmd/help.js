const Discord = require('discord.js')

module.exports.run = async (client, msg, args) => {

	let embed = new Discord.RichEmbed()
	.setTitle("Commandes")
	.setDescription("Ici se trouvera toutes commandes de **Nemophore**.")
    .addField("**Administration**", "`setstatuts`, `prefix`, `setactivity`.")
    .addField("**Modération**", "`ban`, `tempban`, `kick`, `mute`, `clear`, `warn`, `seewarns`, `clearwarns`")
    .addField("**Utilitaires**", "`membercount`, `nemophoreinfo`, `userinfo`.")
    .setAuthor('Nemophore', client.user.avatarURL)
    .addField("Liens Utiles :", `[Titanias || YouTube](https://www.youtube.com/channel/UC-7oEYgQgzP1rb3cQ3xYR0g)\n[Site du serveur](http://nemophore.tk)`)
    .setFooter(`Demandée par ${msg.member.user.username}`)
    .setTimestamp()

    msg.author.send(embed)
            .then(message => msg.channel.send(`**${msg.member.user.username}**, regarde dans tes messages privés !`))
            .catch(error => {
            msg.channel.send(`**${msg.member.user.username}**, ta fonction de pouvoir recevoir des messages privés est desactivé, active la pour recevoir de l'aide !`);
	});
    let kickEmbed = new Discord.RichEmbed()
    .setTitle("Nemo Logs")
    .setDescription("Commandes effectué")
    .setColor("#bc0000")
    .addField("**Donné par :**", `<@${msg.author.id}>.\n**ID :** ${msg.author.id}`)
    .addField("**Channel :**", msg.channel)
    .setFooter(`Nemophore`)
    .setTimestamp()

  let incidentchannel = msg.guild.channels.find(`name`, "incidents");
    if(!incidentchannel) return msg.channel.send("Can't find incidents channel.");

    incidentchannel.send(kickEmbed);
}

module.exports.help = {
	name: "help"
}