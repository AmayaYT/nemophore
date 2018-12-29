module.exports.run = async (client, msg, args) => {
  
    let statuses = {
      "online": "online",
      "on": "online",
      "invisible": "invisible",
      "offline": "invisible",
      "off": "invisible",
      "invis": "invisible",
      "i": "invisible",
      "dnd": "dnd",
      "idle": "idle"
    };
    if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send(`**${msg.member.user.username}**, tu n'as pas la permission !`);
    if(!args[0]) return msg.channel.send(`**${msg.member.user.username}**, tu dois indiquer un statut ! (ils sont indiqués sur le site web http://odilon.tk/autres.html)`);
    let status = statuses[args[0].toLowerCase()];
    if(!status) {
      return msg.channel.send(`**${msg.member.user.username}**, le statut ${status} n'existe pas.`);
    }
    if(status === "on") status = "online";
    if(status === "off") status = "invisible";
    if(status === "i") status = "invisible";
    if(status === "offline") status = "invisible";
    client.user.setStatus(status)
    .then(u=> {
      msg.channel.send(`**${msg.member.user.username}**, mon statut à été changé : **${status}**.`);
    });

      let kickEmbed = new Discord.RichEmbed()
    .setTitle("Nemo Logs")
    .setDescription("Commandes effectué")
    .setColor("#bc0000")
    .addField("**Donné par :**", `<@${msg.author.id}>.\n**ID :** ${msg.author.id}`)
    .addField("**Channel :**", msg.channel)
    .addField("**Status :**", status)
    .setFooter(`Demandé par ${msg.member.user.username}`)
    .setTimestamp()

  let incidentchannel = msg.guild.channels.find(`name`, "incidents");
    if(!incidentchannel) return msg.channel.send("Can't find incidents channel.");

    incidentchannel.send(kickEmbed);
}

module.exports.help = {
  name: "setstatuts"
}