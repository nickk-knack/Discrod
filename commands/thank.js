const responses = [
	'ur welcome',
	'you\'re welcome',
	'ur welc',
	'no prob',
	'sure thing',
	'uh huh',
	'yeet',
];

module.exports = {
	name: 'thank',
	aliases: ['thanks'],
	description: 'Thank the bot.',
	guildOnly: false,
	args: false,
	cooldown: 1,
	execute(message, args) {
		message.reply(`@${message.name} ${responses[Math.floor(Math.random() * responses.length)]}`);
	},
};