const Pornsearch = require('pornsearch');

module.exports = {
	name: 'pornhub',
	aliases: ['porn', 'ph', 'fap'],
	description: 'Searches pornhub for a gif or video.',
	usage: '<gif | vid> <search terms>',
	args: true,
	cooldown: 5,
	execute(message, args) {
		const contentType = args.shift().toLowerCase();

		if (contentType != 'gif' && contentType != 'vid') {
			message.reply('you need to specify if you want a gif or a vid.');
			return;
		}

		const query = args.join(' ');
		const search = new Pornsearch(query);

		if (contentType == 'gif') {
			search.gifs()
				.then(gifs => {
					message.channel.send(gifs[Math.floor(Math.random() * gifs.length)].url);
				})
				.catch(error => {
					console.error(error);
					message.channel.send(`Could not find any gifs for ${query}`);
				});
		}
		else if (contentType == 'vid') {
			search.videos()
				.then(vids => {
					message.channel.send(vids[Math.floor(Math.random() * vids.length)].url);
				})
				.catch(error => {
					console.error(error);
					message.channel.send(`Could not find any vids for ${query}`);
				});
		}
	},
};