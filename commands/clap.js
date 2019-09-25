module.exports = {
	name: 'clap',
	aliases: ['👏'],
	description: 'ADD 👏 SOME 👏 CLAPS 👏 TO 👏 YOUR 👏 SHIT 👏',
	guildOnly: false,
	args: true,
	cooldown: 3,
	execute(message, args, bot) {
		message.reply(args.join('👏').toUpperCase());
	},
};