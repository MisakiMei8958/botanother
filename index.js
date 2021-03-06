//Base bot discord :
const Discord = require('discord.js');

const client = new Discord.Client();

//Variables :
var servers = {};

var party_launch = false;

var fs = require('fs');

var prefix = "i|";

//Login + connexion du bot :
client.login(process.env.TOKEN);

client.on("ready", () => {
	console.log("Connexion en cours ...");
    	setInterval(function() {

        	var statut = [
          	`i|help for help ^^`, 
          	`By FilEeaZaiR and Mei Misxki`,
          	`${client.guilds.array().length} serveurs | ${client.users.size} utilisateurs`];
    
        	var random = Math.floor(Math.random()*(statut.length));
    
        	client.user.setPresence({ 
            		game: { 
            		name: statut[random],
            		type: 0
          		}
        	});
      }, 30000); 
});

client.on("guildMemberAdd", member => {

    const logs = member.guild.channels.find(m => m.id === "550440076627148827");
    if (!logs) return;

    logs.send({
        embed: {
            color: 0xFE6F01,
            author: {
                name: member.user.tag,
                icon_url: member.user.displayAvatarURL
            },
            title: "Arrivée d'un nouvel utilisateur",
            fields: [
            {
                name: "Un nouvel utilisateur vient d'arriver",
                value: `Il s'agit de [${member.user.tag}]`,
                inline: true
            },
            {
                name: `Nombre de membres après l'arrivée de __${member.user.tag}__`,
                value: member.guild.memberCount,
                inline: false
            }],
            timestamp: new Date(),
            footer: {
                text: `ID : ${member.user.id} | FilEeaZaiR#1258`,
            }
        }
    });
});

client.on("guildCreate", guild => {
    
    console.log(`un nouveau serveur a été ajouté: ${guild.name} (id: ${guild.id}). Il contient ${guild.memberCount} membres!`);
        
      const channel = client.channels.find(c => c.id === "550441186003779584");
    
        if(!channel) return;
    
        channel.send({
            embed: {
                color: 0xFE6F01,
                title: "Ajout d'un nouveau serveur :",
                fields: [
                {
                    name: "quelqu'un viens d'ajouter **Izumi Akazawa** sur son serveur, nom du serveur:",
                    value: guild.name,
                    inline: true
                },
                {
                    name: "Propriétaire du serveur:",
                    value: guild.owner.user.username,
                    inline: true
                },
                {
                    name: `Nombre de personnes sur le serveur :`,
                    value: guild.memberCount,
                    inline: true
                },
                {
                    name: "ID du serveur:",
                    value: guild.id,
                    inline: true
                }],
                timestamp: new Date(),
                footer: {
                    text: `IzumiLogs | FilEeaZaiR#1258 / Mei Misxki#8968`,
                }
            }
        });
    });
    
//enlevement du bot a un serveur :
client.on("guildDelete", guild => {
        
console.log(`un serveur a été enlevé: ${guild.name} (id: ${guild.id}). Il contenait ${guild.memberCount} membres!`);
        
    const channel = client.channels.find(c => c.id === "550441186003779584");
    
        if(!channel) return;
    
            channel.send({
                embed: {
                    color: 0xFE6F01,
                    title: "enlevement d'un nouveau serveur :",
                    fields: [
                    {
                        name: "quelqu'un viens d'enlever **Izumi Akazawa** sur son serveur, nom du serveur:",
                        value: guild.name,
                        inline: true
                    },
                    {
                        name: "Propriétaire du serveur:",
                        value: guild.owner.user.username,
                        inline: true
                    },
                    {
                        name: `Nombre de personnes sur le serveur :`,
                        value: guild.memberCount,
                        inline: true
                    },
                    {
                        name: "ID du serveur:",
                        value: guild.id,
                        inline: true
                    }],
                    timestamp: new Date(),
                    footer: {
                        text: `IzumiLogs | FilEeaZaiR#1258 / Mei Misxki#8968`,
                    }
                }
            });
});

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//Commande d'accepte
client.on(`message`, message =>{
    if(message.content.startsWith(prefix + "accept")) {

        message.delete()

        let user = message.guild.member(message.author);

        let role = message.guild.roles.find(m => m.id === "550772307199524876");
        if(!role) return console.log("Le rôle n'existe pas !");

        user.addRole(role).catch(console.error);
        message.channel.send(`**Bravo, tu as accepté le règlement**`);
    
    }

});

//Début des commandes help :
client.on(`message`, message =>{

    //Commande help générale :
    if(message.content === prefix + "help" || message.content === prefix + "aide") {    
        console.log(`Un utilisateur viens de faire la commande help !`)
        message.channel.send({
            embed: {
                color: 0xFE6F01,
                title: ":robot: Voici mes catégories d'aide !",
                description: "Voici mes commandes disponible : (préfix : **" + prefix +"**)" ,
                thumbnail: {
                            url: message.author.displayAvatarURL
                },
                fields: [
                {
                    name: ":tools: Modération",
                    value: "`clear`, `mute`, `unmute`,\n `kick`, `ban`,\n `warns`, `seewarns`, `deletewarns`",
                    inline: true
                },
                {
                    name: ":tada: Fun",
                    value: "`pileface`, `8ball`, `numbergame`, `pets`",
                    inline: true
                },
                {
                    name: ":information_source: Info",
                    value: "`userinfo`, `botinfo`, `serverinfo`,\n `server`, `invite`",
                    inline: true
                },
                {
                    name: ":books: Administration / Bots",
                    value: "`news`, `sondage`,\n `izumisuggestions`, `izumibugs`",
                    inline: true
                }],
                timestamp: new Date(),
                footer: {
                    text: `IzumiHelp | FilEeaZaiR#1258 / Mei Misxki#8968`,
                }
            }
        });
    };

    //Commande help Créateurs :
    if(message.content === prefix + "creahelp" || message.content === prefix + "aidecrea") {
        if(!message.guild.member(message.author).roles.find(r => r.id === "550437568466911243")) return message.channel.send(`Désolé, mais tu n'as pas accès à cette commande !`);
            message.channel.send({embed: {
                color: 0xFE6F01,
                title: ":robot: Voici mes catégories d'aide !",
                description: "Voici mes commandes disponible :" ,
                thumbnail: {
                            url: message.author.displayAvatarURL
                },
                fields: [
                {
                    name: ":tools: Créateurs",
                    value: "`izuminews`, `izumisondage`",
                    inline: true
                }],
                timestamp: new Date(),
                footer: {
                    text: `IzumiCreaHelp | FilEeaZaiR#1258 / Mei Misxki#8968`,
                }
            }
        });
    };

});

//Début des commandes Izumi... :
client.on(`message`, message =>{
    
    if(message.content.startsWith(prefix + "izuminews") || message.content.startsWith(prefix + "in")) {
        if(!message.guild.member(message.author).roles.find(r => r.id === "550437568466911243")) return message.channel.send(`Désolé, mais tu n'as pas accès à cette commande !`);
            let args = message.content.split(" ").slice(1);
            let ThingToEcho = args.join(" ")
            message.channel.send({embed:{
                color: 3447003,
                title: "News",
                fields: [{
                    name: "News :",
                    value: ThingToEcho,
                    inline: true
                }],
                timestamp: new Date(),
                footer: {
                    text: "IzumiNews | FilEeaZaiR#1258 / Mei Misxki#8968"
                }
            }
            
            });
            message.delete()
        }

        if(message.content.startsWith(prefix + "izumisondage") || message.content.startsWith(prefix + "is")) {
        if(!message.guild.member(message.author).roles.find(r => r.id === "550437568466911243")) return message.channel.send(`Désolé, mais tu n'as pas accès à cette commande !`);
        let args = message.content.split(" ").slice(1);
        let ThingToEcho = args.join(" ")
        var sondage_embed = new Discord.RichEmbed()
        .setDescription("Sondage")
        .addField(ThingToEcho, "Répondre avec :white_check_mark: ou :x:")
        .setColor("18d67e")
        .setFooter(`IzumiSondage | FilEeaZaiR#1258 / Mei Misxki#8968`)
        .setTimestamp()
        message.channel.send(sondage_embed)
        .then(function (message) {
            message.react("✅")
            message.react("❌")
        }).catch(function() {
        });

        message.delete()
    }
    
    if(message.content.startsWith(prefix + "izumisuggestion") || message.content.startsWith(prefix + "izumis")) {
        const suggs = client.channels.find(c => c.id === "550441238147498002");

        let args = message.content.split(" ").slice(1);
        let ThingToEcho = args.join(" ")
        suggs.send({embed:{
            color: 3447003,
            title: "Suggestion",
            fields: [{
                name: "Suggestion :",
                value: ThingToEcho,
                inline: true
            }],
            timestamp: new Date(),
            footer: {
                text: `IzumiSuggestion | suggestion par ${message.author.id}`
            }
        }
        });
        message.channel.send('Votre "suggestion" a bien été envoyé')
    };

    if(message.content.startsWith(prefix + "izumibugs") || message.content.startsWith(prefix + "izumib")) {
        const bugs = client.channels.find(c => c.id === "550441295169191937");

        let args = message.content.split(" ").slice(1);
        let ThingToEcho = args.join(" ")
        bugs.send({embed:{
            color: 3447003,
            title: "Bugs",
            fields: [{
                name: "Bugs :",
                value: ThingToEcho,
                inline: true
            }],
            timestamp: new Date(),
            footer: {
                text: `IzumiSuggestion | bugs par ${message.author.id}`
            }
        }
        });
        message.channel.send('Votre "Bugs" a bien été envoyé')

    }

});

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

client.on(`message`, message =>{
    
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
 
                }else{
 
                    warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),
 
                        time: date,
 
                        user: message.author.id};
 
                }
 
                fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
                message.delete();
 
                message.channel.send({
			embed: {
            			color: 0xFE6F01,
            			title: ":warning: Warns",
            			fields: [
            			{
                			name: "Un membre a bien était warn :",
                			value: mentioned.tag,
                			inline: true
            			},
            			{
                			name: "Warn par :",
                			value: message.author.username,
                			inline: false
            			},
            			{
                			name: "Raison du Warn :",
                			value: args.slice(1).join(' '),
                			inline: true
            			}],
            			timestamp: new Date(),
            			footer: {
                			text: `IzumiWarns | FilEeaZaiR#1258`,
            			}
        		}
    		});
 
                message.mentions.users.first().send({
			embed: {
            			color: 0xFE6F01,
            			title: ":warning: Warns",
            			fields: [
            			{
                			name: "Serveur :",
                			value: message.guild.name,
                			inline: true
            			},
            			{
                			name: "Warn par :",
                			value: message.author.username,
                			inline: false
            			},
            			{
                			name: "Raison du Warn :",
                			value: args.slice(1).join(' '),
                			inline: true
            			}],
            			timestamp: new Date(),
            			footer: {
                			text: `IzumiWarns | FilEeaZaiR#1258`,
            			}
        		}
    		});
 
          }else{
 
                message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
                }
 
            }else{
 
                message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
              }
 
        }else{
 
            message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
        }
 
    }else{
 
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
 
                    try{
 
                        if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
                        message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
 
                        return;
 
                    }
 
                }catch (err){
 
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
 
                }else{
 
                    message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
 
                    console.log(args);
 
                }
 
            }else{
 
                message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
 
            }
 
        }else{
 
            message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
        }
 
    }
 
 
 
 
 
    if (message.content.startsWith(prefix+"deletewarns")||message.content.startsWith(prefix+"dw")||message.content.startsWith(prefix+"clearwarns")||message.content.startsWith(prefix+"cw")) {
 
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
 
                            }if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
 
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
 
                                message.channel.send(
					{embed: {
            					color: 0xFE6F01,
            					title: ":warning: Warns",
            					fields: [
            					{
                					name: "Warn de ",
                					value: mentioned.tag,
                					inline: true
            					},
            					{
                					name: "Warn supprimé :",
                					value: args[1] ,
                					inline: false
            					}],
            					timestamp: new Date(),
            					footer: {
                					text: `IzumiWarns | FilEeaZaiR#1258`,
            					}
        				}
				});
 
                                return;
 
                                }if (args[1] === "tout") {
 
                                delete warns[message.guild.id][mentioned.id];
 
                                fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
                                message.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès!`);
 
                                return;
 
                            }else{
 
                                message.channel.send("Erreur mauvais usage: "+prefix+"deletewarns <utilisateur> <nombre>");
 
                            }
 
                        }else{
 
                            message.channel.send("Erreur mauvais usage: "+prefix+"deletewarns <utilisateur> <nombre>");
 
                        }
 
                    }else{
 
                        message.channel.send("Erreur mauvais usage: "+prefix+"deletewarns <utilisateur> <nombre>");
 
                    }
 
                }else{
 
                    message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
                }
 
    }

    if(message.content.startsWith(prefix + "kick")) {
        
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("`Tu ne peux pas faire cette commande !`");
    
        if(message.mentions.users.size === 0) {
            return message.channel.send(`Je veux bien ${message.author.username} mais vous devez mentionner un utilisateur`)
        }

        var kick = message.guild.member(message.mentions.users.first());
        if(!kick) {
            return message.channel.send("Je ne sais si l'utilisateur existe !")
        }

        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.channel.send("Je n'ai pas la perm pour cette commande");
        }

        kick.kick().then(member => {
            message.channel.send(`${member.user.username} a été kick par ${message.author.username}`);
        });
    }

    if (message.content.startsWith(prefix + "ban")) {
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("`Tu ne peux pas faire cette commande !`");
    
        if(message.mentions.users.size === 0) {
            return message.channel.send(`Je veux bien ${message.author.username} mais vous devez mentionner un utilisateur`)
        }

        var ban = message.guild.member(message.mentions.users.first());
        if(!ban) {
            return message.channel.send("Je ne sais si l'utilisateur existe !")
        }

        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("Je n'ai pas la perm pour cette commande");
        }

        ban.ban().then(member => {
            message.channel.send(`${member.user.username} a été banni par ${message.author.username}`);
        });
    }

    if(message.content.startsWith(prefix + "purge") || message.content.startsWith(prefix + "clear")) {
        let myrole = message.guild.member(client.user).hasPermission("MANAGE_MESSAGES");
        let yourole = message.guild.member(message.author).hasPermission("MANAGE_MESSAGES");
    
        if (!myrole) {
            return message.channel.send(":no_entry:**Je n'ai pas les permissions nécessaires pour effacer un/des message(s)**");
        }
    
        if (!yourole) {
            return message.channel.send(":no_entry:**Vous n'avez pas les permissions nécessaires**");
        }
    
        var suppression = message.content.substr(8);
        if (suppression < 2 || suppression > 101) {
            return message.reply(":warning:**La valeur que vous avez entré est invalide, merci de choisir une valeur comprise entre 2 et 100**");
        }
        message.channel.bulkDelete(suppression, true).then(ok => {
            message.reply("**Suppression de " + "" + suppression + "" + " messages**")
            .then(message => setTimeout(function(){message.delete()}, 1000))
            .catch(err => console.log(err));
        
        })

    }

    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Tu dois mentionner quelqu'un pour faire cette commande");
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} a été mute par ${message.author.username} !`);
        })
    }

    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Tu dois mentionner quelqu'un pour faire cette commande");
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} a été unmute par ${message.author.username} !`);
        })
    }

});

//-=-=-=-=-=-=-=-=-=-=-=-

client.on(`message`, message =>{
    
    let nb = Math.floor((Math.random() * 2) + 1);

    if(message.content === prefix + "coin" || message.content === prefix + "pileface" ) {
        
        if (nb == 1) {
            message.channel.send({embed:{
                color: 3447003,
                title: "Pile",
                image: {
                    url :"https://cdn.discordapp.com/attachments/446336017851482117/447485421459603456/pile.png"
                },
                timestamp: new Date(),
                footer: {
                    text: "IzumiCoin"
                }
            }
                
            });
        }
        if (nb == 2) {
            message.channel.send({embed:{
                color: 3447003,
                title: "Face",
                image: {
                    url: "https://cdn.discordapp.com/attachments/446336017851482117/447485423883649024/face.png"
                },
                timestamp: new Date(),
                footer: {
                    text: "IzumiCoin"
                }
            }
                
            });
        }
    }
    
    const réponse = JSON.parse(fs.readFileSync('./eightball.json', "utf8"));

    if(message.content.startsWith(prefix + "8ball")) {

        var args = message.content.split(' ').join(' ').slice(7);

        if(!args) return message.channel.send("Tu dois obligatoirement me poser une question !")
        
            message.channel.send({embed:{
                color: 3447003,
                title: "8ball",
                fields: [{
                    name: "Question :",
                    value: args,
                    inline: false
                },
                {
                    name: "Réponse :",
                    value: réponse[Math.round(Math.random() * réponse.length)],
                    inline: false
                }],
                timestamp: new Date(),
                footer: {
                    text: "IzumiBall"
                }
            }
                
            });
    }
    
    if(message.content.startsWith(prefix + "numbergame")) {
        
        message.channel.send({embed:{
                color: 3447003,
                title: "Find the number",
                fields: [{
                    name: prefix + "numbergame",
                    value: "Voir les commandes pour le jeu :tada:",
                    inline: true
                },
                {
                    name: prefix + "start numbergame",
                    value: "commencer le jeu :video_game:",
                    inline: true
                },
                {
                    name: prefix + "stop numbergame",
                    value: "finir le jeu :sob:",
                    inline: true
                }],
                timestamp: new Date(),
                footer: {
                    text: "IzumiHelpNumber"
                }
            }
                
            });
    }

    if(message.content.startsWith(prefix + "start numbergame")) {
        	message.channel.send(`:tada: Une partie viens d'être lancé par ${message.author.username} !`);

            	party_launch = true;

            	randnum = Math.floor(Math.random() * (2500 - 0) + 0)

            	console.log(randnum);
    	}

    if(party_launch && message.content != null){

        if(Number.isInteger(parseInt(message.content))){

            if(message.content > randnum){

                message.channel.send(`désolé ${message.author.username} le nombre est plus petit !`)

            }

            else if(message.content < randnum){

                message.channel.send(`désolé ${message.author.username} le nombre est plus grand !`)

            }

            else{

                message.channel.send(`Bien joué à ${message.author.username}, le nombre était ${randnum}`)
                party_launch = false;

            }

        }
    }

    if(message.content.startsWith(prefix + "stop numbergame")) {
        	if(party_launch == true){
            		message.channel.send(`:weary: La partie viens d'être arrêté par ${message.author.username} !`)

            		party_launch = false;
        	}else {
            		message.channel.send(`:cry: désolé ${message.author.name} mais aucune partie n'a été lancé !`) 
        	}
    	}
		
    
    if(message.content.startsWith(prefix + "pets")) {

        var pets = [

            "https://media.giphy.com/media/3oEduUVL7wX5a1NBXq/giphy.gif",
            "https://media.giphy.com/media/Dcf2hNSaAiLV6/giphy.gif",
            "https://media.giphy.com/media/10ZEx0FoCU2XVm/giphy.gif",
            "https://media.giphy.com/media/vAHZ9rc8rY8zm/giphy.gif",
            "https://media.giphy.com/media/lHsCS3IickU7e/giphy.gif",
            "https://media.giphy.com/media/l0Exk8EUzSLsrErEQ/giphy.gif",
            "https://media.giphy.com/media/1trYyhnI4TGgM/giphy.gif",
            "https://media.giphy.com/media/2ETTlMXeTxfTa/giphy.gif",
            "https://media.giphy.com/media/l0MYRzcWP7cjfNQ2I/giphy.gif",
            "https://media.giphy.com/media/3oKIPCSX4UHmuS41TG/giphy.gif",
	        "https://media.giphy.com/media/F6Gbwzlcmbha8/giphy.gif",
	        "https://media.giphy.com/media/ytwRLzOe5cXwA/giphy.gif",
	        "https://media.giphy.com/media/F0eb5L2xJJJNC/giphy.gif",
	        "https://media.giphy.com/media/CEdVDTtkvSelO/giphy.gif",
	        "https://media.giphy.com/media/8vQSQ3cNXuDGo/giphy.gif",
	        "https://media.giphy.com/media/tBxyh2hbwMiqc/giphy.gif"
        ];

        var gif = pets[Math.floor(Math.random() * pets.length)];

        message.channel.send({embed:{
                color: 3447003,
                title: "Pets",
                image: {
                    url: gif
                },
                timestamp: new Date(),
                footer: {
                    text: "IzumiPets"
                }
            }
                
            });

    }
    
});

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

client.on(`message`, message =>{
    
    if(message.content.startsWith(prefix + "userinfo")|| message.content.startsWith(prefix + "ui")) {
        const status = {
            online: `En ligne`,
            idle: `Inactif`,
            dnd: `Ne pas dérange`,
            offline: `Hors ligne/Invisible`
        };
        const mb = message.mentions.members.first() ||  message.member;
        var userCreateDate = message.author.createdAt.toString().split(" ");
        var args = message.content.substring(prefix.length).split(" ");
        if (!mb) return message.reply("you have to fill in a valid user!");
            message.channel.send({embed:{
                color: 3447003,
                title: "UserInfo",
                description: mb.user.tag,
                thumbnail: {
                        url: message.author.displayAvatarURL
                },
                fields: [{
                    name: "Ton ID : ",
                    value: mb.user.id,
                    inline: true
                },
                {
                    name: "Ton Pseudo : ",
                    value: `${mb.nickname !== null ? `${mb.nickname}` : "Pas de pseudo modifié"}`,
                    inline: true
                },
                {
                    name: "Ton statut :",
                    value: `${status[mb.user.presence.status]}`,
                    inline: true
                },
                {
                    name: "Ton Jeu :",
                    value: `${mb.user.presence.game ? `${mb.user.presence.game.name}` : "Tu ne joue pas"}`,
                    inline: true
                },
                {
                    name: "Serveur rejoint le :",
                    value: mb.joinedAt.toString(),
                    inline: true
                },
                {
                    name: "Tes rôles",
                    value: `${mb.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "Tu n'as pas de rôle"}`,
                    inline: true
                }],
                timestamp: new Date(),
                footer: {
                    text: "IzumiInfo"
                }
            }

        });

    };
    
    if(message.content.startsWith(prefix + "botinfo")|| message.content.startsWith(prefix + "bi")) {
    
        message.delete()

            message.channel.send({embed:{
                color: 3447003,
                author: {
                name: client.user.username,
                icon_url: client.user.displayAvatarURL
                },
                title: "BotInfo",
                fields: [{
                    name: ":crown: Createur : ",
                    value: "FilEeaZaiR#1258 and Mei Misxki#8968",
                    inline: true
                },
                {
                    name: ":speech_balloon:Channels : ",
                    value: client.channels.size,
                    inline: true
                },
                {
                    name: ":desktop:Servers : ",
                    value: client.guilds.array().length,
                    inline: true
                },
                {
                    name: ":abcd:Username :",
                    value: client.user.username,
                    inline: true
                },
                {
                    name: ":1234:Discriminator :",
                    value: client.user.discriminator,
                    inline: true
                },
                {
                    name: ":clock5: Uptime :",
                    value: Math.round(client.uptime / (1000 * 60 * 60)) + " hours, " + Math.round(client.uptime / (1000 * 60)) % 60 + " minutes, and " + Math.round(client.uptime / 1000) % 60 + " seconds",
                    inline: true
                }],
                timestamp: new Date(),
                footer: {
                    text: "IzumiInfo"
                }
    
            }
        });

    }
    
    if(message.content.startsWith(prefix + "serverinfo")|| message.content.startsWith(prefix + "si")) {
        
        message.delete()

        message.channel.send({embed:{
                color: 3447003,
                author: {
                name: client.user.username,
                icon_url: client.user.displayAvatarURL
                },
                title: "ServerInfo",
                fields: [{
                    name: "Propriaitaire du serveur :",
                    value: message.guild.owner.user.tag,
                    inline: true
                },
                {
                    name: "Nom du serveur : ",
                    value: message.guild.name,
                    inline: true
                },
                {
                    name: "Crée le : ",
                    value: message.guild.createdAt,
                    inline: true
                },
                {
                    name: "Utilisateurs sur le serveur :",
                    value: message.guild.memberCount,
                    inline: true
                },
		{
                    name: "Région du serveur : ",
                    value: message.guild.region,
                    inline: true
                },
                {
                    name: "Nombre de salons",
                    value: message.guild.channels.size,
                    inline: true
                },
                {
                    name: "Nombre de rôles",
                    value:  message.guild.roles.size,
                    inline: true
                },
                {
                    name: "liste de rôles",
                    value: message.guild.roles.map(r => r.name).length > 900 ? "Trop de rôle" : message.guild.roles.map(r => r.name).join(" **|** "),
                    inline: true
                }],
                timestamp: new Date(),
                footer: {
                    text: "IzumiInfo"
                }
    
            }
        });

    }
    
    if(message.content === prefix + "server") {
    console.log("Un membre à utilisé la commande s!officialserv")
    message.channel.send({embed:{
                color: 3447003,
                title: "Rejoins le serveur officiel",
                fields: [{
                    name: "Le serveur :",
                    value: "https://discord.gg/V5YkSGv",
                    inline: true
                }],
                timestamp: new Date(),
                footer: {
                    text: "IzumiServer"
                }
    
            }
        });
    
    }
    
    if(message.content === prefix + "invite") {
    
    console.log("Un membre à utilisé la commande s!invite")
        
    message.channel.send({embed:{
                color: 3447003,
                title: "Invitation",
                fields: [{
                    name: "Mon lien d'invitation :",
                    value: "https://discordapp.com/oauth2/authorize?client_id=550437156238393344&scope=bot&permissions=2146958591",
                    inline: true
                }],
                timestamp: new Date(),
                footer: {
                    text: "IzumiInvite"
                }
    
            }
        });
    }

});

client.on(`message`, message =>{

    if(message.content.startsWith(prefix + "izuminews") || message.content.startsWith(prefix + "in")) {
        let args = message.content.split(" ").slice(1);
        let ThingToEcho = args.join(" ")
        message.channel.send({embed:{
            color: 3447003,
            title: "News",
            fields: [{
                name: "News :",
                value: ThingToEcho,
                inline: true
            }],
            timestamp: new Date(),
            footer: {
                text: "IzumiNews | FilEeaZaiR#1258 / Mei Misxki#8968"
            }
        }
        
        });
        message.delete()
    }

    if(message.content.startsWith(prefix + "izumisondage") || message.content.startsWith(prefix + "is")) {
    let args = message.content.split(" ").slice(1);
    let ThingToEcho = args.join(" ")
    var sondage_embed = new Discord.RichEmbed()
    .setDescription("Sondage")
    .addField(ThingToEcho, "Répondre avec :white_check_mark: ou :x:")
    .setColor("18d67e")
    .setFooter(`Sondage par ${message.author.tag}`)
    .setTimestamp()
    message.channel.send(sondage_embed)
    .then(function (message) {
        message.react("✅")
        message.react("❌")
    }).catch(function() {
    });

    message.delete()
    }

});