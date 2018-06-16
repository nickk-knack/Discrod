module.exports = {
	name: 'test',
	description: 'Test command for testing purposes',
	args: false,
	guildOnly: false,
	cooldown: 5,
	execute(message, args) {
		message.channel.send('Yeah, that\'s how commands work.');
	},
};