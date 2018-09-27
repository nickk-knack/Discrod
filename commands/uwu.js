const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = {
	name: 'e621',
	description: 'Search e621',
	args: true,
	usage: '<tags>',
	guildOnly: false,
	cooldown: 5,
	async execute(message, args) {
		const searchTerms = args.join('+');
		const length = 10;

		const { body } = await snekfetch.get('https://e926.net/post/index.json').query({ tags: searchTerms, limit: length });
		if (!body.length || body.success == false) {
			return message.channel.send(`No results found for **${args.join(' ')}**`);
		}

		const randIndex = Math.floor(Math.random() * length);
		const result = body[randIndex].file_url;

		const embed = new Discord.RichEmbed()
			.setColor('#0000FF')
			.setTitle(args.join(' '))
			.setImage(result);
		message.channel.send(embed);
	},
};