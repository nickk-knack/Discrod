module.exports = {
	name: 'dice',
	aliases: ['d'],
	description: 'Rolls an n-sided die. Default: 20',
	usage: '[sides]',
	args: false,
	guildOnly: false,
	cooldown: 0,
	execute(message, args) {
		let dice = 20;
		if (args.length) {
			const tryDice = parseInt(args[0]);
			if (!isNaN(tryDice)) {
				dice = tryDice;
			}
		}

		const roll = Math.floor((Math.random() * dice) + 1);
		let replyAppend = '';
		if (roll == 1) {
			replyAppend = 'Critical fail!';
		}
		else if (roll == dice) {
			replyAppend = 'Critical success!';
		}
		message.reply(`you rolled a ${roll}. ${replyAppend}`);
	},
};