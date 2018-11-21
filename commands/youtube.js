const search = require('youtube-search');

const opts = {
	maxResults: 10,
	key: process.env.YOUTUBE_API_KEY,
};

module.exports = {
	name: 'youtube',
	aliases: ['yt'],
	description: 'Search YouTube for videos.',
	usage: '<search terms>',
	args: true,
	cooldown: 3,
	execute(message, args) {
		const query = args.join(' ');

		search(query, opts, (err, res) => {
			if (err) {
				message.reply('something is fuckie wuckie');
				return console.error(err);
			}

			console.log(res);
			message.channel.send(res[Math.floor(Math.random() * res.length)].link);
		});
	},
};