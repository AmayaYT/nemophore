const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({disableEveryone: true});
client.commands = new Discord.Collection();
const botconfig = require("./botconfig.json")

fs.readdir("./cmd/", (err, files) => {

  if(err) console.log(err);
  var jsfile = files.filter(f => f.split('.').pop() === 'js');
  if(jsfile.length <= 0){ return console.log("Il n'y a aucune commande.")}
    else { console.log(jsfile.length + ' commandes trouvées') }

  console.log("Commandes ==========")

  jsfile.forEach((f, i) =>{
    let props = require(`./cmd/${f}`);
    console.log(`${f} chargé !`);
    client.commands.set(props.help.name, props);
  });
});

client.on("ready", async () => {

  console.log(`====================\n\nConnection ========== \nConnecté en tant que ${client.user.username} !\n=====================`)

client.user.setActivity(`nemophore.tk || Titanias !`)

});

client.on("message", async msg => {

    // Handler & Prefixes

  if(msg.author.bot) return;

  let prefixes = JSON.parse(fs.readFileSync('./prefixes.json', "utf8"))
  if(!prefixes[msg.guild.id]){
    prefixes[msg.guild.id] = {
      prefixes: botconfig.prefix
    }
  }

  let prefix = prefixes[msg.guild.id].prefixes
  let msgArray = msg.content.split(" ");
  let cmd = msgArray[0];
  let args = msgArray.slice(1);
  let cont = msg.content.slice(prefix.length).split(" ");

  if(!msg.content.startsWith(prefix)) return;


  let commandfile = client.commands.get(cont[0]);
  if(commandfile) commandfile.run(client,msg,args);


  let message = msg

  // Warns

let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));
if (message.content.startsWith(prefix + "warn")){
if (message.channel.type === "dm") return;
var mentionned = message.mentions.users.first();
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
if(message.mentions.users.size === 0) {
  return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");
}else{
    const args = message.content.split(' ').slice(1);
    const mentioned = message.mentions.users.first();
    if (message.member.hasPermission('MANAGE_GUILD')){
      if (message.mentions.users.size != 0) {
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
          if (args.slice(1).length != 0) {
            const date = new Date().toUTCString();
            if (warns[message.guild.id] === undefined)
              warns[message.guild.id] = {};
            if (warns[message.guild.id][mentioned.id] === undefined)
              warns[message.guild.id][mentioned.id] = {};
            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;
            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){
              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};
            } else {
              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),
                time: date,
                user: message.author.id};
            }
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
message.delete();
            message.channel.send(':warning: | **'+mentionned.tag+' à été averti**');
message.mentions.users.first().send(`:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))
          } else {
            message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
          }
        } else {
          message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
        }
      } else {
        message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
      }
    } else {
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
    }
  }
}

  if (message.content.startsWith(prefix+"seewarns")||message.content===prefix+"seewarns") {
if (message.channel.type === "dm") return;
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
    const mentioned = message.mentions.users.first();
    const args = message.content.split(' ').slice(1);
    if (message.member.hasPermission('MANAGE_GUILD')){
      if (message.mentions.users.size !== 0) {
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
          try {
            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
              message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
              return;
            }
          } catch (err) {
            message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
            return;
          }
          let arr = [];
          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");
          for (var warn in warns[message.guild.id][mentioned.id]) {
            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+
            "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");
          }
          message.channel.send(arr.join('\n'));
        } else {
          message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
          console.log(args);
        }
      } else {
        message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
      }
    } else {
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
    }
  }
  if (message.content.startsWith(prefix+"clearwarns")||message.content===prefix+"deletewarns") {
if (message.channel.type === "dm") return;
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
   const mentioned = message.mentions.users.first();
    const args = message.content.split(' ').slice(1);
    const arg2 = Number(args[1]);
    if (message.member.hasPermission('MANAGE_GUILD')){
      if (message.mentions.users.size != 0) {
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){
          if (!isNaN(arg2)) {
            if (warns[message.guild.id][mentioned.id] === undefined) {
              message.channel.send(mentioned.tag+" n'a aucun warn");
              return;
            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
              message.channel.send("**:x: Ce warn n'existe pas**");
              return;
            }
            delete warns[message.guild.id][mentioned.id][arg2];
            var i = 1;
            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){
              var val=warns[message.guild.id][mentioned.id][key];
              delete warns[message.guild.id][mentioned.id][key];
              key = i;
              warns[message.guild.id][mentioned.id][key]=val;
              i++;
            });
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
              delete warns[message.guild.id][mentioned.id];
            }
            message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès!`);
            return;
          } if (args[1] === "tout") {
            delete warns[message.guild.id][mentioned.id];
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
            message.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès!`);
            return;
          } else {
            message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
          }
        } else {
          message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
        }
      } else {
       message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
      }
    } else {
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
    }
  }

});

client.login(process.env.TOKEN);
