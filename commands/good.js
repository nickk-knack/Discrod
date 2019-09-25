const responses = [
	'thank',
	':)',
	'yuh',
	'thanks, yo',
	'thanks',
	'aww, thanks',
	'yeet',
];

module.exports = {
	name: 'good',
	description: 'Tell the bot that he\'s a good boy.',
	guildOnly: false,
	args: false,
	cooldown: 1,
	execute(message, args) {
		message.reply(`@${message.name} ${responses[Math.floor(Math.random() * responses.length)]}`);
	},
};