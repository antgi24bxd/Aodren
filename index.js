const Discord = require("discord.js");
const ytdl = require("ytdl-core");


const Client = new Discord.Client;

const prefix = "!";



Client.on("ready", () => {
    console.log("Bot allumé")
});

Client.on("guildMemberAdd", member => {
    console.log("un nouveau membre a rejoints");
    member.guild.channels.cache.find(channel => channel.id === "833265293329563699").send(member.displayName + " Viens d'arrivé a Aodren !! \n Nous sommes maintenant " + member.guild.memberCount + " sur le serveur !");
    member.roles.add("833256593554014229").then(mbr => { 
        console.log("role attribué avec succés pour " + mbr.displayName);
   
    }).catch(() =>{
        console.log("role non atrribué");
    });

});

Client.on("guildMemberRemove", member => {
    console.log("un membre est partis");
    member.guild.channels.cache.find(channel => channel.id === "833265293329563699").send(member.displayName + " est partis :sob: ");
});

Client.on("message", message => {
    if(message.author.bot) return;

    if(message.member.hasPermission("ADMINISTRATOR")){
        if(message.content.startsWith(prefix + "ban")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("membre non ou mal mentionné.");
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + " a été banni avec succés.");
                    console.log("un membre a été banni");

                }
                else {
                    message.reply("Impossible de bannie se membre.");
                }
            }
        }
        else if(message.content.startsWith(prefix + "kick")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
            message.reply("Membre non ou mal mentionné");
        }
        else {
            if(mention.kickable){
                mention.kick();
                message.channel.send(mention.displayName + " a été kick avec succés.");
            }
            else {
                message.reply("Impossible de Kick ce membre.");
            }
            
        }
        
    }
    else if(message.content.startsWith(prefix + "mute")){
        let mention = message.mentions.members.first();

        if(mention == undefined){
            message.reply("Membre non ou mal mentionné.");
        }
        else {
            mention.roles.add("836493519396274196");
            message.channel.send(mention.displayName + " vient d'etre muté.");
        }
        
        
    }
    else if(message.content.startsWith(prefix + "unmute")){
        let mention = message.mentions.members.first();

        if(mention == undefined){
            message.channel.send("Membre non ou mal mentionné.");
        }
        else {
            mention.roles.remove("836493519396274196");
            message.channel.send(mention.displayName + " vient d'etre démuté.");
        }
    }

}
    

 
    if(message.content == prefix +  "setup"){
        if(message.author.bot) return;
    
    message.reply("Bot Opérationnel");
    message.react("👍");
    message.react("✨");
   }
   if(message.content == prefix +  "help"){
    if(message.author.bot) return;

message.channel.send("Voici la liste des commandes :kissing_heart: \n !ban, !kick, !help, !setup, !mute, !clear ");
   }
   if(message.content == prefix +  "clé"){
    if(message.author.bot) return;

message.channel.send("Rappel les clé de dechiffrement sont donné par les modérateurs (staff, ect)...");
   }

   if(message.member.permissions.has("MANAGE_MESSAGES")){
       if(message.content.startsWith(prefix + "clear")){
           let args = message.content.split(" ");
           

           if(args[1] == undefined){
               message.reply("Commande mal utilisé, veuillez reessaier.");
           }
           else {
               let number = parseInt(args[1]);

               if(isNaN(number)){
                   message.reply("Commande mal utilisé, veuillez reessaier."); 
               }
               else {
                   message.channel.bulkDelete(number).then(messages => {
                    console.log("Suppression de " + messages.size + "messages réussi !");
                   }).catch(err => {
                       console.log("erreur de clear : " + err);
                   });
               }
           }
       }
   }
   if(message.content.startsWith(prefix + "p")){
       if(message.member.voice.channel){
        message.member.voice.channel.join().then(connection => {
            let arg = message.content.split(" ");

            if(!arg[1]){
                message.reply("Url invalide.");
                connection.disconnect();
            }
            else {

            

            let dispatcher = connection.play(ytdl(arg[1], { quality: "highestaudio"}));

            dispatcher.on("finish", () => {
                dispatcher.destroy();
                connection.disconnect();
            });

            dispatcher.on("error", err => {
                console.log("erreur de dispatcheur : " + err);
           
            });

        }
        }).catch(err => {
            message.reply("Erreur lors de la connection : " + err);
        });

       }
       else {
           message.reply("Pour ecouté se contenu veuillez vous connectez a un salon vocal.");
       }
    }
});





Client.login("ODM1OTYwOTcxNzM4MjE4NTY2.YIXDUw.22rDArgB2LXn5eMMD9yas0gSEUs")
