const Discord = require('discord.js');

module.exports = {
	name: 'serverinfo',
	aliases: ['guildinfo', 'serverinfo'],
	description: 'Gather info about a server',
	args: false,
	usage: '',
	guildOnly: false,
	cooldown: 5,
	execute(message, args) {

		const embed = new Discord.RichEmbed()
			.setThumbnail(message.guild.iconURL)
			.setTitle(message.guild.name)
			.setColor('#000000')
			.addField('ID', message.guild.id)
			.addField('Owner', `${message.guild.owner} (${message.guild.owner.id})`)
			.addField('Created', message.guild.createdAt)
			.addField('Total members', message.guild.memberCount);
		 message.channel.send(embed);
		 
	},
};
