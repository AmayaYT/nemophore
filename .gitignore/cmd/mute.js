const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (client, msg, args) => {


  if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send(`**${msg.member.user.username}**, tu n'as pas la permission !`);

  let tomute = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
  if(!tomute) return msg.channel.send(`**${msg.member.user.username}**, je ne trouve pas l'utilisateur.`);
  if(tomute.hasPermission("MANAGE_MESSAGES")) return msg.channel.send(`**${msg.member.user.username}**, je ne peux pas rendre muet un Administrateur !`);
  let muterole = msg.guild.roles.find(`name`, "Muted");

      // Création du rôle Muted, si il n'y en a pas.

  if(!muterole){
    try{
      muterole = await msg.guild.createRole({
        name: "Muted",
        color: "#000000",
        permissions:[]
      })
      msg.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }

  // Fin de la création du rôle

  if(tomute.roles.has(muterole.id)) return msg.channel.send(`**${msg.member.user.username}**, cet utilisateur est déjà muet !`);
  let mutetime = args[1];
  if(!mutetime) return msg.channel.send(`**${msg.member.user.username}**, tu n'as pas indiqué un temps !`);

      let reason = args.slice(2).join(" ");

  await(tomute.addRole(muterole.id));
  msg.channel.send(`**${msg.member.user.username}**, <@${tomute.id}> à été rendu muet pendant ${ms(ms(mutetime))} Raison : **${reason}**`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    msg.channel.send(`<@${tomute.id}> à été rétiré du rôle Muet !`);
  }, ms(mutetime));

  let kickEmbed = new Discord.RichEmbed()
    .setTitle("Nemo Logs")
    .setDescription("Mute")
    .setColor("#bc0000")
    .addField("**Utilisateur muté :**", `${tomute}.\n**ID :** ${tomute.id}`)
    .addField("**Donné par :**", `<@${msg.author.id}>.\n**ID :** ${msg.author.id}`)
    .addField("**Channel du mute :**", msg.channel)
    .addField("**Temps du mute :**", `${ms(ms(mutetime))}`)
    .addField("**Raison :**", reason)
    .setFooter(`Nemophore`)
    .setTimestamp()

  let incidentchannel = msg.guild.channels.find(`name`, "incidents");
    if(!incidentchannel) return msg.channel.send("Can't find incidents channel.");

    incidentchannel.send(kickEmbed);

}

module.exports.help = {
  name: "tempmute"
}