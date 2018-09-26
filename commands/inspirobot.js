const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'inspirobot',
	aliases: ['inspire'],
	description: 'Generates an inspiring quote and image from http://inspirobot.me',
	usage: '[xmas]',
	args: false,
	guildOnly: false,
	cooldown: 7,
	execute(message, args) {
		let season = '';
		if (args.length && args[0] == 'xmas') {
			season = '&season=xmas';
		}

		const url = `http://inspirobot.me/api?generate=true${season}`;
		const body = fetch(url);
		body.then(res => res.text())
			.then(data => {
				const embed = new Discord.RichEmbed()
					.setImage(data);
				message.channel.send(embed);
			});
	},
};