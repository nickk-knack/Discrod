module.exports = {
	name: 'uwuize',
	aliases: [],
	description: 'Gives whatevwe you type cancew OwO',
	usage: '<text>',
	guildOnly: false,
	args: true,
	cooldown: 3,
	execute(message, args) {
		const original = args.join(' ').trim();

		// maybe just convert whole thing to lower

		let uwu = original.replace(/r/gi, 'w');
		uwu = uwu.replace(/l/gi, 'w');

		// add a case for first instance of a word that starts with Th (ignore case)
		uwu = uwu.replace(/you/gi, 'yuw');
		uwu = uwu.replace(/\sth/gi, ' d');
		uwu = uwu.replace(/th/gi, 'f');
		message.reply(`${uwu} uwu`);
	},
};
