module.exports = {
	name: 'coin',
	aliases: ['c', 'flip'],
	description: 'Tosses a coin for you.',
	args: false,
	guildOnly: false,
	execute(message, args) {
		const toss = Math.floor(Math.random() * 2);
		if (toss) {
			message.reply('it was heads.');
		}
		else {
			message.reply('it was tails.');
		}
	},
};