module.exports = {
	name: 'b',
	aliases: ['🅱️'],
	description: '🅱️🅱️🅱️ 🅱️🅱️ 🅱️🅱️🅱️🅱️🅱️ 🅱️🅱️🅱️ 🅱️🅱️🅱️🅱️🅱️🅱️🅱️ 🅱️🅱️🅱️🅱️.',
	args: true,
	guildOnly: false,
	cooldown: 3,
	execute(message, args) {
		const b = '🅱️';
		const bMessage = args.join(' ').trim();

		// normal strength b
		let regex = /[b]+/gi;
		const strength = Math.random();

		if (strength > 0.8) {
			// stronger b
			regex = /[bp]+/gi;
		}
		else if (strength < 0.1) {
			// stronger b, replace up to 10 random characters
			regex = /[bp]+/gi;

			const randomReplacements = Math.floor(Math.random() * 10) + 1;
			for (let i = 0; i < randomReplacements; i++) {
				bMessage[Math.floor(Math.random() * bMessage.length())] = b;
			}
		}

		message.reply(bMessage.replace(regex, b));
	},
};