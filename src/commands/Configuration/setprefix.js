module.exports = {
    name: 'setprefix',
    description: 'Cambiar el Prefix de Light Yagami en tu Servidor.',
    usage: 'setprefix <prefix>',
    aliases: ['sp'],
    categoria: 'Configuración',
    async execute(message, client, args) {

    const Discord = require('discord.js')
    const ModelPrefix = require('../../database/models/Prefix')
    const { devs } = require('../../utils/devs.json')

    const PrefixGuild = await ModelPrefix.findOne({ GuildID: message.guild.id }).exec()
    const Prefix = PrefixGuild ? PrefixGuild.Prefix : 'lg!'

    const Permisos = message.member.hasPermission('MANAGE_GUILD') || devs.id.includes(message.author.id)
    if(!Permisos) {
        return message.channel.send('No tienes permisos suficientes para usar este comando. <:Light_2:753483899069530172>')
    }

    if(!args[0]) {
        return message.channel.send(new Discord.MessageEmbed().setDescription('Debes colocar un Prefix.'))
    }

    if(args[0] === Prefix) {
        return message.channel.send('El Prefix que a puesto, ya esta en el Servidor')
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