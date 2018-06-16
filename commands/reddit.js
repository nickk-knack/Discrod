const Discord = require('discord.js');
const fetch = require('node-fetch');
const trim = (str, max) => (str.length > max) ? `${str.slice(0, max - 3)}...` : str;
const sortTypes = ['relevance', 'hot', 'top', 'new', 'comments'];

module.exports = {
	name: 'reddit',
	aliases: ['r'],
	description: 'Searches reddit <optionally, a specific subreddit> using whatever sort method you provide and returns the first post relating to your search term.',
	usage: '[subreddit] <relevance/top/new> <search term>',
	args: true,
	guildOnly: false,
	cooldown: 5,
	async execute(message, args) {
		// Put together search elements from args
		let sortType, subreddit;
		if (!sortTypes.includes(args[0])) {
			if (!sortTypes.includes(args[1])) {
				message.reply(`You didn't provide an acceptable sort type.\nAvailable sort types: <${sortTypes.join(', ')}>`);
			}
			else {
				subreddit = args[0];
				sortType = args[1];
				args.shift();
				args.shift();
			}
		}
		else {
			sortType = args[0];
			args.shift();
		}
		const search = args.join(' ');
		if (search.length > 512) {
			return message.reply('Your search query is too long!');
		}

		// Put together data
		let url;
		const query = `?q=${search}&sort=${sortType}&limit=1&restrict_sr=false`;

		if (subreddit) {
			url = `https://www.reddit.com/r/${subreddit}/search.json`;
		}
		else {
			url = 'https://www.reddit.com/search.json';
		}

		const body = fetch(`${url}${query}`)
			.then(res => res.json())
			.then(data => data.data.children.map(data => data.data))
			.catch(err => console.log('shit:\n' + err));

		// Push data to user
		body.then(results => {
			const embed = new Discord.RichEmbed()
				// .setURL(`https://reddit.com${results[0].permalink}`)
				.setThumbnail(results[0].thumbnail)
				.setTitle(results[0].title)
				.setDescription(results[0].subreddit)
				.setColor('#22dddd');
			if (results[0].selftext != '') {
				embed.addField('Self text', trim(results[0].selftext, 1024));
			}
			if (results[0].url) {
				embed.addField('Content', results[0].url);
			}
			message.channel.send(embed);
		});
	},
};