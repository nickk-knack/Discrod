const responses = [
	':(',
	'oof',
	'ok :(',
	'aww :(',
	':c',
	'wow',
	'why? :(',
	'ok :c',
	'mega oof',
];

module.exports = {
	name: 'bad',
	aliases: ['fuckoff'],
	description: 'Reprimand the bot.',
	guildOnly: false,
	args: false,
	cooldown: 1,
	execute(message, args) {
		message.reply(responses[Math.floor(Math.random() * responses.length)]);
	},
};