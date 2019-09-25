module.exports = {
	name: 'rate',
	aliases: ['r'],
	description: 'Rates something out of 10.',
	usage: '<thing>',
	guildOnly: false,
	args: true,
	cooldown: 3,
	execute(message, args) {
		const overrate = Math.random() > 0.95;
		const rate = overrate ? 11 : Math.floor((Math.random() * 10) + 1);

		message.reply(`${args.join(' ')}?\nI'd rate that a${rate == 8 || rate == 11 ? 'n' : ''} ${rate}/10`);
	},
};