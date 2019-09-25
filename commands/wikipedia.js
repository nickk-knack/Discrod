const wiki = require('wikijs').default();

module.exports = {
	name: 'wikipedia',
	aliases: ['wiki', 'wp'],
	description: 'Search wikipedia for a page. Use -r for a random article.',
	usage: '<-r> | <query>',
	args: true,
	guildOnly: false,
	cooldown: 5,
	execute(message, args) {
		if (args[0] === '-r') {
			wiki.random(5).then(res => {
				const item = Math.floor(Math.random() * res.length);

				wiki.page(res[item]).then(p => {
					message.reply(p.raw.fullurl);
				}).catch(err => {
					console.error(err);
					message.reply('Could not get a random page! Something is fucky.');
				});
			}).catch(err => {
				console.error(err);
				message.reply('An error occurred while processing that request!');
			});

			return;
		}

		const query = args.join(' ');

		// Search query, get top result, print out the full url to that wikipedia page
		wiki.search(query, 1).then(res => {
			const result = res.results[0];

			wiki.page(result).then(p => {
				message.reply(p.raw.fullurl);
			}).catch(err => {
				console.error(err);
				message.reply(`No results found for '${query}'`);
			});
		}).catch(err => {
			console.error(err);
			message.reply('An error occurred while processing that request!');
		});
	},
};