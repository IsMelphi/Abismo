module.exports = {
    name: 'setprefix',
    description: 'Cambiar de Prefix a Abismo.',
    usage: 'setprefix <prefix>',
    aliases: [],
    categoria: 'Configuración',
    async execute(message, client, args) {

    const Discord = require('discord.js')
    const ModelPrefix = require('../../database/models/Prefix')
    const { devs } = require('../../utils/devs.json')

    const PrefixGuild = await ModelPrefix.findOne({ GuildID: message.guild.id }).exec()
    const Prefix = PrefixGuild ? PrefixGuild.Prefix : 'abyss!'

    const Permisos = message.member.hasPermission('MANAGE_GUILD') || devs.id.includes(message.author.id)
    if(!Permisos) {
        const embed = new Discord.MesssageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 2048, dynamic: true, format: 'png' }))
        .setDescription('No tienes los permisos suficientes para usar este Comando.')
        .setFooter('Para usar este comando necesitas Permiso de Gestionar Servidor')
        return message.channel.send(embed)
    }

    if(args[0] === Prefix) {
        return message.channel.send('Ya esta puesto ese prefix...')
    }

    if(args[0].length >= 4) {
        return message.channel.send('El Prefix no puede tener mas de 4 Caracteres.')
    }

    if(PrefixGuild) {
        await PrefixGuild.updateOne({ GuildID: message.guild.id,  Prefix: args[0] })
        const embed = new Discord.MessageEmbed()
        .setDescription(`Prefix cambiado a **${args[0]}**`)
        .setColor('RANDOM')
        message.channel.send(embed)
    } else {
        const NuevoPrefix = new ModelPrefix({ GuildID: message.guild.id,  Prefix: args[0] })
        await NuevoPrefix.save()

        const embed2 = new Discord.MessageEmbed()
        .setDescription(`Prefix cambiado a **${args[0]}**`)
        .setColor('RANDOM')
        message.channel.send(embed2)
    }

    }
}