const Discord = require('discord.js');
const GoogleImages = require('google-images');
const GoogleAPIKey = process.env.GOOGLE_API_KEY;
const GoogleCSEID = process.env.GOOGLE_CSE_ID;

module.exports = {
	name: 'image',
	aliases: ['imagesearch', 'i', 'is'],
	description: 'Search google images',
	args: true,
	usage: '<search terms>',
	guildOnly: false,
	cooldown: 5,
	execute(message, args) {
		const searchTerms = args.join(' ');
		const client = new GoogleImages(GoogleCSEID, GoogleAPIKey);
		let result;

		client.search(searchTerms).then(images => {
			const length = images.length;
			const randIndex = Math.floor(Math.random() * length);
			result = images[randIndex].url;

			const embed = new Discord.RichEmbed()
				.setColor('#0000FF')
				.setTitle(searchTerms)
				.setImage(result);

			message.channel.send(embed);
		});
	},
};