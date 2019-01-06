const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const parser = require('xml2js').parseString;

module.exports = {
	name: 'rule34',
	aliases: ['r34'],
	description: 'Searches rule34.xxx for whatever tags you request.',
	usage: '<search tags>',
	guildOnly: false,
	cooldown: 5,
	async execute(message, args) {
		const limit = 20;
		const query = args.join('+').trim();

		const { body } = await snekfetch.get('https://rule34.xxx/index.php?page=dapi&s=post&q=index').query({ tags: query, limit: limit });
		if (!body.length || body.success == false) {
			return message.channel.send(`No results found for **${query}**`);
		}

		parser(body.toString('utf8'), (err, result) => {
			if (err) {
				console.error(err);
				message.channel.send('UwU sowwy something went wong... (XML parsing failed)');
			}

			const json = JSON.parse(JSON.stringify(result));
			const posts = json.posts.post;

			const randIndex = Math.floor(Math.random() * posts.length);
			const fileUrl = posts[randIndex].$.file_url;

			const embed = new Discord.RichEmbed()
				.setColor('#0000FF')
				.setTitle(args.join(' '))
				.setImage(fileUrl);
			message.channel.send(embed);
		});
	},
};