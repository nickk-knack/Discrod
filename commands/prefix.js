const { prefix } = require('../config.json');

module.exports = {
	name: 'prefix',
	description: 'Shows the prefix for bot commands',
	args: false,
	guildOnly: false,
	execute(message, args) {
		message.reply(`You can either @ me or use "${prefix}" to execute a command.`);
	},
};