const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, msg, args) => {

  if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send(`**${msg.author.username}**, tu n'as pas la permission !`);
  if(!args[0] || args[0 == "help"]) return msg.channel.send(`**${msg.author.username}**, tu dois définir ton nouveau prefix !`);

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  prefixes[msg.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
    if (err) console.log(err)
  });

  msg.channel.send(`**${msg.author.username}**, le prefix du serveur à été modifié : **${args[0]}**`);

    let kickEmbed = new Discord.RichEmbed()
    .setTitle("Nemo Logs")
    .setDescription("Commandes effectué")
    .setColor("#bc0000")
    .addField("**Donné par :**", `<@${msg.author.id}>.\n**ID :** ${msg.author.id}`)
    .addField("**Channel :**", msg.channel)
    .addField("**Prefix :**", args[0])
    .setFooter(`Demandé par ${msg.member.user.username}`)
    .setTimestamp()

  let incidentchannel = msg.guild.channels.find(`name`, "incidents");
    if(!incidentchannel) return msg.channel.send("Can't find incidents channel.");

    incidentchannel.send(kickEmbed);
}

module.exports.help = {
  name: "prefix"
}
